import { ref } from "vue";
import type { ToastType } from "flowbite-vue/dist/components/Toast/types";
import { useToast } from "flowbite-vue";

export const useFwaNotification = () => {
  const ms = ref(5000);
  const toast = useToast();

  const add = (type: ToastType, text: string, time?: number) => {
    toast.add({
      type,
      time: time ? time : ms.value,
      text,
    });
  };

  return {
    add,
  };
};
