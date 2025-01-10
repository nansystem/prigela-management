<template>
  <div class="min-h-screen bg-blue-100 p-8">
    <h1 class="text-4xl font-bold text-primary mb-8">材料一覧</h1>
    <table class="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">材料名</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">単位</th>
          <th class="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">価格 (円)</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(item, index) in materials" :key="index" class="hover:bg-gray-50">
          <td class="px-6 py-4 text-sm text-gray-800">{{ item.name }}</td>
          <td class="px-6 py-4 text-sm text-gray-800">{{ item.unit }}</td>
          <td class="px-6 py-4 text-sm text-gray-800">{{ item.price.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const materials = [
  { name: '鋼材', unit: 'kg', price: 500 },
  { name: 'アルミニウム', unit: 'kg', price: 800 },
  { name: '銅線', unit: 'm', price: 1200 },
  { name: 'プラスチック', unit: 'kg', price: 300 },
]
</script>
