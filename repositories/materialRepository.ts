import { SupabaseClient } from '@supabase/supabase-js'
import type { Database, Tables, TablesInsert, TablesUpdate } from '~/types/supabase-types'
import type { Material, NewMaterial } from '~/types/material'

export class MaterialRepository {
  private supabase

  constructor(supabase: SupabaseClient<Database>) {
    this.supabase = supabase
  }

  async fetchMaterials(): Promise<Material[]> {
    const { data, error } = await this.supabase.from('materials').select('*')

    if (error) throw error

    return (data || []).map(row => this.mapToDomain(row))
  }

  async addMaterial(material: NewMaterial): Promise<Material> {
    const insertData: TablesInsert<'materials'> = this.mapToSupabaseInsert(material)
    const { data, error } = await this.supabase.from('materials').insert(insertData).select()

    if (error) throw error
    return this.mapToDomain(data![0])
  }

  // Update a material and return as domain model
  async updateMaterial(material: Material): Promise<Material> {
    const updateData: TablesUpdate<'materials'> = this.mapToSupabaseUpdate(material)
    const { data, error } = await this.supabase
      .from('materials')
      .update(updateData)
      .eq('id', material.id)
      .select()

    if (error) throw error
    if (!data || data.length === 0) {
      throw new Error('Failed to update material: No data returned.')
    }

    return this.mapToDomain(data[0])
  }

  async removeMaterial(id: string): Promise<void> {
    const { error } = await this.supabase.from('materials').delete().eq('id', id)

    if (error) throw error
  }

  private mapToDomain(row: Tables<'materials'>): Material {
    return {
      id: row.id,
      name: row.name,
      unit_quantity: row.unit_quantity,
      unit_type: row.unit_type,
      price: row.price,
      createdAt: row.created_at || undefined
    }
  }

  private mapToSupabaseInsert(material: NewMaterial): TablesInsert<'materials'> {
    return {
      name: material.name,
      unit_quantity: material.unit_quantity,
      unit_type: material.unit_type,
      price: material.price
    }
  }

  private mapToSupabaseUpdate(material: Material): TablesUpdate<'materials'> {
    return {
      name: material.name,
      unit_quantity: material.unit_quantity,
      unit_type: material.unit_type,
      price: material.price
    }
  }
}
