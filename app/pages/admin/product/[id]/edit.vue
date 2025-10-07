<!-- app/pages/admin/product/[id]/edit.vue -->
<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold text-red-600 mb-6">Modifier le produit</h1>

    <div v-if="loading" class="text-center py-10">Chargement...</div>

    <form v-else @submit.prevent="submit" class="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <!-- Nom (FR/EN) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name_fr" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom (Français) *</label>
          <input v-model="form.name.fr" id="name_fr" type="text" required class="w-full px-4 py-2 border..." />
        </div>
        <div>
          <label for="name_en" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom (Anglais) *</label>
          <input v-model="form.name.en" id="name_en" type="text" required class="w-full px-4 py-2 border..." />
        </div>
      </div>

      <!-- Catégorie -->
      <div>
        <label for="categorie_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Catégorie *</label>
        <select v-model="form.categorie_id" id="categorie_id" required class="w-full px-4 py-2 border...">
          <option value="">Sélectionnez une catégorie</option>
          <option v-for="cat in categoryStore.categories" :key="cat.id" :value="cat.id">
            {{ cat.name.fr }} ({{ cat.name.en }})
          </option>
        </select>
      </div>

      <!-- Descriptions (FR/EN) -->
      <!-- ... même structure que création ... -->

      <!-- Prix -->
      <div>
        <label for="prix" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prix (F CFA) *</label>
        <input v-model.number="form.prix" id="prix" type="number" required min="0" class="w-full px-4 py-2 border..." />
      </div>

      <!-- Images existantes -->
      <div v-if="existingImageUrls.length">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Images actuelles</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div v-for="(url, index) in existingImageUrls" :key="index" class="relative">
            <img :src="url" :alt="`Image ${index + 1}`" class="w-full h-24 object-cover rounded border" />
            <button
              type="button"
              @click="markImageForDeletion(url)"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <!-- Nouvelles images -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ajouter de nouvelles images</label>
        <input type="file" multiple accept="image/*" @change="handleNewImageUpload" class="block w-full..." />
      </div>

      <!-- Statut -->
      <!-- ... toggle inchangé ... -->

      <!-- Boutons -->
      <div class="flex gap-3">
        <button type="submit" :disabled="productStore.loading" class="...">
          {{ productStore.loading ? 'Mise à jour...' : 'Mettre à jour' }}
        </button>
        <NuxtLink to="/admin/product/" class="...">Annuler</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '~/stores/productStore'
import { useCategoryStore } from '~/stores/categoryStore'


definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const categoryStore = useCategoryStore()

const form = reactive({
  name: { fr: '', en: '' },
  categorie_id: null as number | null,
  description1: { fr: '', en: '' },
  description2: { fr: '', en: '' },
  prix: null as number | null,
  status: 'active' as 'active' | 'inactive'
})

const existingImageUrls = ref<string[]>([])
const imagesToDelete = ref<string[]>([])
const newImages = ref<File[]>([])
const loading = ref(true)

onMounted(async () => {
  if (categoryStore.categories.length === 0) {
    await categoryStore.fetchCategories()
  }

  const id = Number(route.params.id)
  const existing = productStore.getProductById(id)

  if (existing) {
    Object.assign(form, existing)
    existingImageUrls.value = [...existing.images]
  } else {
    try {
      // ✅ Typage explicite avec <Product>
      const product = await $fetch<Product>(`/api/products/${id}`, {
        credentials: 'include'
      })
      Object.assign(form, product)
      existingImageUrls.value = [...product.images]
    } catch (err) {
      alert('Produit introuvable')
      router.push('/admin/product/')
      return
    }
  }
  loading.value = false
})
const handleNewImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    newImages.value = Array.from(target.files)
  }
}

const markImageForDeletion = (url: string) => {
  imagesToDelete.value.push(url)
  existingImageUrls.value = existingImageUrls.value.filter(u => u !== url)
}

const submit = async () => {
  if (!form.name.fr.trim() || !form.name.en.trim() || !form.categorie_id || !form.prix) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }

  try {
    const formData = new FormData()
    formData.append('name_fr', form.name.fr)
    formData.append('name_en', form.name.en)
    formData.append('categorie_id', form.categorie_id.toString())
    formData.append('description1_fr', form.description1.fr)
    formData.append('description1_en', form.description1.en)
    formData.append('description2_fr', form.description2.fr)
    formData.append('description2_en', form.description2.en)
    formData.append('prix', form.prix.toString())
    formData.append('status', form.status)

    imagesToDelete.value.forEach(url => {
      formData.append('images_to_delete[]', url)
    })

    newImages.value.forEach(file => {
      formData.append('new_images[]', file)
    })

    await productStore.updateProduct(Number(route.params.id), formData)
    alert('Produit mis à jour avec succès !')
    router.push('/admin/product/')
  } catch (err) {
    alert('Erreur : ' + (productStore.error || 'Échec de la mise à jour.'))
  }
}
</script>