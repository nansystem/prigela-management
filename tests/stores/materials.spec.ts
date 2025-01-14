import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Material, NewMaterial } from '~/types/material'
import { useMaterialsStore } from '~/stores/materials'

describe('useMaterialsStore', () => {
  const repository = {
    fetchMaterials: vi.fn(),
    addMaterial: vi.fn(),
    removeMaterial: vi.fn(),
    updateMaterial: vi.fn()
  }

  beforeEach(() => {
    vi.resetAllMocks()
    repository.fetchMaterials.mockResolvedValue([])
  })

  it('should initialize with empty materials', () => {
    const store = useMaterialsStore()
    expect(store.materials).toEqual([])
  })

  describe('fetchMaterials', () => {
    it('should fetch and set materials', async () => {
      const mockData = [
        {
          id: '1',
          name: 'Test Material',
          unit_quantity: 10,
          unit_type: 'kg',
          price: 100,
          createdAt: '2024-01-01'
        }
      ]
      repository.fetchMaterials.mockResolvedValue(mockData)

      const store = useMaterialsStore()
      await store.fetchMaterials()

      expect(store.materials).toEqual(mockData)
      expect(repository.fetchMaterials).toHaveBeenCalled()
    })

    it('should handle fetch error', async () => {
      repository.fetchMaterials.mockRejectedValue(new Error('Failed to fetch'))

      const store = useMaterialsStore()
      await expect(store.fetchMaterials()).rejects.toThrow('Failed to fetch')
      expect(store.materials).toEqual([])
    })
  })

  describe('addMaterial', () => {
    it('should add material to the beginning of list', async () => {
      const newMaterial: NewMaterial = {
        name: 'New Material',
        unit_quantity: 5,
        unit_type: 'm',
        price: 50
      }
      const mockData = {
        id: '2',
        ...newMaterial,
        createdAt: '2024-01-02'
      }
      repository.addMaterial.mockResolvedValue(mockData)

      const store = useMaterialsStore()
      await store.addMaterial(newMaterial)

      expect(store.materials).toEqual([mockData])
      expect(repository.addMaterial).toHaveBeenCalledWith(newMaterial)
    })

    it('should handle add error', async () => {
      repository.addMaterial.mockRejectedValue(new Error('Failed to add'))

      const store = useMaterialsStore()
      await expect(store.addMaterial({} as NewMaterial)).rejects.toThrow('Failed to add')
      expect(store.materials).toEqual([])
    })
  })

  describe('removeMaterial', () => {
    it('should remove material from list', async () => {
      const initialMaterials = [
        {
          id: '1',
          name: 'Test Material',
          unit_quantity: 10,
          unit_type: 'kg',
          price: 100,
          createdAt: '2024-01-01'
        }
      ]
      repository.fetchMaterials.mockResolvedValue(initialMaterials)

      const store = useMaterialsStore()
      await store.fetchMaterials()
      await store.removeMaterial('1')

      expect(store.materials).toEqual([])
      expect(repository.removeMaterial).toHaveBeenCalledWith('1')
    })

    it('should handle remove error', async () => {
      repository.removeMaterial.mockRejectedValue(new Error('Failed to remove'))

      const store = useMaterialsStore()
      await expect(store.removeMaterial('1')).rejects.toThrow('Failed to remove')
    })
  })

  describe('updateMaterial', () => {
    it('should update material in list', async () => {
      const initialMaterial = {
        id: '1',
        name: 'Test Material',
        unit_quantity: 10,
        unit_type: 'kg',
        price: 100,
        createdAt: '2024-01-01'
      }
      const updatedMaterial = {
        ...initialMaterial,
        name: 'Updated Material'
      }
      repository.fetchMaterials.mockResolvedValue([initialMaterial])
      repository.updateMaterial.mockResolvedValue(updatedMaterial)

      const store = useMaterialsStore()
      await store.fetchMaterials()
      await store.updateMaterial(updatedMaterial)

      expect(store.materials).toEqual([updatedMaterial])
      expect(repository.updateMaterial).toHaveBeenCalledWith(updatedMaterial)
    })

    it('should handle update error', async () => {
      repository.updateMaterial.mockRejectedValue(new Error('Failed to update'))

      const store = useMaterialsStore()
      await expect(store.updateMaterial({} as Material)).rejects.toThrow('Failed to update')
    })
  })
})
