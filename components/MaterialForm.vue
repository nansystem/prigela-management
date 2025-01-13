<template>
  <form class="space-y-4" @submit.prevent="submitMaterial">
    <div class="grid grid-cols-1 gap-4">
      <input
        v-model="material.name"
        type="text"
        placeholder="材料名"
        class="w-full p-2 border rounded"
        maxlength="100"
        required
      />
      <div class="grid grid-cols-2 gap-2">
        <input
          v-model.number="material.unit_quantity"
          type="number"
          placeholder="単位量"
          class="w-full p-2 border rounded"
          min="1"
          max="9999"
          required
        />
        <input
          v-model="material.unit_type"
          type="text"
          placeholder="単位 (kg, mlなど)"
          class="w-full p-2 border rounded"
          maxlength="10"
          required
        />
      </div>
      <input
        v-model.number="material.price"
        type="number"
        placeholder="価格 (円)"
        class="w-full p-2 border rounded"
        min="0"
        max="9999999999"
        required
      />
    </div>
    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      {{ isEditMode ? '更新' : '追加' }}
    </button>
  </form>
</template>

<script setup lang="ts">
  import { useMaterialsStore } from '~/stores/materials'
  import type { Material } from '~/stores/materials'

  const props = defineProps<{
    editMaterial?: Material
  }>()

  const emit = defineEmits<{
    (e: 'success'): void
  }>()

  const material = ref<Material>(
    props.editMaterial || {
      name: '',
      unit_quantity: 1,
      unit_type: '',
      price: 0
    }
  )

  const isEditMode = computed(() => !!props.editMaterial?.id)

  const materialsStore = useMaterialsStore()

  const submitMaterial = () => {
    if (
      material.value.name.trim() &&
      material.value.unit_type.trim() &&
      material.value.unit_quantity > 0 &&
      material.value.price >= 0
    ) {
      const action = isEditMode.value
        ? materialsStore.updateMaterial(material.value.id!, material.value)
        : materialsStore.addMaterial(material.value)

      action.then(() => {
        if (!isEditMode.value) {
          material.value = {
            name: '',
            unit_quantity: 1,
            unit_type: '',
            price: 0
          }
        }
        emit('success')
      })
    }
  }
</script>
