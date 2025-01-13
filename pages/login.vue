<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full space-y-8">
      <h2 class="text-center text-3xl font-bold">ログイン</h2>
      <GoogleLogin />
    </div>
  </div>
</template>

<script setup lang="ts">
  import GoogleLogin from '~/components/GoogleLogin.vue'
</script>
