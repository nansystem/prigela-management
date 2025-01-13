<template>
  <div class="space-y-4">
    <button
      class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      @click="openAddModal"
    >
      材料を追加
    </button>

    <!-- 材料追加モーダル -->
    <AddMaterialModal v-model="isAddModalOpen" @submit="addMaterial" />
    <!-- 削除確認モーダル -->
    <DeleteConfirmationModal
      v-model="isDeleteModalOpen"
      message="本当に削除しますか"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
    <MaterialTable
      :materials="materialsStore.materials"
      :editing-indexes="editingIndexes"
      :editing-materials="editingMaterials"
      @start-editing="startEditing"
      @save-edit="saveEdit"
      @remove-material="removeMaterial"
    />
  </div>
</template>

<script setup lang="ts">
  import { useMaterialsStore } from '~/stores/materials'
  import { useAddMaterial } from '~/composables/useAddMaterial'
  import { useEditMaterial } from '~/composables/useEditMaterial'
  import { useDeleteMaterial } from '~/composables/useDeleteMaterial'

  const materialsStore = useMaterialsStore()
  materialsStore.fetchMaterials()

  const { isAddModalOpen, addMaterial, openAddModal } = useAddMaterial(materialsStore)

  const { editingIndexes, editingMaterials, startEditing, saveEdit } =
    useEditMaterial(materialsStore)

  const { isDeleteModalOpen, removeMaterial, confirmDelete, cancelDelete } =
    useDeleteMaterial(materialsStore)
</script>
