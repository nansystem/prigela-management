<template>
  <div class="min-h-screen bg-blue-100 p-8">
    <h1 class="text-4xl font-bold mb-8">材料一覧</h1>
    <div class="max-w-2xl mx-auto space-y-8">
      <MaterialList class="bg-white rounded-lg shadow-lg p-6" />
    </div>
  </div>
</template>

<script setup>
import MaterialList from '~/components/MaterialList.vue'
</script>
