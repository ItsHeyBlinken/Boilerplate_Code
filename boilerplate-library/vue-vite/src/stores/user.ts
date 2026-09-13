import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  name: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => user.value !== null)
  const displayName = computed(() => user.value?.name ?? 'Guest')

  function setUser(next: User | null) {
    user.value = next
  }

  function logout() {
    user.value = null
  }

  return { user, isAuthenticated, displayName, setUser, logout }
})
