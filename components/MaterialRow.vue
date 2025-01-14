<template>
  <tr class="border-b hover:bg-gray-50">
    <template v-if="!editingIndexes.includes(index)">
      <!-- 表示モード -->
      <td class="px-4 py-2">{{ material.name }}</td>
      <td class="px-4 py-2">{{ material.unit_quantity }}</td>
      <td class="px-4 py-2">{{ material.unit_type }}</td>
      <td class="px-4 py-2">{{ formatPrice(material.price) }}</td>
    </template>
    <template v-else>
      <!-- 編集モード -->
      <td class="px-4 py-2">
        <input
          type="text"
          class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          :value="editingMaterials[index].name"
          @input="e => handleInput(e, index, 'name')"
        />
      </td>
      <td class="px-4 py-2">
        <input
          type="number"
          class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          :value="editingMaterials[index].unit_quantity"
          @input="e => handleInput(e, index, 'unit_quantity')"
        />
      </td>
      <td class="px-4 py-2">
        <input
          type="text"
          class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          :value="editingMaterials[index].unit_type"
          @input="e => handleInput(e, index, 'unit_type')"
        />
      </td>
      <td class="px-4 py-2">
        <input
          type="number"
          class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          :value="editingMaterials[index].price"
          @input="e => handleInput(e, index, 'price')"
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
      <Button label="削除" variant="danger" @click="$emit('remove-material', index)" />
    </td>
  </tr>
</template>

<script setup lang="ts">
  import type { Material, MaterialField } from '~/types/material'

  const emit = defineEmits([
    'update-editing-materials',
    'start-editing',
    'save-edit',
    'remove-material'
  ])

  const props = defineProps<{
    material: Material
    index: number
    editingIndexes: number[]
    editingMaterials: Material[]
  }>()

  const updateField = (index: number, field: MaterialField, value: string | number) => {
    emit('update-editing-materials', {
      ...props.editingMaterials[index],
      [field]: value
    })
  }

  const handleInput = (event: Event, index: number, field: MaterialField) => {
    const target = event.target as HTMLInputElement
    if (target) {
      const value =
        field === 'price' || field === 'unit_quantity'
          ? parseFloat(target.value) || 0
          : target.value
      updateField(index, field, value)
    }
  }

  const formatPrice = (price: number): string => {
    return price.toLocaleString('ja-JP')
  }
</script>
