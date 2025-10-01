// stores/productStore.ts
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
  images: string[] // Laravel retournera les URLs des images
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
      const data = await $fetch<Product[]>('/api/products')
      products.value = data
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement des produits'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (productData: FormData | Omit<Product, 'id' | 'images'> & { images?: File[] }) => {
    // On gère FormData pour les images
    try {
      const newProduct = await $fetch<Product>('/api/products', {
        method: 'POST',
        body: productData
      })
      products.value.push(newProduct)
      return newProduct
    } catch (err: any) {
      throw new Error(err.data?.message || 'Erreur lors de la création du produit')
    }
  }

  const updateProduct = async (id: number, productData: FormData | Partial<Product>) => {
    try {
      const updated = await $fetch<Product>(`/api/products/${id}`, {
        method: 'POST', // Laravel utilise POST + _method=PUT
        body: {
          ...productData,
          _method: 'PUT'
        }
      })
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) products.value[index] = updated
      return updated
    } catch (err: any) {
      throw new Error(err.data?.message || 'Erreur lors de la mise à jour')
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      await $fetch(`/api/products/${id}`, { method: 'DELETE' })
      products.value = products.value.filter(p => p.id !== id)
    } catch (err: any) {
      throw new Error(err.data?.message || 'Erreur lors de la suppression')
    }
  }

  const productsByCategory = computed(() => {
    return (categoryId: number) => {
      return products.value.filter(p => p.categorie_id === categoryId)
    }
  })

  const getProductById = (id: number) => {
    return products.value.find(p => p.id === id)
  }

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