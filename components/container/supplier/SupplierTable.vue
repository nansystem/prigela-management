<template>
  <table class="min-w-full border border-gray-300 bg-white rounded-lg shadow-md">
    <thead>
      <tr class="bg-gray-100 border-b">
        <th class="px-4 py-2 text-left text-gray-700 font-semibold">仕入先名</th>
        <th class="px-4 py-2 text-left text-gray-700 font-semibold">URL</th>
        <th class="px-4 py-2 text-center text-gray-700 font-semibold">アクション</th>
      </tr>
    </thead>
    <tbody>
      <SupplierRow
        v-for="(supplier, index) in suppliers"
        :key="index"
        :supplier="supplier"
        :index="index"
        :editing-indexes="editingIndexes"
        :editing-suppliers="editingSuppliers"
        @start-editing="startEditing"
        @save-edit="saveEdit"
        @remove-supplier="removeSupplier"
        @update-editing-suppliers="updateEditingSuppliers"
      />
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import type { Database } from '~/types/supabase-types'

  defineProps<{
    suppliers: Database['public']['Tables']['suppliers']['Row'][]
    editingIndexes: number[]
    editingSuppliers: Database['public']['Tables']['suppliers']['Row'][]
  }>()

  const emit = defineEmits(['startEditing', 'saveEdit', 'removeSupplier', 'updateEditingSuppliers'])

  const startEditing = (index: number) => {
    emit('startEditing', index)
  }

  const saveEdit = (index: number) => {
    emit('saveEdit', index)
  }

  const removeSupplier = (index: number) => {
    emit('removeSupplier', index)
  }

  const updateEditingSuppliers = (
    updatedSupplier: Database['public']['Tables']['suppliers']['Row']
  ) => {
    emit('updateEditingSuppliers', updatedSupplier)
  }
</script>
