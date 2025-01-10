import { defineStore } from 'pinia'

export interface Material {
  name: string
  unitQuantity: number
  unitType: string
  price: number
}

export const useMaterialsStore = defineStore('materials', {
  state: () => ({
    materials: [] as Material[]
  }),
  actions: {
    addMaterial(material: Material) {
      this.materials.push(material)
    },
    removeMaterial(index: number) {
      this.materials.splice(index, 1)
    },
    updateMaterial(index: number, newMaterial: Material) {
      this.materials[index] = newMaterial
    }
  }
})
