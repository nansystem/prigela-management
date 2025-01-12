<template>
  <div>
    <header>
      <h1>アプリケーション共通のヘッダー</h1>
      <div v-if="authStore.loading">Loading...</div>
      <div v-else>
        <div v-if="authStore.isAuthenticated">
          <p>Welcome, {{ authStore.user?.email }}</p>
          <button @click="authStore.signOut()">Sign out</button>
        </div>
        <GoogleLogin v-else />
      </div>
    </header>
    <NuxtPage />
    <footer>
      <p>アプリケーション共通のフッター</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.initialize()
})
</script>
