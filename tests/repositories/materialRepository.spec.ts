import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import { MaterialRepository } from '~/repositories/materialRepository'
import type { Material, NewMaterial } from '~/types/material'
import type { Database } from '~/types/supabase-types'

describe('MaterialRepository', () => {
  const supabase = createClient<Database>('https://test.supabase.co', 'test-key')
  const repository = new MaterialRepository(supabase)

  // モック用のヘルパー関数
  const mockSupabaseQuery = () => {
    const mockSelect = vi.fn()
    const mockEq = vi.fn()
    const mockDelete = vi.fn()
    const mockInsert = vi.fn()
    const mockUpdate = vi.fn()

    // from().select()のモック
    vi.spyOn(supabase, 'from').mockImplementation(
      () =>
        ({
          select: mockSelect,
          delete: mockDelete,
          insert: mockInsert,
          update: mockUpdate,
          eq: mockEq
        }) as any
    )

    return {
      mockSelect,
      mockEq,
      mockDelete,
      mockInsert,
      mockUpdate
    }
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('fetchMaterials', () => {
    it('should return materials when successful', async () => {
      const { mockSelect } = mockSupabaseQuery()
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

      mockSelect.mockResolvedValue({
        data: mockData,
        error: null
      })

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

    it('should handle materials with null created_at', async () => {
      const { mockSelect } = mockSupabaseQuery()
      const mockData = [
        {
          id: '1',
          name: 'Test Material',
          unit_quantity: 10,
          unit_type: 'kg',
          price: 100,
          created_at: null
        }
      ]

      mockSelect.mockResolvedValue({
        data: mockData,
        error: null
      })

      const result = await repository.fetchMaterials()
      expect(result[0].createdAt).toBeUndefined()
    })

    it('should throw error when fetch fails', async () => {
      const { mockSelect } = mockSupabaseQuery()
      mockSelect.mockResolvedValue({
        data: null,
        error: new Error('Fetch failed')
      })

      await expect(repository.fetchMaterials()).rejects.toThrow('Fetch failed')
    })
  })

  describe('addMaterial', () => {
    const newMaterial: NewMaterial = {
      name: 'New Material',
      unit_quantity: 5,
      unit_type: 'm',
      price: 50
    }

    it('should add and return material when successful', async () => {
      const { mockInsert } = mockSupabaseQuery()
      const mockData = [
        {
          id: '2',
          ...newMaterial,
          created_at: '2024-01-02'
        }
      ]

      mockInsert.mockImplementation(() => ({
        select: () =>
          Promise.resolve({
            data: mockData,
            error: null
          })
      }))

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

    it('should throw error when insert fails', async () => {
      const { mockInsert } = mockSupabaseQuery()
      mockInsert.mockImplementation(() => ({
        select: () =>
          Promise.resolve({
            data: null,
            error: new Error('Insert failed')
          })
      }))

      await expect(repository.addMaterial(newMaterial)).rejects.toThrow('Insert failed')
    })
  })

  describe('updateMaterial', () => {
    const material: Material = {
      id: '1',
      name: 'Updated Material',
      unit_quantity: 20,
      unit_type: 'kg',
      price: 200
    }

    it('should update and return material when successful', async () => {
      const { mockUpdate } = mockSupabaseQuery()
      const mockData = [
        {
          ...material,
          created_at: '2024-01-01'
        }
      ]

      mockUpdate.mockImplementation(() => ({
        eq: () => ({
          select: () =>
            Promise.resolve({
              data: mockData,
              error: null
            })
        })
      }))

      const result = await repository.updateMaterial(material)
      expect(result).toEqual({
        ...material,
        createdAt: '2024-01-01'
      })
    })

    it('should throw error when update fails', async () => {
      const { mockUpdate } = mockSupabaseQuery()
      mockUpdate.mockImplementation(() => ({
        eq: () => ({
          select: () =>
            Promise.resolve({
              data: null,
              error: new Error('Update failed')
            })
        })
      }))

      await expect(repository.updateMaterial(material)).rejects.toThrow('Update failed')
    })

    it('should throw error when no data is returned', async () => {
      const { mockUpdate } = mockSupabaseQuery()
      mockUpdate.mockImplementation(() => ({
        eq: () => ({
          select: () =>
            Promise.resolve({
              data: [],
              error: null
            })
        })
      }))

      await expect(repository.updateMaterial(material)).rejects.toThrow(
        'Failed to update material: No data returned.'
      )
    })
  })

  describe('removeMaterial', () => {
    it('should remove material when successful', async () => {
      const { mockDelete } = mockSupabaseQuery()
      mockDelete.mockImplementation(() => ({
        eq: () =>
          Promise.resolve({
            error: null
          })
      }))

      await expect(repository.removeMaterial('1')).resolves.not.toThrow()
    })

    it('should throw error when delete fails', async () => {
      const { mockDelete } = mockSupabaseQuery()
      mockDelete.mockImplementation(() => ({
        eq: () =>
          Promise.resolve({
            error: new Error('Delete failed')
          })
      }))

      await expect(repository.removeMaterial('1')).rejects.toThrow('Delete failed')
    })
  })
})
