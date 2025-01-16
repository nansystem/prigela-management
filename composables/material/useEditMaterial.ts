import { ref } from 'vue'
import type { MaterialsStore } from '~/stores/materials'
import type { Material } from '~/types/material'

export function useEditMaterial(materialsStore: MaterialsStore) {
  const editingIndexes = ref<number[]>([])
  const editingMaterials = ref<Material[]>([])

  const startEditing = (index: number) => {
    editingIndexes.value.push(index)
    editingMaterials.value[index] = { ...materialsStore.materials[index] }
  }

  const saveEdit = (index: number) => {
    const material = editingMaterials.value[index]
    if (material.id) {
      materialsStore.updateMaterial(material)
      editingIndexes.value = editingIndexes.value.filter(i => i !== index)
    }
  }

  const updateEditingMaterials = (updatedMaterial: Material) => {
    const index = editingMaterials.value.findIndex(m => m.id === updatedMaterial.id)
    if (index !== -1) {
      editingMaterials.value[index] = updatedMaterial
    }
  }

  return {
    editingIndexes,
    editingMaterials,
    startEditing,
    saveEdit,
    updateEditingMaterials
  }
}
