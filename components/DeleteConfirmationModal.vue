<template>
  <Modal v-model="isOpen">
    <template #title>削除の確認</template>
    <div class="space-y-4">
      <p>{{ message }}</p>
      <div class="flex justify-end space-x-3">
        <Button label="キャンセル" variant="primary" @click="cancel" />
        <Button label="削除" variant="danger" @click="confirm" />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      default: '本当に削除しますか？'
    }
  })

  const emit = defineEmits(['update:modelValue', 'confirm'])

  const isOpen = ref(props.modelValue)

  const cancel = () => {
    isOpen.value = false
    emit('update:modelValue', false)
  }

  const confirm = () => {
    emit('confirm')
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
