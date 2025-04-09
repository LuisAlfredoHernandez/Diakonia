import type { Ref } from "vue";
import { computed } from "vue";
import type { BaseValidation } from "@vuelidate/core";
import type { InputSize } from "~/components/FwaInput/types";

// LABEL
const defaultLabelClasses =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300";

// INPUT
const defaultInputClasses =
  "bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 ";
const defaultBorderInput =
  "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500";
const errorBorderInput =
  "border-red-300 focus:border-red-500 dark:border-red-600 dark:focus:border-red-500";
const disabledInputClasses = "cursor-not-allowed bg-gray-100";
const inputSizeClasses: Record<InputSize, string> = {
  lg: "p-4",
  md: "p-2.5 text-sm",
  sm: "p-2 text-sm",
};

export type UseInputClassesProps = {
  size: Ref<InputSize>;
  disabled: Ref<boolean>;
  model: Ref<BaseValidation>;
};

export function useInputClasses(props: UseInputClassesProps): {
  inputClasses: Ref<string>;
  labelClasses: Ref<string>;
} {
  const _borderClass = computed(() => {
    return !props.model.value.$error ? defaultBorderInput : errorBorderInput;
  });
  const inputClasses = computed(() => {
    return `${defaultInputClasses} ${inputSizeClasses[props.size.value]} ${
      props.disabled.value ? disabledInputClasses : ""
    } ${_borderClass.value}`;
  });

  const labelClasses = computed(() => {
    return defaultLabelClasses;
  });

  return {
    inputClasses,
    labelClasses,
  };
}
