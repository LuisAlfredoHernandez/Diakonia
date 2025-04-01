<template>
  <div>
    <label :for="name" :class="labelClasses">{{ label }}</label>
    <input
      v-model="model.$model"
      v-bind="$attrs"
      :type="type"
      :name="name"
      :id="name"
      :class="inputClasses"
    />
    <p
      v-for="error of model.$errors"
      :key="error.$uid"
      class="mt-2 text-sm text-red-600 dark:text-red-500"
    >
      <span class="font-medium">Oops!</span> {{ error.$message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import type { BaseValidation } from "@vuelidate/core";
import type { InputSize } from "~/components/FwaInput/types";
import { useInputClasses } from "./composables/useInputClass";

defineOptions({
  inheritAttrs: false,
});

interface Props {
  label: string;
  name: string;
  type?: "text" | "email" | "number" | "password" | "tel";
  size?: InputSize;
  disabled?: boolean;
  model: BaseValidation;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  size: "sm",
  disabled: false,
});

const { inputClasses, labelClasses } = useInputClasses(toRefs(props));
</script>

<style scoped></style>
