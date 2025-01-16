<template>
  <table class="min-w-full border border-gray-300 bg-white rounded-lg shadow-md">
    <thead>
      <tr class="bg-gray-100 border-b">
        <th class="px-4 py-2 text-left text-gray-700 font-semibold">材料名</th>
        <th class="px-4 py-2 text-left text-gray-700 font-semibold">別名</th>
        <th class="px-4 py-2 text-left text-gray-700 font-semibold">単位量</th>
        <th class="px-4 py-2 text-left text-gray-700 font-semibold">単位</th>
        <th class="px-4 py-2 text-left text-gray-700 font-semibold">価格 (円)</th>
        <th class="px-4 py-2 text-left text-gray-700 font-semibold">価格 (円)/単位</th>
        <th class="px-4 py-2 text-center text-gray-700 font-semibold">アクション</th>
      </tr>
    </thead>
    <tbody>
      <MaterialRow
        v-for="(material, index) in materials"
        :key="index"
        :material="material"
        :index="index"
        :editing-indexes="editingIndexes"
        :editing-materials="editingMaterials"
        @start-editing="startEditing"
        @save-edit="saveEdit"
        @remove-material="removeMaterial"
        @update-editing-materials="updateEditingMaterials"
      />
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import type { Material } from '~/types/material'

  defineProps<{
    materials: Material[]
    editingIndexes: number[]
    editingMaterials: Material[]
  }>()

  const emit = defineEmits(['startEditing', 'saveEdit', 'removeMaterial', 'updateEditingMaterials'])

  const startEditing = (index: number) => {
    emit('startEditing', index)
  }

  const saveEdit = (index: number) => {
    emit('saveEdit', index)
  }

  const removeMaterial = (index: number) => {
    emit('removeMaterial', index)
  }

  const updateEditingMaterials = (updatedMaterial: Material) => {
    emit('updateEditingMaterials', updatedMaterial)
  }
</script>
