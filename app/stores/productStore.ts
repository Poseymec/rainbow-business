// ~/stores/productStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Product {
  id: number
  name: {
    fr: string
    en: string
  }
  categorie_id: number
  description1: {
    fr: string
    en: string
  }
  description2: {
    fr: string
    en: string
  }
  prix: number
  status: 'active' | 'inactive'
  images: string[] // URLs retournées par Laravel
  created_at?: string
  updated_at?: string
}

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch<Product[]>('/api/products', {
        credentials: 'include'
      })
      products.value = data
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors du chargement des produits'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (formData: FormData) => {
    loading.value = true
    error.value = null
    try {
      // Important : ne pas définir Content-Type → laisse le navigateur le gérer avec boundary
      const newProduct = await $fetch<Product>('/api/products', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })
      products.value.push(newProduct)
      return newProduct
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de la création du produit'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProduct = async (id: number, formData: FormData) => {
    loading.value = true
    error.value = null
    try {
      // Laravel attend _method=PUT dans FormData
      formData.append('_method', 'PUT')
      const updated = await $fetch<Product>(`/api/products/${id}`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = updated
      } else {
        await fetchProducts() // recharge si pas en cache
      }
      return updated
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de la mise à jour'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await $fetch(`/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      products.value = products.value.filter(p => p.id !== id)
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de la suppression'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getProductById = (id: number) => {
    return products.value.find(p => p.id === id)
  }

  const productsByCategory = computed(() => {
    return (categoryId: number) => {
      return products.value.filter(p => p.categorie_id === categoryId)
    }
  })

  return {
    products: computed(() => products.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    productsByCategory,

    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
  }
})