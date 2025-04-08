<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <div class="bg-white border-b shadow-sm p-4">
      <div class="flex items-center">
        <button @click="volver" class="mr-4 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div class="flex items-center">
          <div class="relative">
            <img
              :src="
                profesional.avatar ||
                'https://img.freepik.com/fotos-premium/hombre-joven-aislado-cara-neutral_75922-474.jpg'
              "
              alt="Avatar"
              class="h-10 w-10 rounded-full object-cover"
            />
            <span
              class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"
            ></span>
          </div>
          <div class="ml-3">
            <h3 class="font-medium">{{ profesional.nombre }}</h3>
            <p class="text-xs text-gray-500">
              {{
                profesional.online
                  ? "En línea"
                  : "Últ. vez: " + profesional.ultimaVez
              }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido del chat -->
    <div class="flex-1 p-4 overflow-y-auto" ref="chatContainer">
      <div v-for="(mensaje, index) in mensajes" :key="index" class="mb-4">
        <div
          class="flex"
          :class="{
            'justify-end': mensaje.remitente === 'usuario',
            'justify-start': mensaje.remitente === 'profesional',
          }"
        >
          <div
            class="max-w-3/4 rounded-lg px-4 py-2 shadow-sm"
            :class="{
              'bg-blue-600 text-white': mensaje.remitente === 'usuario',
              'bg-white text-gray-800': mensaje.remitente === 'profesional',
            }"
          >
            <p>{{ mensaje.texto }}</p>
            <p class="text-xs opacity-70 text-right mt-1">
              {{ mensaje.hora }}
              <span v-if="mensaje.remitente === 'usuario'">
                <svg
                  v-if="mensaje.leido"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 inline-block text-blue-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 inline-block"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Barra de entrada de mensajes -->
    <div class="bg-white border-t p-4">
      <div class="flex items-center">
        <button class="text-gray-500 mx-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
        <div class="flex-1 mx-2">
          <input
            type="text"
            v-model="nuevoMensaje"
            @keyup.enter="enviarMensaje"
            placeholder="Escribe un mensaje..."
            class="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          @click="enviarMensaje"
          class="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";

interface Mensaje {
  texto: string;
  remitente: "usuario" | "profesional";
  hora: string;
  leido: boolean;
}

interface Profesional {
  id: number;
  nombre: string;
  avatar?: string;
  online: boolean;
  ultimaVez: string;
}

const router = useRouter();
const route = useRoute();
const chatContainer = ref<HTMLElement | null>(null);
const nuevoMensaje = ref("");

// Los datos del profesional podrían venir de parámetros de la ruta o de una API
const profesional = ref<Profesional>({
  id: Number(route.params.id || 1),
  nombre: "Profesional",
  avatar: "",
  online: true,
  ultimaVez: "02:15",
});

// Historial de mensajes (en un caso real, esto vendría de una API)
const mensajes = ref<Mensaje[]>([
  {
    texto: "Hola, ¿en qué puedo ayudarte?",
    remitente: "profesional",
    hora: "14:20",
    leido: true,
  },
  {
    texto: "Necesito información sobre tus servicios",
    remitente: "usuario",
    hora: "14:22",
    leido: true,
  },
  {
    texto:
      "Claro, ofrezco servicios de reparación y mantenimiento. ¿Qué necesitas específicamente?",
    remitente: "profesional",
    hora: "14:25",
    leido: true,
  },
]);

// Función para enviar un mensaje
const enviarMensaje = async () => {
  if (nuevoMensaje.value.trim() === "") return;

  // Obtenemos la hora actual
  const fecha = new Date();
  const hora = `${fecha.getHours()}:${fecha
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  // Añadir mensaje del usuario
  mensajes.value.push({
    texto: nuevoMensaje.value,
    remitente: "usuario",
    hora,
    leido: false,
  });

  nuevoMensaje.value = "";

  // Hacer scroll hasta el último mensaje
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }

  // Simular respuesta del profesional (en una app real esto vendría del backend)
  setTimeout(() => {
    mensajes.value.push({
      texto: "Gracias por tu mensaje. Te responderé lo antes posible.",
      remitente: "profesional",
      hora: `${fecha.getHours()}:${(fecha.getMinutes() + 1)
        .toString()
        .padStart(2, "0")}`,
      leido: true,
    });

    // Hacer scroll hasta el último mensaje
    nextTick().then(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    });
  }, 1500);
};

// Función para volver a la pantalla anterior
const volver = () => {
  router.back();
};

// Scroll al fondo cuando se monte el componente
onMounted(() => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
});
</script>
