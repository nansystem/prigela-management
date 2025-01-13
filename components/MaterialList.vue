<template>
  <div class="space-y-4">
    <button
      class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      @click="isAddModalOpen = true"
    >
      材料を追加
    </button>

    <Modal v-model="isAddModalOpen">
      <template #title>材料を追加</template>
      <MaterialForm @success="isAddModalOpen = false" />
    </Modal>
    <div
      v-for="(material, index) in materialsStore.materials"
      :key="index"
      class="p-4 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
    >
      <!-- 表示モード -->
      <div v-if="!editingIndexes.includes(index)" class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="font-medium text-lg text-gray-800">{{ material.name }}</span>
          <span class="text-xl font-bold text-gray-800">
            {{ formatPrice(material.price) }}円
            <span class="text-sm text-gray-500">
              / {{ material.unit_quantity }}{{ material.unit_type }}</span
            >
          </span>
        </div>
      </div>

      <!-- 編集モード -->
      <div v-else class="space-y-2">
        <input
          v-model="editingMaterials[index].name"
          type="text"
          placeholder="材料名"
          class="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          maxlength="100"
        />
        <div class="grid grid-cols-2 gap-4">
          <input
            v-model.number="editingMaterials[index].unit_quantity"
            type="number"
            placeholder="単位量"
            class="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="9999"
          />
          <input
            v-model="editingMaterials[index].unit_type"
            type="text"
            placeholder="単位 (kg, mlなど)"
            class="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            maxlength="10"
          />
        </div>
        <input
          v-model.number="editingMaterials[index].price"
          type="number"
          placeholder="価格 (円)"
          class="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          min="0"
          max="9999999999"
        />
      </div>

      <!-- アクションボタン -->
      <div class="flex justify-end space-x-3 mt-3">
        <button
          v-if="!editingIndexes.includes(index)"
          class="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @click="startEditing(index)"
        >
          編集
        </button>
        <button
          v-else
          class="px-3 py-1 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          @click="saveEdit(index)"
        >
          保存
        </button>
        <button
          class="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          @click="removeMaterial(index)"
        >
          削除
        </button>
      </div>
    </div>
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
