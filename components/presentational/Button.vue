<template>
  <button :class="buttonClass" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
  defineEmits<{
    (e: 'click'): void
  }>()

  const props = defineProps<{
    label: string
    variant: 'primary' | 'success' | 'danger'
  }>()

  const buttonClass = computed(() => {
    const base = 'px-3 py-1 text-white rounded transition'
    const variants = {
      primary: 'bg-blue-500 hover:bg-blue-600',
      success: 'bg-green-500 hover:bg-green-600',
      danger: 'bg-red-500 hover:bg-red-600'
    }
    return `${base} ${variants[props.variant]}`
  })
</script>
