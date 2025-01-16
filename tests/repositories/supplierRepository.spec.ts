import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import { SupplierRepository } from '~/repositories/supplierRepository'
import type { Supplier, NewSupplier } from '~/types/supplier'
import type { Database } from '~/types/supabase-types'

describe('SupplierRepository', () => {
  const supabase = createClient<Database>('https://test.supabase.co', 'test-key')
  const repository = new SupplierRepository(supabase)

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

  describe('fetchSuppliers', () => {
    it('should return suppliers when successful', async () => {
      const { mockSelect } = mockSupabaseQuery()
      const mockData = [
        {
          id: '1',
          name: 'Test Supplier',
          url: 'https://example.com',
          created_at: '2024-01-01'
        }
      ]

      mockSelect.mockResolvedValue({
        data: mockData,
        error: null
      })

      const result = await repository.fetchSuppliers()
      expect(result).toEqual([
        {
          id: '1',
          name: 'Test Supplier',
          url: 'https://example.com',
          createdAt: '2024-01-01'
        }
      ])
    })

    it('should handle suppliers with null created_at', async () => {
      const { mockSelect } = mockSupabaseQuery()
      const mockData = [
        {
          id: '1',
          name: 'Test Supplier',
          url: 'https://example.com',
          created_at: null
        }
      ]

      mockSelect.mockResolvedValue({
        data: mockData,
        error: null
      })

      const result = await repository.fetchSuppliers()
      expect(result[0].createdAt).toBeUndefined()
    })

    it('should throw error when fetch fails', async () => {
      const { mockSelect } = mockSupabaseQuery()
      mockSelect.mockResolvedValue({
        data: null,
        error: new Error('Fetch failed')
      })

      await expect(repository.fetchSuppliers()).rejects.toThrow('Fetch failed')
    })
  })

  describe('addSupplier', () => {
    const newSupplier: NewSupplier = {
      name: 'New Supplier',
      url: 'https://new.example.com'
    }

    it('should add and return supplier when successful', async () => {
      const { mockInsert } = mockSupabaseQuery()
      const mockData = [
        {
          id: '2',
          ...newSupplier,
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

      const result = await repository.addSupplier(newSupplier)
      expect(result).toEqual({
        id: '2',
        name: 'New Supplier',
        url: 'https://new.example.com',
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

      await expect(repository.addSupplier(newSupplier)).rejects.toThrow('Insert failed')
    })
  })

  describe('updateSupplier', () => {
    const supplier: Supplier = {
      id: '1',
      name: 'Updated Supplier',
      url: 'https://updated.example.com'
    }

    it('should update and return supplier when successful', async () => {
      const { mockUpdate } = mockSupabaseQuery()
      const mockData = [
        {
          ...supplier,
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

      const result = await repository.updateSupplier(supplier)
      expect(result).toEqual({
        ...supplier,
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

      await expect(repository.updateSupplier(supplier)).rejects.toThrow('Update failed')
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

      await expect(repository.updateSupplier(supplier)).rejects.toThrow(
        'Failed to update supplier: No data returned.'
      )
    })
  })

  describe('removeSupplier', () => {
    it('should remove supplier when successful', async () => {
      const { mockDelete } = mockSupabaseQuery()
      mockDelete.mockImplementation(() => ({
        eq: () =>
          Promise.resolve({
            error: null
          })
      }))

      await expect(repository.removeSupplier('1')).resolves.not.toThrow()
    })

    it('should throw error when delete fails', async () => {
      const { mockDelete } = mockSupabaseQuery()
      mockDelete.mockImplementation(() => ({
        eq: () =>
          Promise.resolve({
            error: new Error('Delete failed')
          })
      }))

      await expect(repository.removeSupplier('1')).rejects.toThrow('Delete failed')
    })
  })
})
