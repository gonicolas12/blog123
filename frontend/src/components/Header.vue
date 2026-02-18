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
              placeholder="Rechercher des articles,sports..."
              class="search-input"
              @input="handleSearchInput"
              @keyup.enter="handleSearch"
              @keyup.esc="closeSearch"
              ref="searchInput"
            />
          </div>

          <!-- Quick tags -->
          <div class="search-section">
            <p class="search-section-label">Recherche rapide</p>
            <div class="search-tags">
              <button 
                v-for="tag in quickTags" 
                :key="tag" 
                class="search-tag"
                @click="searchQuery = tag; handleSearch()"
              >{{ tag }}</button>
            </div>
          </div>

          <!-- Results -->
          <div v-if="searchResults.length > 0" class="search-section">
            <p class="search-section-label">Recherche rapide</p>
            <div class="search-results">
              <RouterLink
                v-for="result in searchResults"
                :key="result.id"
                :to="`/article/${result.id}`"
                class="search-result-item"
                @click="closeSearch"
              >
                <img :src="result.image" :alt="result.title" class="result-img" />
                <div class="result-content">
                  <div class="result-tags">
                    <span class="result-tag" :style="{ background: result.categoryColor }">{{ result.category }}</span>
                    <span class="result-tag result-tag-type">{{ result.type }}</span>
                  </div>
                  <p class="result-title">{{ result.title }}</p>
                  <p class="result-sub" v-if="result.sub">{{ result.sub }}</p>
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
import { ref, nextTick, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const showSearch = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

const quickTags = ['Football', 'Basketball', 'Analyse', 'Interview', 'Tennis']

const allResults = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&q=80',
    category: 'Basketball',
    categoryColor: '#F97316',
    type: 'Analyse',
    title: 'Steve Kerr expulsé, Stephen Curry commet une faute lors de la défaite des Warriors',
    sub: 'Talent'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1541401154946-62f8d84bd284?w=200&q=80',
    category: 'F1',
    categoryColor: '#3B82F6',
    type: 'Analyse',
    title: 'Zhou Guanyu troque Ferrari contre Cadillac, débutant en F1, en tant que pilote de réserve',
    sub: null
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=200&q=80',
    category: 'MMA',
    categoryColor: '#9333EA',
    type: 'Analyse',
    title: '10 combats de MMA que nous voulons voir en 2026',
    sub: null
  }
]

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  const q = searchQuery.value.toLowerCase()
  return allResults.filter(r => 
    r.title.toLowerCase().includes(q) || 
    r.category.toLowerCase().includes(q) ||
    r.type.toLowerCase().includes(q)
  )
})

const openSearch = () => {
  showSearch.value = true
  nextTick(() => searchInput.value?.focus())
}

const closeSearch = () => {
  showSearch.value = false
  searchQuery.value = ''
}

const handleSearchInput = () => {
  // reactive via computed
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    closeSearch()
  }
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

.search-btn:hover {
  color: #FAFAFA;
}

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

.search-icon-inner {
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: #FAFAFA;
}

.search-input::placeholder {
  color: #6B7280;
}

.search-section {
  margin-bottom: 28px;
}

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
}

.search-tag:hover {
  background: #FC602E;
  border-color: #FC602E;
  color: #fff;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.search-result-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #1F242D;
  text-decoration: none;
  transition: opacity 0.2s;
}

.search-result-item:hover {
  opacity: 0.75;
}

.search-result-item:last-child {
  border-bottom: none;
}

.result-img {
  width: 72px;
  height: 56px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.result-content {
  flex: 1;
}

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
}

.result-tag-type {
  background: rgba(255,255,255,0.12);
  color: #D1D5DB;
}

.result-title {
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #FAFAFA;
  line-height: 1.35;
}

.result-sub {
  font-size: 12px;
  color: #6B7280;
  margin-top: 3px;
}

/* Transition */
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
