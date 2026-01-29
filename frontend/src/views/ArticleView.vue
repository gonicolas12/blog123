<template>
  <div class="container mx-auto px-4 py-12">
    <div v-if="loading" class="text-center text-white py-12">
      <p>Chargement de l'article...</p>
    </div>

    <div v-else-if="error" class="text-center text-red-500 py-12">
      <p>{{ error }}</p>
    </div>

    <article v-else-if="article" class="max-w-4xl mx-auto">
      <div class="mb-8">
        <span class="bg-primary text-white px-4 py-2 rounded-full text-sm font-oswald uppercase">
          {{ article.sport }}
        </span>
      </div>

      <h1 class="text-white font-oswald text-5xl font-bold mb-6">
        {{ article.title }}
      </h1>

      <div class="flex items-center text-gray-400 mb-8 space-x-4">
        <span>{{ formatDate(article.createdAt) }}</span>
        <span v-if="article.author">Par {{ article.author.email }}</span>
      </div>

      <div v-if="article.imageUrl" class="mb-8 rounded-lg overflow-hidden">
        <img 
          :src="article.imageUrl" 
          :alt="article.title"
          class="w-full h-96 object-cover"
        />
      </div>

      <div class="prose prose-invert prose-lg max-w-none">
        <div v-html="article.content" class="text-gray-300 leading-relaxed"></div>
      </div>
    </article>

    <div v-else class="text-center text-gray-400 py-12">
      <p>Article non trouvé</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '../stores/articleStore'

const route = useRoute()
const articleStore = useArticleStore()

const article = ref(null)
const loading = ref(true)
const error = ref(null)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  try {
    loading.value = true
    article.value = await articleStore.fetchArticleById(route.params.id)
  } catch (err) {
    error.value = 'Impossible de charger l\'article'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.prose {
  color: #e5e7eb;
}

.prose :deep(p) {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.prose :deep(h2) {
  font-family: 'Oswald', sans-serif;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose :deep(h3) {
  font-family: 'Oswald', sans-serif;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
</style>
