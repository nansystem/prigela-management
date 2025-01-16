import { defineStore } from 'pinia'
import { SupplierRepository } from '~/repositories/supplierRepository'
import type { Supplier, NewSupplier } from '~/types/supplier'
import { useSupabase } from '~/utils/supabase'

export const useSuppliersStore = defineStore('suppliers', () => {
  const repository = new SupplierRepository(useSupabase())

  return {
    suppliers: [] as Supplier[],

    async fetchSuppliers() {
      this.suppliers = await repository.fetchSuppliers()
    },

    async addSupplier(supplier: NewSupplier) {
      const newSupplier = await repository.addSupplier(supplier)
      this.suppliers.unshift(newSupplier)
    },

    async removeSupplier(id: string) {
      await repository.removeSupplier(id)
      this.suppliers = this.suppliers.filter(s => s.id !== id)
    },

    async updateSupplier(supplier: Supplier) {
      const updatedSupplier = await repository.updateSupplier(supplier)
      const index = this.suppliers.findIndex(s => s.id === supplier.id)
      if (index !== -1) this.suppliers[index] = updatedSupplier
    }
  }
})

export type SuppliersStore = ReturnType<typeof useSuppliersStore>
