<script setup lang="ts">
const stack = [
  'Vue 3 Composition API',
  'Vite for builds and HMR',
  'TypeScript for type safety',
  'Pinia for state management',
  'Vue Router for navigation',
  'Tailwind CSS for styling',
  'Axios for API calls',
]
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-16">
    <h1 class="text-3xl font-bold text-gray-900">About This Starter</h1>
    <p class="mt-4 text-gray-600">
      Copy this folder into a new project, install dependencies, and start building your UI.
      The structure mirrors common Vue SPA patterns so you can grow it without fighting the scaffold.
    </p>
    <ul class="mt-8 space-y-2">
      <li
        v-for="item in stack"
        :key="item"
        class="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
