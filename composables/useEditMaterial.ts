import { ref } from 'vue'
import type { MaterialsStore } from '~/stores/materials'

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
      materialsStore.updateMaterial(material.id, material)
      editingIndexes.value = editingIndexes.value.filter(i => i !== index)
    }
  }

  return {
    editingIndexes,
    editingMaterials,
    startEditing,
    saveEdit
  }
}
