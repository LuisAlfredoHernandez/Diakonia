<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    styleClass: {
      type: String,
      default: "",
    },
  },
});
</script>

<template>
  <p :class="`text-center text-error ${styleClass}`">
    <slot />
  </p>
</template>
