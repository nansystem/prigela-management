<template>
  <Modal v-model="isOpen">
    <template #title>削除の確認</template>
    <div class="space-y-4">
      <p>{{ message }}</p>
      <div class="flex justify-end space-x-3">
        <button class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition" @click="cancel">
          キャンセル
        </button>
        <button
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          @click="confirm"
        >
          削除
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // Props
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

  // Emits
  const emit = defineEmits(['update:modelValue', 'confirm'])

  // モーダルの状態
  const isOpen = ref(props.modelValue)

  // モーダルを閉じる
  const cancel = () => {
    isOpen.value = false
    emit('update:modelValue', false)
  }

  // 削除を確定
  const confirm = () => {
    emit('confirm')
    isOpen.value = false
    emit('update:modelValue', false)
  }

  // モーダルの開閉状態を監視
  watch(
    () => props.modelValue,
    newVal => {
      isOpen.value = newVal
    }
  )
</script>
