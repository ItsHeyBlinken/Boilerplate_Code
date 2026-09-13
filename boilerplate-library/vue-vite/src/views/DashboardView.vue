<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { useUserStore } from '@/stores/user'

const counter = useCounterStore()
const userStore = useUserStore()

function demoLogin() {
  userStore.setUser({
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
  })
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-16">
    <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
    <p class="mt-2 text-gray-600">Placeholder dashboard for authenticated app flows.</p>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <div class="card p-6">
        <h2 class="font-semibold text-gray-900">Session</h2>
        <p class="mt-2 text-sm text-gray-600">
          Status:
          <span class="font-medium">{{ userStore.isAuthenticated ? 'Signed in' : 'Guest' }}</span>
        </p>
        <p class="mt-1 text-sm text-gray-600">User: {{ userStore.displayName }}</p>
        <div class="mt-4 flex gap-2">
          <button class="btn-primary" type="button" @click="demoLogin">Demo Login</button>
          <button class="btn-secondary" type="button" @click="userStore.logout">Logout</button>
        </div>
      </div>

      <div class="card p-6">
        <h2 class="font-semibold text-gray-900">Shared Counter</h2>
        <p class="mt-2 text-4xl font-bold text-primary-600">{{ counter.count }}</p>
        <button class="btn-primary mt-4" type="button" @click="counter.increment">
          Increment
        </button>
      </div>
    </div>
  </div>
</template>
