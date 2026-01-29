<template>
  <div class="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <RouterLink :to="`/article/${article.id}`">
      <div class="relative h-48 overflow-hidden">
        <img 
          :src="article.imageUrl || '/assets/images/placeholder.jpg'" 
          :alt="article.title"
          class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div class="absolute top-4 left-4">
          <span class="bg-primary text-white px-3 py-1 rounded-full text-sm font-oswald uppercase">
            {{ article.sport }}
          </span>
        </div>
      </div>
      
      <div class="p-6">
        <h3 class="text-white font-oswald text-2xl font-bold mb-2 hover:text-primary transition-colors">
          {{ article.title }}
        </h3>
        
        <p v-if="article.excerpt" class="text-gray-400 mb-4 line-clamp-3">
          {{ article.excerpt }}
        </p>
        
        <div class="flex items-center justify-between text-sm text-gray-500">
          <span>{{ formatDate(article.createdAt) }}</span>
          <span class="text-primary hover:text-secondary transition-colors font-oswald">
            Lire l'article →
          </span>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  article: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
