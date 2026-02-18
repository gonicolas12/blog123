<template>
  <RouterLink :to="`/article/${article.id}`" class="article-card">
    <div class="card-image">
      <img
        :src="article.imageUrl || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80'"
        :alt="article.title"
        class="card-img"
      />
      <div class="card-badges">
        <span v-if="categoryName" class="badge badge-cat">{{ categoryName }}</span>
        <span v-if="article.type" class="badge badge-type">{{ article.type }}</span>
      </div>
    </div>

    <div class="card-body">
      <h3 class="card-title">{{ article.title }}</h3>
      <p v-if="article.excerpt" class="card-excerpt">{{ article.excerpt }}</p>
      <div class="card-meta">
        <span class="card-date">{{ formatDate(article.createdAt || article.publishedAt) }}</span>
        <span class="card-read">Lire →</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const categoryName = computed(() => {
  if (props.article.category?.name) return props.article.category.name
  if (typeof props.article.category === 'string') return props.article.category
  return null
})

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.article-card {
  display: flex;
  flex-direction: column;
  background: #191D24;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #2B303B;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.article-card:hover .card-img {
  transform: scale(1.05);
}

.card-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 6px;
}

.badge {
  padding: 3px 10px;
  border-radius: 4px;
  font-family: 'Oswald', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-cat {
  background: #FC602E;
  color: #FAFAFA;
}

.badge-type {
  background: rgba(255,255,255,0.15);
  color: #FAFAFA;
  backdrop-filter: blur(4px);
}

.card-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-family: 'Oswald', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #FAFAFA;
  margin-bottom: 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  font-size: 13px;
  line-height: 1.6;
  color: #9CA3AF;
  margin-bottom: 16px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.card-date {
  color: #6B7280;
}

.card-read {
  color: #FC602E;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 13px;
}
</style>
