<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

const features = [
  {
    title: 'Vue 3 + Composition API',
    description: 'Modern reactivity with <script setup> and typed composables.',
  },
  {
    title: 'Vite + TypeScript',
    description: 'Fast HMR, path aliases, and strict typing out of the box.',
  },
  {
    title: 'Pinia + Vue Router',
    description: 'Lightweight stores and client-side routing ready to extend.',
  },
]
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-16">
    <section class="text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
        Vue Vite Boilerplate
      </h1>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
        A clean starter for Vue 3 SPAs with TypeScript, Pinia, Vue Router, and Tailwind CSS.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <RouterLink to="/dashboard" class="btn-primary">Open Dashboard</RouterLink>
        <RouterLink to="/about" class="btn-secondary">Learn More</RouterLink>
      </div>
    </section>

    <section class="mt-16 grid gap-6 md:grid-cols-3">
      <article v-for="feature in features" :key="feature.title" class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900">{{ feature.title }}</h2>
        <p class="mt-2 text-sm text-gray-600">{{ feature.description }}</p>
      </article>
    </section>

    <section class="mt-16">
      <div class="card mx-auto max-w-md p-8 text-center">
        <h2 class="text-2xl font-semibold text-gray-900">Pinia Counter Demo</h2>
        <p class="mt-2 text-sm text-gray-600">Shared store state across the app</p>
        <div class="mt-6 text-5xl font-bold text-primary-600">{{ counter.count }}</div>
        <p class="mt-2 text-sm text-gray-500">Double: {{ counter.doubleCount }}</p>
        <div class="mt-6 flex justify-center gap-3">
          <button class="btn-secondary" type="button" @click="counter.decrement">-</button>
          <button class="btn-secondary" type="button" @click="counter.reset">Reset</button>
          <button class="btn-primary" type="button" @click="counter.increment">+</button>
        </div>
      </div>
    </section>
  </div>
</template>
