<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">
            <slot name="title"></slot>
          </h3>
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>({ required: true })

const close = () => {
  isOpen.value = false
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
