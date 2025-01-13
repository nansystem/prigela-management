import { ref } from 'vue'
import type { MaterialsStore } from '~/stores/materials'

export function useDeleteMaterial(materialsStore: MaterialsStore) {
  const isDeleteModalOpen = ref(false)
  const deletingIndex = ref<number | null>(null)

  const removeMaterial = (index: number) => {
    deletingIndex.value = index
    isDeleteModalOpen.value = true
  }

  const confirmDelete = () => {
    if (deletingIndex.value !== null) {
      const material = materialsStore.materials[deletingIndex.value]
      if (material.id) {
        materialsStore.removeMaterial(material.id)
      }
      deletingIndex.value = null
      isDeleteModalOpen.value = false
    }
  }

  const cancelDelete = () => {
    deletingIndex.value = null
    isDeleteModalOpen.value = false
  }

  return {
    isDeleteModalOpen,
    deletingIndex,
    removeMaterial,
    confirmDelete,
    cancelDelete
  }
}
