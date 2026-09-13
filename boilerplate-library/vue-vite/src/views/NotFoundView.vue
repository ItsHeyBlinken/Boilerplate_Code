<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
    <h1 class="text-5xl font-bold text-gray-900">404</h1>
    <p class="mt-4 text-gray-600">That page does not exist.</p>
    <RouterLink to="/" class="btn-primary mt-8">Back Home</RouterLink>
  </div>
</template>
