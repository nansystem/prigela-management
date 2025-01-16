import { ref } from 'vue'
import type { SuppliersStore } from '~/stores/suppliers'
import type { Supplier } from '~/types/supplier'

export function useEditSupplier(suppliersStore: SuppliersStore) {
  const editingIndexes = ref<number[]>([])
  const editingSuppliers = ref<Supplier[]>([])

  const startEditing = (index: number) => {
    editingIndexes.value.push(index)
    editingSuppliers.value[index] = { ...suppliersStore.suppliers[index] }
  }

  const saveEdit = (index: number) => {
    const supplier = editingSuppliers.value[index]
    if (supplier.id) {
      suppliersStore.updateSupplier(supplier)
      editingIndexes.value = editingIndexes.value.filter(i => i !== index)
    }
  }

  const updateEditingSuppliers = (updatedSupplier: Supplier) => {
    const index = editingSuppliers.value.findIndex(s => s.id === updatedSupplier.id)
    if (index !== -1) {
      editingSuppliers.value[index] = updatedSupplier
    }
  }

  return {
    editingIndexes,
    editingSuppliers,
    startEditing,
    saveEdit,
    updateEditingSuppliers
  }
}
