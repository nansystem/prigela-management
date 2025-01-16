<template>
  <Modal v-model="isOpen">
    <template #title>{{ editSupplier ? '仕入先を編集' : '仕入先を追加' }}</template>
    <SupplierForm :edit-supplier="editSupplier" @submit="submitSupplier" />
  </Modal>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import type { Supplier, SupplierInsert } from '~/types/supplier'

  const props = defineProps<{
    modelValue: boolean
    editSupplier?: Supplier
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'submit', supplier: SupplierInsert): void
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

  const submitSupplier = (supplier: SupplierInsert) => {
    emit('submit', supplier)
    close()
  }
</script>
