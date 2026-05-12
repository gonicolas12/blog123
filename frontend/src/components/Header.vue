<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo -->
      <RouterLink to="/" class="logo">
        <img src="/assets/images/logo.svg" alt="Blog123" class="logo-img" />
      </RouterLink>
      
      <!-- Navigation -->
      <nav class="nav">
        <RouterLink 
          to="/" 
          class="nav-link"
          :class="{ active: $route.name === 'home' }"
        >
          Articles
        </RouterLink>
        <RouterLink
          to="/sport/all"
          class="nav-link"
          :class="{ active: $route.path.startsWith('/sport') }"
        >
          Sport
        </RouterLink>
        <RouterLink 
          to="/about" 
          class="nav-link"
          :class="{ active: $route.name === 'about' }"
        >
          À propos
        </RouterLink>
        <RouterLink 
          to="/contact" 
          class="nav-link"
          :class="{ active: $route.name === 'contact' }"
        >
          Contact
        </RouterLink>
      </nav>

      <!-- Search Icon -->
      <button class="search-btn" @click="openSearch">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- Search Overlay -->
    <Transition name="search-fade">
      <div v-if="showSearch" class="search-overlay" @click.self="closeSearch">
        <div class="search-panel">
          <!-- Search bar -->
          <div class="search-bar-wrapper">
            <svg class="search-icon-inner" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#9CA3AF" stroke-width="2"/>
              <path d="M21 21L16.65 16.65" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Rechercher des articles, sports..."
              class="search-input"
              @keyup.esc="closeSearch"
              ref="searchInput"
            />
            <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">✕</button>
          </div>

          <!-- Quick tags -->
          <div class="search-section" v-if="!searchQuery">
            <p class="search-section-label">Recherche rapide</p>
            <div class="search-tags">
              <button 
                v-for="tag in quickTags" 
                :key="tag.slug" 
                class="search-tag"
                @click="navigateTag(tag)"
              >{{ tag.label }}</button>
            </div>
          </div>

          <!-- Résultats -->
          <div v-if="searchQuery" class="search-section">
            <p class="search-section-label">
              {{ searchResults.length }} résultat{{ searchResults.length > 1 ? 's' : '' }} pour « {{ searchQuery }} »
            </p>
            <div v-if="searchResults.length === 0" class="no-results">
              Aucun article trouvé.
            </div>
            <div v-else class="search-results">
              <RouterLink
                v-for="result in searchResults"
                :key="result.id"
                :to="`/article/${result.id}`"
                class="search-result-item"
                @click="closeSearch"
              >
                <img
                  :src="result.imageUrl || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200&q=80'"
                  :alt="result.title"
                  class="result-img"
                />
                <div class="result-content">
                  <div class="result-tags">
                    <span v-if="result.category?.name" class="result-tag" :style="{ background: getCategoryColor(result.category.slug) }">
                      {{ result.category.name }}
                    </span>
                  </div>
                  <p class="result-title">{{ result.title }}</p>
                  <p class="result-sub" v-if="result.excerpt">{{ result.excerpt }}</p>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { articleService } from '../services/articleService'

const route = useRoute()
const router = useRouter()
const showSearch = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const allArticles = ref([])

const quickTags = [
  { label: 'Football', type: 'sport', slug: 'foot' },
  { label: 'Basketball', type: 'sport', slug: 'basket' },
  { label: 'Tennis', type: 'sport', slug: 'tennis' },
  { label: 'Formule 1', type: 'sport', slug: 'f1' },
  { label: 'MMA', type: 'sport', slug: 'mma' },
]

const getCategoryColor = (slug) => {
  const colors = {
    'foot': '#10B981', 'football': '#10B981',
    'basket': '#F97316', 'basketball': '#F97316',
    'tennis': '#22C55E', 'rugby': '#DC2626',
    'f1': '#3B82F6', 'formule-1': '#3B82F6',
    'mma': '#9333EA'
  }
  return colors[slug] || '#FC602E'
}

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  const q = searchQuery.value.toLowerCase()
  return allArticles.value.filter(a =>
    a.title?.toLowerCase().includes(q) ||
    a.excerpt?.toLowerCase().includes(q) ||
    a.content?.toLowerCase().includes(q) ||
    a.category?.name?.toLowerCase().includes(q)
  ).slice(0, 6)
})

const openSearch = async () => {
  showSearch.value = true
  nextTick(() => searchInput.value?.focus())
  // Charge les articles si pas encore chargés
  if (allArticles.value.length === 0) {
    try {
      allArticles.value = await articleService.getAll()
    } catch (e) {
      console.error('Erreur chargement articles recherche:', e)
    }
  }
}

const closeSearch = () => {
  showSearch.value = false
  searchQuery.value = ''
}

const navigateTag = (tag) => {
  router.push(`/sport/${tag.slug}`)
  closeSearch()
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #101318;
  border-bottom: 1px solid #2B303B;
}

.header-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  height: 72px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  height: 72px;
  width: auto;
}

.nav {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-link {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #9CA3AF;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: #FC602E;
}

.search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  color: #9CA3AF;
  justify-self: end;
  cursor: pointer;
  transition: color 0.2s;
}

.search-btn:hover { color: #FAFAFA; }

/* Search overlay */
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(16, 19, 24, 0.97);
  z-index: 200;
  display: flex;
  justify-content: center;
  padding-top: 80px;
}

.search-panel {
  width: 100%;
  max-width: 720px;
  padding: 0 20px;
}

.search-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #191D24;
  border: 1px solid #2B303B;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 32px;
}

.search-icon-inner { flex-shrink: 0; }

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: #FAFAFA;
  font-family: 'Source Sans 3', sans-serif;
}

.search-input::placeholder { color: #6B7280; }

.clear-btn {
  background: transparent;
  border: none;
  color: #6B7280;
  cursor: pointer;
  font-size: 14px;
  padding: 0 4px;
  transition: color 0.15s;
}

.clear-btn:hover { color: #FAFAFA; }

.search-section { margin-bottom: 28px; }

.search-section-label {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.search-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.search-tag {
  padding: 8px 18px;
  background: #191D24;
  border: 1px solid #2B303B;
  border-radius: 999px;
  font-size: 14px;
  color: #D1D5DB;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Source Sans 3', sans-serif;
}

.search-tag:hover {
  background: #FC602E;
  border-color: #FC602E;
  color: #fff;
}

.no-results {
  color: #6B7280;
  font-size: 14px;
  padding: 20px 0;
  text-align: center;
}

.search-results {
  display: flex;
  flex-direction: column;
}

.search-result-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #1F242D;
  text-decoration: none;
  transition: opacity 0.2s;
}

.search-result-item:hover { opacity: 0.75; }
.search-result-item:last-child { border-bottom: none; }

.result-img {
  width: 72px;
  height: 56px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.result-content { flex: 1; }

.result-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
}

.result-tag {
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  font-family: 'Oswald', sans-serif;
}

.result-title {
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #FAFAFA;
  line-height: 1.35;
  margin-bottom: 4px;
}

.result-sub {
  font-size: 12px;
  color: #6B7280;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.search-fade-enter-active,
.search-fade-leave-active {
  transition: opacity 0.2s ease;
}

.search-fade-enter-from,
.search-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .header-container { padding: 0 20px; }
  .nav { display: none; }
}
</style>