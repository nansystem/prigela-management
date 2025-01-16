import { computed, ref } from 'vue'
import type { Database } from '~/types/supabase-types'

export const useSearchSupplier = (
  suppliers: Ref<Database['public']['Tables']['suppliers']['Row'][]>
) => {
  const searchQuery = ref('')

  const filteredSuppliers = computed(() => {
    if (!searchQuery.value) return suppliers.value
    return suppliers.value.filter(supplier =>
      supplier.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  const searchSuppliers = (query: string) => {
    searchQuery.value = query
  }

  return {
    searchQuery,
    filteredSuppliers,
    searchSuppliers
  }
}
