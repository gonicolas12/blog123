<template>
  <div>
    <!-- Hero Section -->
    <section class="hero bg-gradient-to-b from-gray-900 to-dark relative py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-white font-oswald text-5xl font-bold">
          Articles <span class="text-primary">{{ sportName }}</span>
        </h1>
      </div>
    </section>

    <!-- Articles Section -->
    <section class="container mx-auto px-4 py-12">
      <div v-if="loading" class="text-center text-white py-12">
        <p>Chargement des articles...</p>
      </div>

      <div v-else-if="error" class="text-center text-red-500 py-12">
        <p>{{ error }}</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ArticleCard 
          v-for="article in articles" 
          :key="article.id"
          :article="article"
        />
      </div>

      <div v-if="!loading && articles.length === 0" class="text-center text-gray-400 py-12">
        <p>Aucun article {{ sportName }} disponible pour le moment.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '../stores/articleStore'
import ArticleCard from '../components/ArticleCard.vue'

const route = useRoute()
const articleStore = useArticleStore()

const articles = ref([])
const loading = ref(true)
const error = ref(null)

const sportName = computed(() => {
  const sport = route.params.sport
  const sportNames = {
    'foot': 'Football',
    'basket': 'Basketball',
    'rugby': 'Rugby'
  }
  return sportNames[sport] || sport
})

const loadArticles = async () => {
  try {
    loading.value = true
    error.value = null
    articles.value = await articleStore.fetchArticlesBySport(route.params.sport)
  } catch (err) {
    error.value = 'Impossible de charger les articles'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadArticles()
})

watch(() => route.params.sport, () => {
  loadArticles()
})
</script>
