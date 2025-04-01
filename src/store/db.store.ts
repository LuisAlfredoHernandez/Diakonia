import { defineStore } from "pinia";
import { ref } from "vue";
import type { FileInfo, MyFile } from "./db.types";
import { useUserStore } from "./modules/user";

const DB_NAME = "FlexusAppDB";
const DB_VERSION = 1;
const DB_OBJ_NAME = "CustomerImages";

type MyDbFunction = (req: IDBRequest) => Promise<any>;

export function openDatabase(
  databaseName: string,
  version: number,
  objName: string
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, version);

    request.onerror = (event) => {
      reject(request.error);
    };

    request.onsuccess = (event) => {
      const db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(objName)) {
        db.createObjectStore(objName, { keyPath: "id" });
      }
    };
  });
}

const _get = (
  objs: IDBObjectStore,
  id: number,
  callback?: MyDbFunction
): Promise<Event> => {
  return new Promise((resolve, reject) => {
    if (!objs.get) {
      reject("[ERROR] El IndexedDB.get is not defined.");
    }

    if (!id) {
      reject("[ERROR] El id no fue dado.");
    }

    const request = objs.get(id);
    request.onsuccess = (event) => {
      if (callback) callback(request).then(resolve);
      else resolve(event);
    };
    request.onerror = (event) => {
      reject(request.error);
    };
  });
};

const _put = (
  objs: IDBObjectStore,
  data: MyFile,
  callback?: MyDbFunction
): Promise<Event> => {
  return new Promise((resolve, reject) => {
    const request = objs.put(data);
    request.onsuccess = (event) => {
      if (callback) callback(request).then(resolve);
      else resolve(event);
    };
    request.onerror = (event) => {
      reject(request.error);
    };
  });
};

const _add = (
  objs: IDBObjectStore,
  data: MyFile,
  callback?: MyDbFunction
): Promise<Event> => {
  return new Promise((resolve, reject) => {
    const request = objs.add(data);
    request.onsuccess = (event) => {
      if (callback) callback(request).then(resolve);
      else resolve(event);
    };
    request.onerror = (event) => {
      reject(request.error);
    };
  });
};

export function getFileNameFromURL(url: string): string {
  const pathSegments = url.split("/");
  return pathSegments[pathSegments.length - 1];
}

// Function for reading data from a Blob object and returning an ArrayBuffer
export function readBlobData(blob: Blob): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = (event) => {
      resolve(reader.result as ArrayBuffer);
    };

    reader.onerror = (event) => {
      reject(reader.error);
    };

    reader.readAsArrayBuffer(blob);
  });
}

export const useDbStore = defineStore("db-store", () => {
  const useUser = useUserStore();
  const token = useUser.getToken;

  //=================================================================
  // states
  //=================================================================
  const customerImages = ref<MyFile[]>();
  const currentImage = ref<MyFile | null>();

  //=================================================================
  // actions
  //=================================================================

  const convertMyFileToFile = (data: MyFile): File => {
    const file = new File([data.data], data.info.name, {
      type: data.info.type,
    });
    return file;
  };

  const saveImage = async (
    id: number,
    fileName: string,
    fileType: string,
    fileData: Blob
  ): Promise<void> => {
    try {
      const db = await openDatabase(DB_NAME, DB_VERSION, DB_OBJ_NAME);
      const transaction = db.transaction(DB_OBJ_NAME, "readwrite");
      const objectStore = transaction.objectStore(DB_OBJ_NAME);

      const fileInfo: FileInfo = { name: fileName, type: fileType };
      const file: MyFile = { id, info: fileInfo, data: fileData };

      currentImage.value = file;

      await _get(objectStore, id, async (req) => {
        const data = req.result;
        if (data) {
          data.info = file.info;
          data.data = file.data;

          await _put(objectStore, data);
        } else {
          await _add(objectStore, file);
        }
      });

      transaction.oncomplete = () => {
        db.close();
      };
    } catch (error) {
      console.error(
        "Error al almacenar la información del archivo en IndexedDB:",
        error
      );
    }
  };

  const sendImage = async (
    imageFile: File,
    url: string,
    payload?: any
  ): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      if (payload) {
        Object.keys(payload).forEach((key) => {
          formData.append(key, payload[key]);
        });
      }
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Imagen enviada a la API REST");
      } else {
        console.error("Error al enviar la imagen a la API REST");
      }
    } catch (error) {
      console.error("Error en la operación de envío de imagen:", error);
      alert(`Error en la operación de envío de imagen: ${error}`);
    }
  };

  const loadImageAndSendToAPI = async (
    imageURL: string,
    url: string,
    payload?: any
  ): Promise<void> => {
    try {
      const response = await fetch(imageURL);
      const blob = await response.blob();
      const fileName = getFileNameFromURL(imageURL);
      const file = new File([blob], fileName, { type: blob.type });
      await sendImage(file, url, payload);
    } catch (error) {
      console.error("Error al cargar la imagen y enviarla a la API:", error);
    }
  };

  const retrieveFile = (id: number): Promise<File | null> => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await openDatabase(DB_NAME, DB_VERSION, DB_OBJ_NAME);
        const transaction = db.transaction(DB_OBJ_NAME, "readonly");
        const objectStore = transaction.objectStore(DB_OBJ_NAME);
        if (!objectStore || objectStore === null) return;

        await _get(objectStore, id, async (req) => {
          const file = req.result;

          if (file) {
            const { info, data } = file as MyFile;

            if (info && data) {
              const blob = new Blob([data], { type: info.type });
              const fileRead = new File([blob], info.name, { type: blob.type });

              resolve(fileRead);
            } else {
              reject("El objeto file no contiene información válida");
            }
          } else {
            resolve(null);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    // states
    customerImages,
    currentImage,

    // actions
    saveImage,
    sendImage,
    loadImageAndSendToAPI,
    retrieveFile,
    convertMyFileToFile,
  };
});
