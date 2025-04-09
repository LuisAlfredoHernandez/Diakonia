<script setup lang="ts">
import { Modal } from "flowbite-vue";
import { ref, onMounted, onUnmounted } from "vue";

const isShowModal = ref(false);
const emits = defineEmits(["onClickAccept", "onClickDecline"]);

const closeModal = () => {
  isShowModal.value = false;
};

const openModal = () => {
  isShowModal.value = true;
};

const { message, isBtnCancel, elementToDelete } = defineProps<{
  message: string;
  isBtnCancel: boolean;
  elementToDelete: number;
}>();

const onClickAccept = () => {
  closeModal();
  emits("onClickAccept", elementToDelete);
};

const onClickDecline = () => {
  closeModal();
  emits("onClickDecline");
};

onMounted(() => {
  if (message) isShowModal.value = true;
});

onUnmounted(() => {
  closeModal();
});
</script>

<template>
  <!-- Btn Modal  -->
  <button type="button" @click="openModal">
    <svg
      fill="#000000"
      viewBox="-2.94 0 31.716 31.716"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000000"
      width="20px"
      height="20px"
      stroke-width="0.7929"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g transform="translate(-355.957 -579)">
          <path
            d="M376.515,610.716H361.231a2.361,2.361,0,0,1-2.358-2.359V584.1a1,1,0,0,1,2,0v24.255a.36.36,0,0,0,.358.359h15.284a.36.36,0,0,0,.358-.359V584.1a1,1,0,0,1,2,0v24.255A2.361,2.361,0,0,1,376.515,610.716Z"
          ></path>
          <path
            d="M365.457,604.917a1,1,0,0,1-1-1v-14a1,1,0,0,1,2,0v14A1,1,0,0,1,365.457,604.917Z"
          ></path>
          <path
            d="M372.29,604.917a1,1,0,0,1-1-1v-14a1,1,0,0,1,2,0v14A1,1,0,0,1,372.29,604.917Z"
          ></path>
          <path
            d="M380.79,585.1H356.957a1,1,0,0,1,0-2H380.79a1,1,0,0,1,0,2Z"
          ></path>
          <path
            d="M372.79,581h-7.917a1,1,0,1,1,0-2h7.917a1,1,0,0,1,0,2Z"
          ></path>
        </g>
      </g>
    </svg>
  </button>

  <!-- Modal  -->
  <Modal :size="'xs'" v-if="isShowModal" @close="closeModal">
    <template #body>
      <p class="text-lg leading-relaxed text-dark-500 dark:text-gray-400">
        {{ message }}
      </p></template
    >
    <template #footer>
      <div
        :class="isBtnCancel ? 'flex justify-between' : 'flex justify-center'"
      >
        <button
          v-if="isBtnCancel"
          @click="onClickDecline"
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Cancelar
        </button>
        <button
          @click="onClickAccept"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Aceptar
        </button>
      </div>
    </template>
  </Modal>
</template>
