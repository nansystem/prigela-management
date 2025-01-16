<template>
  <div class="flex gap-2">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="仕入先名で検索"
      class="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      @input="onSearch"
    />
    <Button label="検索" variant="primary" @click="onSearch" />
  </div>
</template>

<script setup lang="ts">
  import Button from '~/components/presentational/Button.vue'

  const searchQuery = ref('')
  const emit = defineEmits(['search'])

  const onSearch = () => {
    emit('search', searchQuery.value)
  }
</script>
