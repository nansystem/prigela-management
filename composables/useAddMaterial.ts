import { ref } from 'vue'
import type { MaterialsStore } from '~/stores/materials'
import type { Material, NewMaterial } from '~/types/material'

export function useAddMaterial(materialsStore: MaterialsStore) {
  const isAddModalOpen = ref(false)

  const openAddModal = () => {
    isAddModalOpen.value = true
  }

  const closeAddModal = () => {
    isAddModalOpen.value = false
  }

  const addMaterial = async (material: NewMaterial | Material) => {
    if (!('id' in material)) {
      await materialsStore.addMaterial(material)
    } else {
      await materialsStore.updateMaterial(material)
    }
    closeAddModal()
  }

  return {
    isAddModalOpen,
    openAddModal,
    addMaterial
  }
}
