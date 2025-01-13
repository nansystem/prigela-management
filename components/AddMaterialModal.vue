<template>
  <Modal v-model="isOpen">
    <template #title>{{ editMaterial ? '材料を編集' : '材料を追加' }}</template>
    <MaterialForm :edit-material="editMaterial" @submit="submitMaterial" />
  </Modal>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import MaterialForm from './MaterialForm.vue'
  import Modal from './Modal.vue'
  import type { Material, NewMaterial } from '~/types/material'

  const props = defineProps<{
    modelValue: boolean
    editMaterial?: Material
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'submit', material: Material | NewMaterial): void
  }>()

  const isOpen = ref(props.modelValue)

  watch(
    () => props.modelValue,
    newValue => {
      isOpen.value = newValue
    }
  )

  const close = () => {
    isOpen.value = false
    emit('update:modelValue', false)
  }

  const submitMaterial = (material: Material | NewMaterial) => {
    emit('submit', material)
    close()
  }
</script>
