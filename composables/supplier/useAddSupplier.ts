import { ref } from 'vue'
import type { SuppliersStore } from '~/stores/suppliers'
import type { NewSupplier } from '~/types/supplier'

export function useAddSupplier(suppliersStore: SuppliersStore) {
  const isAddModalOpen = ref(false)

  const openAddModal = () => {
    isAddModalOpen.value = true
  }

  const closeAddModal = () => {
    isAddModalOpen.value = false
  }

  const addSupplier = async (supplier: NewSupplier) => {
    await suppliersStore.addSupplier(supplier)
    closeAddModal()
  }

  return {
    isAddModalOpen,
    openAddModal,
    addSupplier
  }
}
