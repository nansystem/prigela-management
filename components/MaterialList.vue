<template>
  <div class="space-y-4">
    <SearchMaterial @search="searchMaterials" />
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
      :materials="filteredMaterials"
      :editing-indexes="editingIndexes"
      :editing-materials="editingMaterials"
      @start-editing="startEditing"
      @save-edit="saveEdit"
      @remove-material="removeMaterial"
      @update-editing-materials="updateEditingMaterials"
    />
  </div>
</template>

<script setup lang="ts">
  import { useMaterialsStore } from '~/stores/materials'
  import { useAddMaterial } from '~/composables/useAddMaterial'
  import { useEditMaterial } from '~/composables/useEditMaterial'
  import { useDeleteMaterial } from '~/composables/useDeleteMaterial'
  import { useSearchMaterial } from '~/composables/useSearchMaterial'

  const materialsStore = useMaterialsStore()
  materialsStore.fetchMaterials()

  const { isAddModalOpen, addMaterial, openAddModal } = useAddMaterial(materialsStore)

  const { editingIndexes, editingMaterials, startEditing, saveEdit, updateEditingMaterials } =
    useEditMaterial(materialsStore)

  const { isDeleteModalOpen, removeMaterial, confirmDelete, cancelDelete } =
    useDeleteMaterial(materialsStore)

  const { filteredMaterials, searchMaterials } = useSearchMaterial(
    toRef(materialsStore, 'materials')
  )
</script>
