<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-80">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Confirmation</h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Voulez-vous vraiment supprimer 
        <span class="font-bold text-red-600 dark:text-red-400">
          "{{ itemName }}"
        </span> ?
      </p>

      <div class="flex justify-end gap-3 mt-4">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400"
        >
          Annuler
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  itemName: {
    type: String,
    default: ''
  }
})

defineEmits(["confirm", "cancel"])
</script>
