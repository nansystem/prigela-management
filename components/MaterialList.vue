<template>
  <div class="space-y-4">
    <div
      v-for="(material, index) in materialsStore.materials"
      :key="index"
      class="p-4 border rounded"
    >
      <div v-if="!editingIndexes.includes(index)" class="space-y-2">
        <div class="flex justify-between">
          <span class="font-medium">{{ material.name }}</span>
          <span class="text-gray-500"> {{ material.unitQuantity }}{{ material.unitType }} </span>
        </div>
        <div class="text-right">
          <span class="text-lg font-semibold">
            {{ formatPrice(material.price) }}円
            <span class="text-sm text-gray-500">
              / {{ material.unitQuantity }}{{ material.unitType }}
            </span>
          </span>
        </div>
      </div>
      <div v-else class="space-y-2">
        <input
          v-model="editingMaterials[index].name"
          type="text"
          placeholder="材料名"
          class="w-full p-2 border rounded"
          maxlength="100"
        />
        <div class="grid grid-cols-2 gap-2">
          <input
            v-model.number="editingMaterials[index].unitQuantity"
            type="number"
            placeholder="単位量"
            class="w-full p-2 border rounded"
            min="1"
            max="9999"
          />
          <input
            v-model="editingMaterials[index].unitType"
            type="text"
            placeholder="単位 (kg, mlなど)"
            class="w-full p-2 border rounded"
            maxlength="10"
          />
        </div>
        <input
          v-model.number="editingMaterials[index].price"
          type="number"
          placeholder="価格 (円)"
          class="w-full p-2 border rounded"
          min="0"
          max="9999999999"
        />
      </div>
      <div class="flex justify-end space-x-2 mt-2">
        <button
          v-if="!editingIndexes.includes(index)"
          @click="startEditing(index)"
          class="px-2 py-1 text-sm text-blue-500 hover:text-blue-700"
        >
          編集
        </button>
        <button
          v-else
          @click="saveEdit(index)"
          class="px-2 py-1 text-sm text-green-500 hover:text-green-700"
        >
          保存
        </button>
        <button
          @click="removeMaterial(index)"
          class="px-2 py-1 text-sm text-red-500 hover:text-red-700"
        >
          削除
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMaterialsStore } from '~/stores/materials'
import type { Material } from '~/stores/materials'

const materialsStore = useMaterialsStore()
const editingIndexes = ref<number[]>([])
const editingMaterials = ref<Material[]>([])

const formatPrice = (price: number) => {
  return price.toLocaleString('ja-JP')
}

const startEditing = (index: number) => {
  editingIndexes.value.push(index)
  editingMaterials.value[index] = { ...materialsStore.materials[index] }
}

const saveEdit = (index: number) => {
  materialsStore.updateMaterial(index, editingMaterials.value[index])
  editingIndexes.value = editingIndexes.value.filter(i => i !== index)
}

const removeMaterial = (index: number) => {
  materialsStore.removeMaterial(index)
}
</script>
