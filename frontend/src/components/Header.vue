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
          :class="{ active: $route.path === '/' }"
        >
          Articles
        </RouterLink>
        <div class="nav-dropdown">
          <span class="nav-link nav-link-dropdown">
            Sport
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <div class="dropdown-menu">
            <RouterLink to="/sport/foot" class="dropdown-item">Football</RouterLink>
            <RouterLink to="/sport/basket" class="dropdown-item">Basketball</RouterLink>
            <RouterLink to="/sport/tennis" class="dropdown-item">Tennis</RouterLink>
            <RouterLink to="/sport/rugby" class="dropdown-item">Rugby</RouterLink>
            <RouterLink to="/sport/f1" class="dropdown-item">Formule 1</RouterLink>
            <RouterLink to="/sport/mma" class="dropdown-item">MMA</RouterLink>
          </div>
        </div>
        <RouterLink 
          to="/about" 
          class="nav-link"
          :class="{ active: $route.path === '/about' }"
        >
          À propos
        </RouterLink>
        <RouterLink 
          to="/contact" 
          class="nav-link"
          :class="{ active: $route.path === '/contact' }"
        >
          Contact
        </RouterLink>
      </nav>

      <!-- Search Icon -->
      <button class="search-btn" @click="toggleSearch">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- Search Overlay -->
    <div v-if="showSearch" class="search-overlay" @click.self="toggleSearch">
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Rechercher un article..."
          class="search-input"
          @keyup.enter="handleSearch"
          ref="searchInput"
        />
        <button class="search-close" @click="toggleSearch">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const showSearch = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery.value)
    toggleSearch()
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

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
}

.logo-img {
  height: 72px;
  width: auto;
}

/* Navigation */
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

.nav-link-dropdown {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

/* Dropdown */
.nav-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 16px;
  min-width: 180px;
  background: #191D24;
  border: 1px solid #2B303B;
  border-radius: 12px;
  padding: 8px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.nav-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
}

.dropdown-item {
  display: block;
  padding: 10px 16px;
  font-size: 14px;
  color: #9CA3AF;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background: #2B303B;
  color: #FAFAFA;
}

/* Search Button */
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

/* Search Overlay */
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(16, 19, 24, 0.95);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 200px;
  z-index: 200;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
}

.search-input {
  flex: 1;
  padding: 16px 24px;
  background: #191D24;
  border: 2px solid #2B303B;
  border-radius: 12px;
  font-size: 18px;
  color: #FAFAFA;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #FC602E;
}

.search-input::placeholder {
  color: #6B7280;
}

.search-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: #191D24;
  border: none;
  border-radius: 12px;
  color: #9CA3AF;
  cursor: pointer;
  transition: all 0.2s;
}

.search-close:hover {
  background: #2B303B;
  color: #FAFAFA;
}

/* Responsive */
@media (max-width: 1024px) {
  .header-container {
    padding: 0 40px;
  }
  
  .nav {
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 20px;
  }
  
  .nav {
    display: none;
  }
}
</style>
