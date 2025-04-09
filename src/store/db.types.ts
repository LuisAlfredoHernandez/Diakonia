export type FileInfo = {
  name: string;
  type: string;
};

export type MyFile = {
  id: number;
  info: FileInfo;
  data: Blob;
};
