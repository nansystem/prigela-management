<template>
  <Modal v-model="isOpen">
    <template #title>材料を追加</template>
    <MaterialForm @success="closeModal" />
  </Modal>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import Modal from './Modal.vue'
  import MaterialForm from './MaterialForm.vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const isOpen = ref(props.modelValue)

  const closeModal = () => {
    isOpen.value = false
    emit('update:modelValue', false)
  }

  watch(
    () => props.modelValue,
    newVal => {
      isOpen.value = newVal
    }
  )
</script>
