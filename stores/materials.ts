import { defineStore } from 'pinia'
import { SupabaseMaterialRepository } from '~/repositories/materialRepository'
import type { Material } from '~/repositories/materialRepository'

export type { Material }

export const useMaterialsStore = defineStore('materials', () => {
  const repository = new SupabaseMaterialRepository()

  return {
    materials: [] as Material[],

    async fetchMaterials() {
      this.materials = await repository.fetchMaterials()
    },

    async addMaterial(material: Material) {
      const newMaterial = await repository.addMaterial(material)
      this.materials.unshift(newMaterial)
    },

    async removeMaterial(id: string) {
      await repository.removeMaterial(id)
      this.materials = this.materials.filter(m => m.id !== id)
    },

    async updateMaterial(id: string, newMaterial: Material) {
      const updatedMaterial = await repository.updateMaterial(id, newMaterial)
      const index = this.materials.findIndex(m => m.id === id)
      if (index !== -1) this.materials[index] = updatedMaterial
    },

    subscribeToChanges() {
      repository.subscribeToChanges(() => {
        this.fetchMaterials()
      })
    }
  }
})
