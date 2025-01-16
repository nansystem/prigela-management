import { computed, ref } from 'vue'
import type { Material } from '~/types/material'

export const useSearchMaterial = (materials: Ref<Material[]>) => {
  const searchQuery = ref('')

  const filteredMaterials = computed(() => {
    if (!searchQuery.value) return materials.value
    return materials.value.filter(material =>
      material.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  const searchMaterials = (query: string) => {
    searchQuery.value = query
  }

  return {
    searchQuery,
    filteredMaterials,
    searchMaterials
  }
}
