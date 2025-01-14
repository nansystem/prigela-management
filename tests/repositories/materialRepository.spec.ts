import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import { MaterialRepository } from '~/repositories/materialRepository'
import type { Material, NewMaterial } from '~/types/material'

describe('MaterialRepository', () => {
  const supabase = createClient('https://test.supabase.co', 'test-key')
  const repository = new MaterialRepository(supabase)

  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('fetchMaterials', () => {
    it('should return materials when successful', async () => {
      const mockData = [
        {
          id: '1',
          name: 'Test Material',
          unit_quantity: 10,
          unit_type: 'kg',
          price: 100,
          created_at: '2024-01-01'
        }
      ]

      vi.spyOn(supabase.from('materials'), 'select').mockReturnValue({
        data: mockData,
        error: null
      } as any)

      const result = await repository.fetchMaterials()
      expect(result).toEqual([
        {
          id: '1',
          name: 'Test Material',
          unit_quantity: 10,
          unit_type: 'kg',
          price: 100,
          createdAt: '2024-01-01'
        }
      ])
    })

    it('should throw error when failed', async () => {
      vi.spyOn(supabase.from('materials'), 'select').mockReturnValue({
        data: null,
        error: new Error('Failed to fetch')
      } as any)

      await expect(repository.fetchMaterials()).rejects.toThrow('Failed to fetch')
    })
  })

  describe('addMaterial', () => {
    it('should add and return material when successful', async () => {
      const newMaterial: NewMaterial = {
        name: 'New Material',
        unit_quantity: 5,
        unit_type: 'm',
        price: 50
      }

      const mockData = {
        id: '2',
        ...newMaterial,
        created_at: '2024-01-02'
      }

      vi.spyOn(supabase.from('materials'), 'insert').mockReturnValue({
        data: [mockData],
        error: null
      } as any)

      const result = await repository.addMaterial(newMaterial)
      expect(result).toEqual({
        id: '2',
        name: 'New Material',
        unit_quantity: 5,
        unit_type: 'm',
        price: 50,
        createdAt: '2024-01-02'
      })
    })

    it('should throw error when failed', async () => {
      vi.spyOn(supabase.from('materials'), 'insert').mockReturnValue({
        data: null,
        error: new Error('Failed to add')
      } as any)

      await expect(repository.addMaterial({} as NewMaterial)).rejects.toThrow('Failed to add')
    })
  })

  describe('updateMaterial', () => {
    it('should update and return material when successful', async () => {
      const material: Material = {
        id: '1',
        name: 'Updated Material',
        unit_quantity: 20,
        unit_type: 'kg',
        price: 200
      }

      const mockData = {
        ...material,
        created_at: '2024-01-01'
      }

      vi.spyOn(supabase.from('materials'), 'update').mockReturnValue({
        data: [mockData],
        error: null
      } as any)

      const result = await repository.updateMaterial(material)
      expect(result).toEqual({
        ...material,
        createdAt: '2024-01-01'
      })
    })

    it('should throw error when failed', async () => {
      vi.spyOn(supabase.from('materials'), 'update').mockReturnValue({
        data: null,
        error: new Error('Failed to update')
      } as any)

      await expect(repository.updateMaterial({} as Material)).rejects.toThrow('Failed to update')
    })

    it('should throw error when no data returned', async () => {
      vi.spyOn(supabase.from('materials'), 'update').mockReturnValue({
        data: [],
        error: null
      } as any)

      await expect(repository.updateMaterial({} as Material)).rejects.toThrow(
        'Failed to update material: No data returned.'
      )
    })
  })

  describe('removeMaterial', () => {
    it('should remove material when successful', async () => {
      vi.spyOn(supabase.from('materials'), 'delete').mockReturnValue({
        error: null
      } as any)

      await expect(repository.removeMaterial('1')).resolves.not.toThrow()
    })

    it('should throw error when failed', async () => {
      vi.spyOn(supabase.from('materials'), 'delete').mockReturnValue({
        error: new Error('Failed to delete')
      } as any)

      await expect(repository.removeMaterial('1')).rejects.toThrow('Failed to delete')
    })
  })
})
