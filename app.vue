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
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  await authStore.initialize()

  // 認証状態が確定したらルートガードを実行
  // 初期ロード時のリダイレクト
  if (!authStore.isAuthenticated && !['/login'].includes(router.currentRoute.value.path)) {
    router.push('/login')
  }

  // 認証状態変更時のリダイレクト
  watch(
    () => authStore.isAuthenticated,
    isAuthenticated => {
      if (!isAuthenticated && !['/login'].includes(router.currentRoute.value.path)) {
        router.push('/login')
      }
    }
  )
})
</script>
