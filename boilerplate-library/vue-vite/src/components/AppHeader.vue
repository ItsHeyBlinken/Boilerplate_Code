<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const userStore = useUserStore()
const appName = import.meta.env.VITE_APP_NAME || 'Vue Vite'

const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
]
</script>

<template>
  <header class="border-b border-gray-200 bg-white">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <RouterLink to="/" class="text-lg font-semibold text-primary-700">
        {{ appName }}
      </RouterLink>

      <nav class="flex items-center gap-4">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium transition-colors"
          :class="route.path === link.to ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'"
        >
          {{ link.label }}
        </RouterLink>
        <span class="text-sm text-gray-500">{{ userStore.displayName }}</span>
      </nav>
    </div>
  </header>
</template>
