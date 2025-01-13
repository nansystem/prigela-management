<template>
  <div class="flex flex-col min-h-screen">
    <!-- ヘッダー -->
    <header class="bg-blue-500 shadow-md">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <!-- タイトル -->
        <h1 class="text-xl font-bold text-white">
          <a href="/" class="hover:text-blue-200">PRIGELA 管理画面</a>
        </h1>

        <!-- ログイン状態 -->
        <div v-if="authStore.loading" class="text-blue-200">Loading...</div>
        <div v-else class="flex items-center space-x-4">
          <!-- 認証済みの場合 -->
          <template v-if="authStore.isAuthenticated">
            <p class="text-white">
              ようこそ, <span class="font-medium">{{ authStore.user?.email }}</span>
            </p>
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              @click="authStore.signOut()"
            >
              Sign out
            </button>
          </template>
          <!-- 未認証の場合 -->
          <template v-else>
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              @click="router.push('/login')"
            >
              Log in
            </button>
          </template>
        </div>
      </div>
    </header>

    <!-- メインコンテンツ -->
    <main class="flex-grow">
      <NuxtPage />
    </main>

    <!-- フッター -->
    <footer class="bg-blue-500 text-center py-4">
      <p class="text-sm text-white">© 2025 PRIGELA inc</p>
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
    if (!authStore.isAuthenticated && !['/login'].includes(router.currentRoute.value.path)) {
      router.push('/login')
    }

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
