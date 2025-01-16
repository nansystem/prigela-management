<template>
  <div class="space-y-4">
    <SearchSupplier @search="searchSuppliers" />
    <button
      class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      @click="openAddModal"
    >
      仕入先を追加
    </button>

    <!-- 仕入先追加モーダル -->
    <AddSupplierModal v-model="isAddModalOpen" @submit="addSupplier" />
    <!-- 削除確認モーダル -->
    <DeleteConfirmationModal
      v-model="isDeleteModalOpen"
      message="本当に削除しますか"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
    <SupplierTable
      :suppliers="filteredSuppliers"
      :editing-indexes="editingIndexes"
      :editing-suppliers="editingSuppliers"
      @start-editing="startEditing"
      @save-edit="saveEdit"
      @remove-supplier="removeSupplier"
      @update-editing-suppliers="updateEditingSuppliers"
    />
  </div>
</template>

<script setup lang="ts">
  import { useSuppliersStore } from '~/stores/suppliers'
  import { useAddSupplier } from '~/composables/supplier/useAddSupplier'
  import { useEditSupplier } from '~/composables/supplier/useEditSupplier'
  import { useDeleteSupplier } from '~/composables/material/useDeleteSupplier'
  import { useSearchSupplier } from '~/composables/supplier/useSearchSupplier'

  const suppliersStore = useSuppliersStore()
  suppliersStore.fetchSuppliers()

  const { isAddModalOpen, addSupplier, openAddModal } = useAddSupplier(suppliersStore)

  const { editingIndexes, editingSuppliers, startEditing, saveEdit, updateEditingSuppliers } =
    useEditSupplier(suppliersStore)

  const { isDeleteModalOpen, removeSupplier, confirmDelete, cancelDelete } =
    useDeleteSupplier(suppliersStore)

  const { filteredSuppliers, searchSuppliers } = useSearchSupplier(
    toRef(suppliersStore, 'suppliers')
  )
</script>
