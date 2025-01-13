import { defineStore } from 'pinia'
import { MaterialRepository } from '~/repositories/materialRepository'
import type { Material, NewMaterial } from '~/types/material'

export const useMaterialsStore = defineStore('materials', () => {
  const repository = new MaterialRepository(useSupabase())

  return {
    materials: [] as Material[],

    async fetchMaterials() {
      this.materials = await repository.fetchMaterials()
    },

    async addMaterial(material: NewMaterial) {
      const newMaterial = await repository.addMaterial(material)
      this.materials.unshift(newMaterial)
    },

    async removeMaterial(id: string) {
      await repository.removeMaterial(id)
      this.materials = this.materials.filter(m => m.id !== id)
    },

    async updateMaterial(material: Material) {
      const updatedMaterial = await repository.updateMaterial(material)
      const index = this.materials.findIndex(m => m.id === material.id)
      if (index !== -1) this.materials[index] = updatedMaterial
    }
  }
})

export type MaterialsStore = ReturnType<typeof useMaterialsStore>
