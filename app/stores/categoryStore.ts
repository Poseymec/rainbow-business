// ~/stores/categoryStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRuntimeConfig } from '#imports'

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
  const config = useRuntimeConfig()

  // Récupérer toutes les catégories
  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
    

      const data = await $fetch<Category[]>(`${config.public.apiBase}/api/categories`, {
        credentials: 'include'
      })

      categories.value = data
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors du chargement des catégories'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Créer une catégorie
  const createCategory = async (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
    loading.value = true
    error.value = null
    try {
   
      const newCategory = await $fetch<Category>(`${config.public.apiBase}/api/categories`, {
        method: 'POST',
        body: category,
        credentials: 'include'
      })
      categories.value.push(newCategory)
      return newCategory
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de la création'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Mettre à jour une catégorie
  const updateCategory = async (id: number, category: Partial<Category>) => {
    loading.value = true
    error.value = null
    try {
      const updated = await $fetch<Category>(`/api/categories/${id}`, {
        method: 'PUT',
        body: category,
        credentials: 'include'
      })
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value[index] = updated
      } else {
        // Optionnel : recharge la liste si pas en cache
        await fetchCategories()
      }
      return updated
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de la mise à jour'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Supprimer une catégorie
  const deleteCategory = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await $fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      categories.value = categories.value.filter(c => c.id !== id)
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de la suppression'
      throw err
    } finally {
      loading.value = false
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