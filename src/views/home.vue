<template>
  <div class="grid grid-cols-1 lg:grid-cols-1 place-items-center">
    <RouterLink to="/cliente">
      <button class="p-2">
        <TheCard href="#">
          <img
            src="https://plus.unsplash.com/premium_photo-1701108265432-7ecea8450a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </TheCard>
        Cliente
      </button>
    </RouterLink>

    <RouterLink to="/cliente">
      <button class="p-2">
        <TheCard href="#">
          <img
            src="https://plus.unsplash.com/premium_photo-1661277879262-5a374156cd70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </TheCard>
        Proveedor
      </button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { TheCard } from "flowbite-vue";
</script>
