<template>
  <div class="space-y-4">
    <!-- 材料追加ボタン -->
    <button
      class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      @click="isAddModalOpen = true"
    >
      材料を追加
    </button>

    <!-- 材料追加モーダル -->
    <Modal v-model="isAddModalOpen">
      <template #title>材料を追加</template>
      <MaterialForm @success="isAddModalOpen = false" />
    </Modal>

    <!-- 材料一覧テーブル -->
    <table class="min-w-full border border-gray-300 bg-white rounded-lg shadow-md">
      <thead>
        <tr class="bg-gray-100 border-b">
          <th class="px-4 py-2 text-left text-gray-700 font-semibold">材料名</th>
          <th class="px-4 py-2 text-left text-gray-700 font-semibold">単位量</th>
          <th class="px-4 py-2 text-left text-gray-700 font-semibold">単位</th>
          <th class="px-4 py-2 text-left text-gray-700 font-semibold">価格 (円)</th>
          <th class="px-4 py-2 text-center text-gray-700 font-semibold">アクション</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(material, index) in materialsStore.materials"
          :key="index"
          class="border-b hover:bg-gray-50"
        >
          <template v-if="!editingIndexes.includes(index)">
            <!-- 表示モード -->
            <td class="px-4 py-2">{{ material.name }}</td>
            <td class="px-4 py-2">{{ material.unit_quantity }}</td>
            <td class="px-4 py-2">{{ material.unit_type }}</td>
            <td class="px-4 py-2">{{ formatPrice(material.price) }}</td>
          </template>
          <template v-else>
            <!-- 編集モード -->
            <td class="px-4 py-2">
              <input
                v-model="editingMaterials[index].name"
                type="text"
                class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </td>
            <td class="px-4 py-2">
              <input
                v-model.number="editingMaterials[index].unit_quantity"
                type="number"
                class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </td>
            <td class="px-4 py-2">
              <input
                v-model="editingMaterials[index].unit_type"
                type="text"
                class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </td>
            <td class="px-4 py-2">
              <input
                v-model.number="editingMaterials[index].price"
                type="number"
                class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </td>
          </template>

          <!-- アクションボタン -->
          <td class="px-4 py-2 flex justify-center space-x-3">
            <button
              v-if="!editingIndexes.includes(index)"
              class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              @click="startEditing(index)"
            >
              編集
            </button>
            <button
              v-else
              class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
              @click="saveEdit(index)"
            >
              保存
            </button>
            <button
              class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              @click="removeMaterial(index)"
            >
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from './Modal.vue'
import MaterialForm from './MaterialForm.vue'
import { useMaterialsStore } from '~/stores/materials'
import type { Material } from '~/stores/materials'

const isAddModalOpen = ref(false)

const materialsStore = useMaterialsStore()
const editingIndexes = ref<number[]>([])
const editingMaterials = ref<Material[]>([])

// 初期データ取得
materialsStore.fetchMaterials()

// リアルタイム更新の設定
onMounted(() => {
  materialsStore.subscribeToChanges()
})

const formatPrice = (price: number) => {
  return price.toLocaleString('ja-JP')
}

const startEditing = (index: number) => {
  editingIndexes.value.push(index)
  editingMaterials.value[index] = { ...materialsStore.materials[index] }
}

const saveEdit = (index: number) => {
  const material = editingMaterials.value[index]
  if (material.id) {
    materialsStore.updateMaterial(material.id, material)
    editingIndexes.value = editingIndexes.value.filter(i => i !== index)
  }
}

const removeMaterial = (index: number) => {
  const material = materialsStore.materials[index]
  if (material.id) {
    materialsStore.removeMaterial(material.id)
  }
}
</script>
