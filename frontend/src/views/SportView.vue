<template>
  <div class="sport-page">
    <div class="sport-main">

      <!-- Sidebar filters -->
      <aside class="filters-sidebar">
        <div class="filter-block">
          <h3 class="filter-title">FILTRER PAR SPORT</h3>
          <ul class="filter-list">
            <li
              class="filter-item"
              :class="{ active: activeCategoryId === null }"
              @click="activeCategoryId = null"
            >
              <span class="filter-icon">🏆</span>
              <span class="filter-name">Tous</span>
              <span class="filter-count">{{ allArticles.length }}</span>
            </li>
            <li
              v-for="cat in categories"
              :key="cat.id"
              class="filter-item"
              :class="{ active: activeCategoryId === cat.id }"
              @click="activeCategoryId = cat.id"
            >
              <span class="filter-icon">{{ categoryIcon(cat.slug) }}</span>
              <span class="filter-name">{{ cat.name }}</span>
              <span class="filter-count">{{ articleCountByCategory(cat.id) }}</span>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Articles grid -->
      <div class="articles-area">
        <div v-if="loading" class="loading-state">Chargement des articles...</div>

        <template v-else>
          <p class="articles-count">{{ filteredArticles.length }} article{{ filteredArticles.length > 1 ? 's' : '' }}</p>

          <div v-if="filteredArticles.length === 0" class="empty-state">
            Aucun article dans cette catégorie pour le moment.
          </div>

          <div v-else class="articles-grid">
            <RouterLink
              v-for="article in filteredArticles"
              :key="article.id"
              :to="`/article/${article.id}`"
              class="article-card"
            >
              <div class="card-image">
                <img
                  :src="article.imageUrl || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80'"
                  :alt="article.title"
                />
                <div class="card-tags">
                  <span v-if="article.category?.name" class="tag tag-sport" :style="{ background: categoryColor(article.category.slug) }">
                    {{ article.category.name }}
                  </span>
                </div>
              </div>
              <div class="card-body">
                <h3 class="card-title">{{ article.title }}</h3>
                <p v-if="article.excerpt" class="card-excerpt">{{ article.excerpt }}</p>
                <div class="card-meta">
                  <span class="card-date">{{ formatDate(article.createdAt) }}</span>
                  <span class="card-read">Lire →</span>
                </div>
              </div>
            </RouterLink>
          </div>
        </template>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { articleService } from '../services/articleService'
import { adminService } from '../services/adminService'

const route = useRoute()
const allArticles = ref([])
const categories = ref([])
const loading = ref(false)
const activeCategoryId = ref(null)

// Correspondance slug URL → slug BDD
const slugMap = {
  foot: 'football',
  basket: 'basketball',
  tennis: 'tennis',
  rugby: 'rugby',
  f1: 'formule-1',
  mma: 'mma',
}

// Couleurs par slug
const colorMap = {
  football: '#10B981',
  basketball: '#F97316',
  tennis: '#EAB308',
  rugby: '#DC2626',
  'formule-1': '#3B82F6',
  mma: '#9333EA',
}

// Icônes par slug
const iconMap = {
  football: '⚽',
  basketball: '🏀',
  tennis: '🎾',
  rugby: '🏉',
  'formule-1': '🏎️',
  mma: '🥊',
}

const categoryColor = (slug) => colorMap[slug] || '#FC602E'
const categoryIcon = (slug) => iconMap[slug] || '🏆'

const articleCountByCategory = (catId) =>
  allArticles.value.filter(a => a.categoryId === catId).length

const filteredArticles = computed(() => {
  if (!activeCategoryId.value) return allArticles.value
  return allArticles.value.filter(a => a.categoryId === activeCategoryId.value)
})

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Applique le filtre depuis l'URL au chargement et si la route change
const applyRouteFilter = () => {
  const param = route.params.sport
  if (!param || param === 'all') {
    activeCategoryId.value = null
    return
  }
  const dbSlug = slugMap[param] || param
  const match = categories.value.find(c => c.slug === dbSlug)
  activeCategoryId.value = match?.id || null
}

onMounted(async () => {
  loading.value = true
  try {
    const [arts, cats] = await Promise.all([
      articleService.getAll(),
      adminService.getCategories()
    ])
    allArticles.value = arts
    categories.value = cats
    applyRouteFilter()
  } catch (e) {
    console.error('Erreur chargement:', e)
  } finally {
    loading.value = false
  }
})

watch(() => route.params.sport, () => {
  applyRouteFilter()
})
</script>

<style scoped>
.sport-page {
  background: #101318;
  min-height: 100vh;
  padding-top: 72px;
  color: #FAFAFA;
}

.sport-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 48px;
  padding: 40px 80px 80px;
  max-width: 1440px;
  margin: 0 auto;
}

.articles-area {
  min-width: 0;
}

/* Sidebar */
.filter-block { margin-bottom: 36px; }

.filter-title {
  font-family: 'Oswald', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #6B7280;
  margin-bottom: 14px;
}

.filter-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  color: #9CA3AF;
}

.filter-item:hover { background: #191D24; color: #FAFAFA; }
.filter-item.active { background: #FC602E; color: #FAFAFA; }

.filter-icon {
  font-size: 14px;
  display: flex;
  align-items: center;
  width: 18px;
}

.filter-name { flex: 1; }

.filter-count {
  background: rgba(255,255,255,0.15);
  color: inherit;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
}

.filter-item.active .filter-count { background: rgba(255,255,255,0.25); }

/* Articles */
.loading-state {
  text-align: center;
  padding: 60px;
  color: #6B7280;
  font-size: 14px;
}

.articles-count {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 20px;
}

.empty-state {
  text-align: center;
  padding: 64px;
  color: #6B7280;
  background: #191D24;
  border: 1px solid #2B303B;
  border-radius: 12px;
  font-size: 14px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.article-card {
  background: #191D24;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
}

.card-image {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.article-card:hover .card-image img { transform: scale(1.05); }

.card-tags {
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  gap: 6px;
}

.tag {
  padding: 3px 10px;
  border-radius: 4px;
  font-family: 'Oswald', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #FAFAFA;
}

.card-body {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #FAFAFA;
  line-height: 1.3;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.card-excerpt {
  font-size: 13px;
  color: #6B7280;
  line-height: 1.5;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-top: auto;
}

.card-date { color: #6B7280; }

.card-read {
  color: #FC602E;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 13px;
}

@media (max-width: 768px) {
  .sport-page { padding-top: 64px; }
}

@media (max-width: 1024px) {
  .sport-main {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
    padding: 32px 32px;
  }
  .filter-block { margin-bottom: 0; }
  .filter-list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
  .filter-item {
    padding: 8px 14px;
    border-radius: 999px;
    background: #191D24;
    border: 1px solid #2B303B;
  }
  .filter-item:hover { background: #1F242D; }
  .filter-item.active {
    background: #FC602E;
    border-color: #FC602E;
  }
  .articles-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .sport-page {
    padding-top: 64px;
  }
  .sport-main {
    padding: 20px 16px 40px;
    gap: 18px;
  }
  .filter-title {
    margin-bottom: 10px;
    font-size: 11px;
  }
  .filter-list {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 4px;
    margin: 0 -16px;
    padding-left: 16px;
    padding-right: 16px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .filter-list::-webkit-scrollbar { display: none; }
  .filter-item {
    flex-shrink: 0;
    padding: 8px 14px;
    font-size: 13px;
  }
  .filter-name { white-space: nowrap; }
  .articles-count { margin-bottom: 12px; font-size: 13px; }
  .articles-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
    margin-bottom: 24px;
  }
  .article-card { width: 100%; max-width: 100%; }
  .card-image { height: 180px; }
  .card-body { padding: 14px; }
  .card-title { font-size: 15px; }
  .card-excerpt { font-size: 12px; -webkit-line-clamp: 2; }
  .card-meta { font-size: 11px; }
}
</style>