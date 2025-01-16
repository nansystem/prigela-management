import { ref } from 'vue'
import type { SuppliersStore } from '~/stores/suppliers'

export function useDeleteSupplier(suppliersStore: SuppliersStore) {
  const isDeleteModalOpen = ref(false)
  const deletingIndex = ref<number | null>(null)

  const removeSupplier = (index: number) => {
    deletingIndex.value = index
    isDeleteModalOpen.value = true
  }

  const confirmDelete = () => {
    if (deletingIndex.value !== null) {
      const supplier = suppliersStore.suppliers[deletingIndex.value]
      if (supplier.id) {
        suppliersStore.removeSupplier(supplier.id)
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
    removeSupplier,
    confirmDelete,
    cancelDelete
  }
}
