<template>
  <form class="space-y-4" @submit.prevent="submitSupplier">
    <div class="grid grid-cols-1 gap-4">
      <input
        v-model="supplier.name"
        type="text"
        placeholder="仕入先名"
        class="w-full p-2 border rounded"
        maxlength="100"
        required
      />
      <input
        v-model="supplier.url"
        type="url"
        placeholder="URL"
        class="w-full p-2 border rounded"
        maxlength="255"
      />
    </div>
    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      {{ isEditMode ? '更新' : '追加' }}
    </button>
  </form>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { Supplier, SupplierInsert } from '~/types/supplier'

  const props = defineProps<{
    editSupplier?: Supplier
  }>()

  const emit = defineEmits<{
    (e: 'submit', supplier: SupplierInsert): void
  }>()

  const supplier = ref<SupplierInsert>({
    name: props.editSupplier?.name || '',
    url: props.editSupplier?.url || null
  })

  const isEditMode = computed(() => props.editSupplier !== undefined)

  const submitSupplier = () => {
    if (supplier.value.name.trim()) {
      emit('submit', { ...supplier.value })
      if (!isEditMode.value) {
        supplier.value = {
          name: '',
          url: null
        }
      }
    }
  }
</script>
