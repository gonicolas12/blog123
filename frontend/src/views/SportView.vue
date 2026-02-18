<template>
  <div class="sport-page">
    <!-- Main -->
    <div class="sport-main">
      <!-- Sidebar filters -->
      <aside class="filters-sidebar">
        <!-- Filter by sport -->
        <div class="filter-block">
          <h3 class="filter-title">FILTRER PAR SPORT</h3>
          <ul class="filter-list">
            <li
              v-for="sport in sportFilters"
              :key="sport.slug"
              class="filter-item"
              :class="{ active: activeSport === sport.slug }"
              @click="activeSport = sport.slug"
            >
              <span class="filter-icon">{{ sport.icon }}</span>
              <span class="filter-name">{{ sport.name }}</span>
              <span class="filter-count">{{ sport.count }}</span>
            </li>
          </ul>
        </div>

        <!-- Filter by type -->
        <div class="filter-block">
          <h3 class="filter-title">FILTRER PAR TYPE</h3>
          <ul class="filter-list">
            <li
              v-for="type in typeFilters"
              :key="type.slug"
              class="filter-item"
              :class="{ active: activeType === type.slug }"
              @click="activeType = type.slug"
            >
              <span class="filter-type-icon">
                <svg v-if="type.slug === 'all'" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 6H20M4 12H20M4 18H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </span>
              <span class="filter-name">{{ type.name }}</span>
              <span class="filter-count">{{ type.count }}</span>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Articles grid -->
      <div class="articles-area">
        <p class="articles-count">Affichage de {{ filteredArticles.length }} articles</p>

        <div class="articles-grid">
          <RouterLink
            v-for="article in filteredArticles"
            :key="article.id"
            :to="`/article/${article.id}`"
            class="article-card"
          >
            <div class="card-image">
              <img :src="article.image" :alt="article.title" />
              <div class="card-tags">
                <span class="tag tag-sport" :style="{ background: article.sportColor }">{{ article.sport }}</span>
                <span class="tag tag-type">{{ article.type }}</span>
              </div>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ article.title }}</h3>
              <p class="card-excerpt">{{ article.excerpt }}</p>
            </div>
          </RouterLink>
        </div>

        <div class="load-more-wrapper">
          <button class="btn-load-more">VOIR PLUS D'ARTICLES</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

// Map route param slugs to internal filter slugs
const routeSlugMap = {
  football: 'foot',
  basketball: 'basket',
  tennis: 'tennis',
  f1: 'f1',
  formule1: 'f1',
  rugby: 'rugby',
  natation: 'natation',
  all: 'all',
  tous: 'all'
}

const resolveSlug = (param) => routeSlugMap[param?.toLowerCase()] ?? 'all'

const activeSport = ref(resolveSlug(route.params.sport))
const activeType = ref('all')

watch(() => route.params.sport, (val) => {
  activeSport.value = resolveSlug(val)
})

const sportFilters = ref([
  { slug: 'all', name: 'Tous', icon: '🏆', count: 6 },
  { slug: 'foot', name: 'Football', icon: '⚽', count: 1 },
  { slug: 'basket', name: 'Basketball', icon: '🏀', count: 1 },
  { slug: 'tennis', name: 'Tennis', icon: '🎾', count: 1 },
  { slug: 'f1', name: 'Formula 1', icon: '🏎️', count: 1 },
  { slug: 'rugby', name: 'Football', icon: '🏉', count: 1 },
  { slug: 'natation', name: 'Natation', icon: '🏊', count: 1 },
])

const typeFilters = ref([
  { slug: 'all', name: 'All', count: 6 },
  { slug: 'analyse', name: 'Analyse', count: 2 },
  { slug: 'news', name: 'News', count: 0 },
  { slug: 'interview', name: 'Interview', count: 0 },
  { slug: 'fonctionnalite', name: 'Fonctionnalité', count: 2 },
  { slug: 'apercu', name: 'Aperçu', count: 1 },
])

const allArticles = ref([
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80',
    sport: 'Football',
    sportSlug: 'foot',
    sportColor: '#10B981',
    type: 'Analyse',
    typeSlug: 'analyse',
    title: 'Finale de la Ligue des Champions : la bataille tactique tact...',
    excerpt: 'Une analyse approfondie de la façon dont deux philosophies contrastées se sont...'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',
    sport: 'Basketball',
    sportSlug: 'basket',
    sportColor: '#F97316',
    type: 'Feature',
    typeSlug: 'fonctionnalite',
    title: 'Étoiles montantes : la prochaine Génération de talents NBA',
    excerpt: 'Des tribunes universitaires aux ligues majeures, nous profitons les recrues...'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1622279457486-62bcc26ba4d3?w=600&q=80',
    sport: 'Tennis',
    sportSlug: 'tennis',
    sportColor: '#22C55E',
    type: 'Preview',
    typeSlug: 'apercu',
    title: 'Aperçu du Grand Chelem : qui peut Défier les meilleures...',
    excerpt: 'À l\'approche du tournoi majeur, nous analysons les prétendants et som...'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1541401154946-62f8d84bd284?w=600&q=80',
    sport: 'Formule 1',
    sportSlug: 'f1',
    sportColor: '#3B82F6',
    type: 'Analyse',
    typeSlug: 'analyse',
    title: 'Bilan de la saison 2025 : Des innovations techniques...',
    excerpt: 'Une plongée profonde dans la technique d\'avancées techniques qui...'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80',
    sport: 'Football',
    sportSlug: 'rugby',
    sportColor: '#DC2626',
    type: 'Rétrospective',
    typeSlug: 'fonctionnalite',
    title: 'Décisions du jour du repêchage : les équipes qui...',
    excerpt: 'En repensant aux choix qui ont transformé les franchises et les scout...'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80',
    sport: 'Natation',
    sportSlug: 'natation',
    sportColor: '#0EA5E9',
    type: 'Feature',
    typeSlug: 'fonctionnalite',
    title: 'Battre des records : la science Derrière les performances...',
    excerpt: 'Comment les techniques de formation modernes et la technologie pousse les...'
  }
])

const filteredArticles = computed(() => {
  return allArticles.value.filter(a => {
    const sportMatch = activeSport.value === 'all' || a.sportSlug === activeSport.value
    const typeMatch = activeType.value === 'all' || a.typeSlug === activeType.value
    return sportMatch && typeMatch
  })
})
</script>

<style scoped>
.sport-page {
  background: #101318;
  min-height: 100vh;
  padding-top: 72px;
  color: #FAFAFA;
}

.sport-header {
  padding: 48px 80px 40px;
  border-bottom: 1px solid #2B303B;
}

.sport-page-title {
  font-family: 'Oswald', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #FAFAFA;
  margin-bottom: 12px;
}

.sport-page-sub {
  font-size: 15px;
  color: #9CA3AF;
  max-width: 600px;
  line-height: 1.6;
}

.sport-main {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 48px;
  padding: 40px 80px 80px;
  max-width: 1440px;
  margin: 0 auto;
}

/* Sidebar */
.filter-block {
  margin-bottom: 36px;
}

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

.filter-item:hover {
  background: #191D24;
  color: #FAFAFA;
}

.filter-item.active {
  background: #FC602E;
  color: #FAFAFA;
}

.filter-icon, .filter-type-icon {
  font-size: 14px;
  display: flex;
  align-items: center;
  width: 18px;
}

.filter-name {
  flex: 1;
}

.filter-count {
  background: rgba(255,255,255,0.15);
  color: inherit;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
}

.filter-item.active .filter-count {
  background: rgba(255,255,255,0.25);
}

/* Articles area */
.articles-count {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 20px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.article-card {
  background: #191D24;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
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

.article-card:hover .card-image img {
  transform: scale(1.05);
}

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

.tag-type {
  background: rgba(255,255,255,0.2);
  color: #FAFAFA;
}

.card-body {
  padding: 16px;
}

.card-title {
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #FAFAFA;
  line-height: 1.3;
  margin-bottom: 8px;
}

.card-excerpt {
  font-size: 13px;
  color: #6B7280;
  line-height: 1.5;
}

.load-more-wrapper {
  display: flex;
  justify-content: center;
}

.btn-load-more {
  padding: 14px 32px;
  background: #FC602E;
  border: none;
  border-radius: 8px;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #FAFAFA;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-load-more:hover { background: #E5541F; }

@media (max-width: 1024px) {
  .sport-main { grid-template-columns: 1fr; padding: 32px 40px; }
  .sport-header { padding: 40px 40px 32px; }
  .filters-sidebar { display: flex; gap: 32px; }
  .filter-block { flex: 1; }
  .articles-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .sport-header { padding: 32px 20px; }
  .sport-main { padding: 24px 20px; }
  .articles-grid { grid-template-columns: 1fr; }
  .filters-sidebar { flex-direction: column; }
}
</style>
