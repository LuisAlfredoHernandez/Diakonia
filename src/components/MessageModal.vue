<script setup lang="ts">
import { Modal } from "flowbite-vue";
import { ref, onUnmounted } from "vue";

const isShowModal = ref(false);
const emits = defineEmits(["onClickAccept", "onClickDecline"]);

const closeModal = () => (isShowModal.value = false);

const openModal = () => (isShowModal.value = true);

const { message, isBtnCancel, data } = defineProps<{
  message: string;
  isBtnCancel?: boolean;
  data?: number;
}>();

const onClickAccept = () => {
  closeModal();
  data ? emits("onClickAccept", data) : null;
};

const onClickDecline = () => {
  closeModal();
  emits("onClickDecline");
};

onUnmounted(() => {
  closeModal();
});
</script>

<template>
  <!-- Btn Modal  -->
  <button type="button" @click="openModal">
    <slot> </slot>
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
