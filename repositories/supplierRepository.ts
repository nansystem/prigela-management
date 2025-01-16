import { SupabaseClient } from '@supabase/supabase-js'
import type { Database, Tables, TablesInsert, TablesUpdate } from '~/types/supabase-types'
import type { Supplier, NewSupplier } from '~/types/supplier'

export class SupplierRepository {
  private supabase

  constructor(supabase: SupabaseClient<Database>) {
    this.supabase = supabase
  }

  async fetchSuppliers(): Promise<Supplier[]> {
    const { data, error } = await this.supabase.from('suppliers').select('*')

    if (error || !data) {
      throw new Error('Fetch failed')
    }

    return data.map(row => this.mapToDomain(row))
  }

  async addSupplier(supplier: NewSupplier) {
    const insertData: TablesInsert<'suppliers'> = this.mapToSupabaseInsert(supplier)
    const { data, error } = await this.supabase.from('suppliers').insert(insertData).select()

    if (error) throw error
    return this.mapToDomain(data![0])
  }

  async updateSupplier(material: Supplier): Promise<Supplier> {
    const updateData: TablesUpdate<'suppliers'> = this.mapToSupabaseUpdate(material)
    const { data, error } = await this.supabase
      .from('suppliers')
      .update(updateData)
      .eq('id', material.id)
      .select('*')

    if (error) throw error
    if (!data || data.length === 0) {
      throw new Error('Failed to update supplier: No data returned.')
    }

    return this.mapToDomain(data[0])
  }

  async removeSupplier(id: string) {
    const { error } = await this.supabase.from('suppliers').delete().eq('id', id)

    if (error) throw error
  }

  private mapToDomain(row: Tables<'suppliers'>): Supplier {
    return {
      id: row.id,
      name: row.name,
      url: row.url,
      createdAt: row.created_at || undefined
    }
  }

  private mapToSupabaseInsert(supplier: NewSupplier): TablesInsert<'suppliers'> {
    return {
      name: supplier.name,
      url: supplier.url
    }
  }

  private mapToSupabaseUpdate(supplier: Supplier): TablesUpdate<'suppliers'> {
    return {
      name: supplier.name,
      url: supplier.url
    }
  }
}
