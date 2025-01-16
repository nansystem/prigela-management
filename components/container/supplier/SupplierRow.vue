<template>
  <tr class="border-b hover:bg-gray-50">
    <template v-if="!editingIndexes.includes(index)">
      <!-- 表示モード -->
      <td class="px-4 py-2">{{ supplier.name }}</td>
      <td class="px-4 py-2">
        <a
          v-if="supplier.url"
          :href="supplier.url"
          target="_blank"
          class="text-blue-500 hover:underline"
        >
          {{ supplier.url }}
        </a>
        <span v-else class="text-gray-400">未設定</span>
      </td>
    </template>
    <template v-else>
      <!-- 編集モード -->
      <td class="px-4 py-2">
        <input
          type="text"
          class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          :value="editingSuppliers[index].name"
          @input="e => handleInput(e, index, 'name')"
        />
      </td>
      <td class="px-4 py-2">
        <input
          type="text"
          class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          :value="editingSuppliers[index].url"
          @input="e => handleInput(e, index, 'url')"
        />
      </td>
    </template>

    <!-- アクションボタン -->
    <td class="px-4 py-2 flex justify-center space-x-3">
      <Button
        v-if="!editingIndexes.includes(index)"
        label="編集"
        variant="primary"
        @click="$emit('start-editing', index)"
      />
      <Button v-else label="保存" variant="success" @click="$emit('save-edit', index)" />
      <Button label="削除" variant="danger" @click="$emit('remove-supplier', index)" />
    </td>
  </tr>
</template>

<script setup lang="ts">
  import type { Database } from '~/types/supabase-types'

  const emit = defineEmits([
    'update-editing-suppliers',
    'start-editing',
    'save-edit',
    'remove-supplier'
  ])

  const props = defineProps<{
    supplier: Database['public']['Tables']['suppliers']['Row']
    index: number
    editingIndexes: number[]
    editingSuppliers: Database['public']['Tables']['suppliers']['Row'][]
  }>()

  const updateField = (index: number, field: 'name' | 'url', value: string) => {
    emit('update-editing-suppliers', {
      ...props.editingSuppliers[index],
      [field]: value
    })
  }

  const handleInput = (event: Event, index: number, field: 'name' | 'url') => {
    const target = event.target as HTMLInputElement
    if (target) {
      updateField(index, field, target.value)
    }
  }
</script>
