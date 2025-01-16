import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSuppliersStore } from '~/stores/suppliers'
import { SupplierRepository } from '~/repositories/supplierRepository'
import type { Supplier, NewSupplier } from '~/types/supplier'

vi.mock('~/repositories/supplierRepository')
vi.mock('~/utils/supabase', () => ({
  useSupabase: vi.fn()
}))

describe('suppliers store', () => {
  const mockSupplier: Supplier = {
    id: '1',
    name: 'Test Supplier',
    url: 'https://example.com',
    createdAt: '2024-01-01'
  }

  const mockNewSupplier: NewSupplier = {
    name: 'New Supplier',
    url: 'https://new-example.com'
  }

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('fetchSuppliers', () => {
    it('should fetch suppliers and update state', async () => {
      const store = useSuppliersStore()
      const mockSuppliers = [mockSupplier]

      vi.mocked(SupplierRepository.prototype.fetchSuppliers).mockResolvedValue(mockSuppliers)

      await store.fetchSuppliers()

      expect(store.suppliers).toEqual(mockSuppliers)
      expect(SupplierRepository.prototype.fetchSuppliers).toHaveBeenCalledTimes(1)
    })
  })

  describe('addSupplier', () => {
    it('should add supplier and update state', async () => {
      const store = useSuppliersStore()

      vi.mocked(SupplierRepository.prototype.addSupplier).mockResolvedValue(mockSupplier)

      await store.addSupplier(mockNewSupplier)

      expect(store.suppliers).toEqual([mockSupplier])
      expect(SupplierRepository.prototype.addSupplier).toHaveBeenCalledWith(mockNewSupplier)
    })
  })

  describe('removeSupplier', () => {
    it('should remove supplier and update state', async () => {
      const store = useSuppliersStore()
      store.suppliers = [mockSupplier]

      vi.mocked(SupplierRepository.prototype.removeSupplier).mockResolvedValue()

      await store.removeSupplier(mockSupplier.id)

      expect(store.suppliers).toEqual([])
      expect(SupplierRepository.prototype.removeSupplier).toHaveBeenCalledWith(mockSupplier.id)
    })
  })

  describe('updateSupplier', () => {
    it('should update supplier and update state', async () => {
      const store = useSuppliersStore()
      const initialSupplier = { ...mockSupplier, name: 'Initial Name' }
      const updatedSupplier = { ...mockSupplier, name: 'Updated Name' }
      store.suppliers = [initialSupplier]

      vi.mocked(SupplierRepository.prototype.updateSupplier).mockResolvedValue(updatedSupplier)

      await store.updateSupplier(updatedSupplier)

      expect(store.suppliers[0]).toEqual(updatedSupplier)
      expect(SupplierRepository.prototype.updateSupplier).toHaveBeenCalledWith(updatedSupplier)
    })

    it('should not update state if supplier is not found', async () => {
      const store = useSuppliersStore()
      const nonExistentSupplier = { ...mockSupplier, id: 'non-existent' }
      store.suppliers = [mockSupplier]

      vi.mocked(SupplierRepository.prototype.updateSupplier).mockResolvedValue(nonExistentSupplier)

      await store.updateSupplier(nonExistentSupplier)

      expect(store.suppliers).toEqual([mockSupplier])
      expect(SupplierRepository.prototype.updateSupplier).toHaveBeenCalledWith(nonExistentSupplier)
    })
  })
})
