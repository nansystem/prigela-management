import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMaterialsStore } from '~/stores/materials'
import { MaterialRepository } from '~/repositories/materialRepository'
import type { Material, NewMaterial } from '~/types/material'

vi.mock('~/repositories/materialRepository')
vi.mock('~/utils/supabase', () => ({
  useSupabase: vi.fn()
}))

describe('materials store', () => {
  const mockMaterial: Material = {
    id: '1',
    name: 'Test Material',
    unit_quantity: 10,
    unit_type: 'kg',
    price: 1000,
    createdAt: '2024-01-01'
  }

  const mockNewMaterial: NewMaterial = {
    name: 'New Material',
    unit_quantity: 5,
    unit_type: 'g',
    price: 500
  }

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('fetchMaterials', () => {
    it('should fetch materials and update state', async () => {
      const store = useMaterialsStore()
      const mockMaterials = [mockMaterial]

      vi.mocked(MaterialRepository.prototype.fetchMaterials).mockResolvedValue(mockMaterials)

      await store.fetchMaterials()

      expect(store.materials).toEqual(mockMaterials)
      expect(MaterialRepository.prototype.fetchMaterials).toHaveBeenCalledTimes(1)
    })
  })

  describe('addMaterial', () => {
    it('should add material and update state', async () => {
      const store = useMaterialsStore()

      vi.mocked(MaterialRepository.prototype.addMaterial).mockResolvedValue(mockMaterial)

      await store.addMaterial(mockNewMaterial)

      expect(store.materials).toEqual([mockMaterial])
      expect(MaterialRepository.prototype.addMaterial).toHaveBeenCalledWith(mockNewMaterial)
    })
  })

  describe('removeMaterial', () => {
    it('should remove material and update state', async () => {
      const store = useMaterialsStore()
      store.materials = [mockMaterial]

      vi.mocked(MaterialRepository.prototype.removeMaterial).mockResolvedValue()

      await store.removeMaterial(mockMaterial.id)

      expect(store.materials).toEqual([])
      expect(MaterialRepository.prototype.removeMaterial).toHaveBeenCalledWith(mockMaterial.id)
    })
  })

  describe('updateMaterial', () => {
    it('should update material and update state', async () => {
      const store = useMaterialsStore()
      const initialMaterial = { ...mockMaterial, name: 'Initial Name' }
      const updatedMaterial = { ...mockMaterial, name: 'Updated Name' }
      store.materials = [initialMaterial]

      vi.mocked(MaterialRepository.prototype.updateMaterial).mockResolvedValue(updatedMaterial)

      await store.updateMaterial(updatedMaterial)

      expect(store.materials[0]).toEqual(updatedMaterial)
      expect(MaterialRepository.prototype.updateMaterial).toHaveBeenCalledWith(updatedMaterial)
    })

    it('should not update state if material is not found', async () => {
      const store = useMaterialsStore()
      const nonExistentMaterial = { ...mockMaterial, id: 'non-existent' }
      store.materials = [mockMaterial]

      vi.mocked(MaterialRepository.prototype.updateMaterial).mockResolvedValue(nonExistentMaterial)

      await store.updateMaterial(nonExistentMaterial)

      expect(store.materials).toEqual([mockMaterial])
      expect(MaterialRepository.prototype.updateMaterial).toHaveBeenCalledWith(nonExistentMaterial)
    })
  })
})
