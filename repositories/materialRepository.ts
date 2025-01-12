import type { SupabaseClient } from '@supabase/supabase-js'
import { useAuthSupabase } from '~/utils/supabase'

export interface Material {
  id?: string
  name: string
  unit_quantity: number
  unit_type: string
  price: number
  created_at?: string
}

export interface MaterialRepository {
  fetchMaterials(): Promise<Material[]>
  addMaterial(material: Material): Promise<Material>
  removeMaterial(id: string): Promise<void>
  updateMaterial(id: string, material: Material): Promise<Material>
  subscribeToChanges(callback: () => void): void
}

export class SupabaseMaterialRepository implements MaterialRepository {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = useAuthSupabase()
  }

  async fetchMaterials(): Promise<Material[]> {
    const { data, error } = await this.supabase
      .from('materials')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  }

  async addMaterial(material: Material): Promise<Material> {
    const { data, error } = await this.supabase
      .from('materials')
      .insert([
        {
          ...material,
          unit_quantity: material.unit_quantity,
          unit_type: material.unit_type
        }
      ])
      .select()

    if (error) throw error
    return data[0]
  }

  async removeMaterial(id: string): Promise<void> {
    const { error } = await this.supabase.from('materials').delete().eq('id', id)

    if (error) throw error
  }

  async updateMaterial(id: string, material: Material): Promise<Material> {
    const { data, error } = await this.supabase
      .from('materials')
      .update({
        ...material,
        unit_quantity: material.unit_quantity,
        unit_type: material.unit_type
      })
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  }

  subscribeToChanges(callback: () => void): void {
    this.supabase
      .channel('materials')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'materials'
        },
        callback
      )
      .subscribe()
  }
}
