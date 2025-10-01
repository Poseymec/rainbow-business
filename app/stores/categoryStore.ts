// stores/categoryStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Category {
  id: number
  name: {
    fr: string
    en: string
  }
  created_at?: string
  updated_at?: string
}

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Récupérer toutes les catégories
  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch<Category[]>('/api/categories')
      categories.value = data
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement des catégories'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Créer une catégorie
  const createCategory = async (category: Omit<Category, 'id'>) => {
    try {
      const newCategory = await $fetch<Category>('/api/categories', {
        method: 'POST',
        body: category
      })
      categories.value.push(newCategory)
      return newCategory
    } catch (err: any) {
      throw new Error(err.data?.message || 'Erreur lors de la création')
    }
  }

  // Mettre à jour
  const updateCategory = async (id: number, category: Partial<Category>) => {
    try {
      const updated = await $fetch<Category>(`/api/categories/${id}`, {
        method: 'PUT',
        body: category
      })
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) categories.value[index] = updated
      return updated
    } catch (err: any) {
      throw new Error(err.data?.message || 'Erreur lors de la mise à jour')
    }
  }

  // Supprimer
  const deleteCategory = async (id: number) => {
    try {
      await $fetch(`/api/categories/${id}`, { method: 'DELETE' })
      categories.value = categories.value.filter(c => c.id !== id)
    } catch (err: any) {
      throw new Error(err.data?.message || 'Erreur lors de la suppression')
    }
  }

  const getCategoryById = (id: number) => {
    return categories.value.find(c => c.id === id)
  }

  return {
    categories: computed(() => categories.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),

    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
  }
})