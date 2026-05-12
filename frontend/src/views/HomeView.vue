<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <img 
          :src="heroArticle?.imageUrl || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80'" 
          alt="Hero background"
          class="hero-image"
        />
        <div class="hero-overlay"></div>
      </div>
      
      <div class="hero-content" v-if="heroArticle">
        <div class="hero-badges">
          <span class="badge badge-featured">À LA UNE</span>
          <span v-if="heroArticle.category?.name" class="badge badge-sport">{{ heroArticle.category.name.toUpperCase() }}</span>
        </div>
        
        <h1 class="hero-title">{{ heroArticle.title }}</h1>
        
        <p class="hero-description" v-if="heroArticle.excerpt">{{ heroArticle.excerpt }}</p>
        
        <div class="hero-meta">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.67" stroke="#8F96A3" stroke-width="1.33"/>
            <path d="M8 4V8L10.67 9.33" stroke="#8F96A3" stroke-width="1.33" stroke-linecap="round"/>
          </svg>
          <span>{{ formatDate(heroArticle.createdAt) }}</span>
        </div>
        
        <div class="hero-actions">
          <RouterLink :to="`/article/${heroArticle.id}`" class="btn btn-primary">LIRE L'ARTICLE</RouterLink>
        </div>
      </div>

      <!-- Fallback si pas d'articles -->
      <div class="hero-content" v-else>
        <div class="hero-badges">
          <span class="badge badge-featured">À LA UNE</span>
        </div>
        <h1 class="hero-title">Bienvenue sur Blog123</h1>
        <p class="hero-description">Votre source d'actualités sportives.</p>
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="latest-news-section">
      <h2 class="section-title">DERNIÈRES ACTUALITÉS</h2>
      
      <div v-if="loading" class="loading-state">Chargement des articles...</div>
      
      <div v-else class="articles-grid">
        <!-- Featured Article (Large) -->
        <article class="featured-article">
          <RouterLink :to="featuredArticle ? `/article/${featuredArticle.id}` : '/'" class="article-card">
            <img 
              :src="featuredArticle?.imageUrl || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80'" 
              :alt="featuredArticle?.title || ''"
              class="article-image"
            />
            <div class="article-overlay">
              <div class="article-tags">
                <span class="tag tag-category tag-foot">{{ featuredArticle?.category?.name || 'SPORT' }}</span>
                <span class="tag tag-type">À la une</span>
              </div>
              <h3 class="article-title">{{ featuredArticle?.title || '' }}</h3>
              <p class="article-excerpt">{{ featuredArticle?.excerpt || '' }}</p>
            </div>
          </RouterLink>
        </article>

        <!-- Sidebar Articles -->
        <div class="sidebar-articles">
          <RouterLink
            v-for="article in sidebarArticles"
            :key="article.id"
            :to="`/article/${article.id}`"
            class="sidebar-article"
          >
            <div class="sidebar-article-image">
              <img :src="article.imageUrl || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80'" :alt="article.title" />
            </div>
            <div class="sidebar-article-content">
              <span v-if="article.category?.name" class="article-category">{{ article.category.name }}</span>
              <h4>{{ article.title }}</h4>
              <p class="article-time">{{ formatDate(article.createdAt) }}</p>
            </div>
          </RouterLink>

          <div v-if="sidebarArticles.length === 0" class="empty-sidebar">
            Aucun article récent.
          </div>
        </div>
      </div>
    </section>

    <!-- Analysis Section -->
    <section class="analysis-section">
      <h2 class="section-title">ANALYSES & REPORTAGES</h2>
      
      <div class="analysis-content-wrapper">
        <div class="analysis-main">
          <div v-if="analysisArticles.length === 0 && !loading" class="empty-analysis">
            Aucun article pour le moment.
          </div>
          <div v-else class="analysis-grid">
            <RouterLink
              v-for="item in analysisArticles"
              :key="item.id"
              :to="`/article/${item.id}`"
              class="analysis-card"
            >
              <div class="analysis-image">
                <img :src="item.imageUrl || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80'" :alt="item.title" />
                <span v-if="item.category?.name" class="analysis-badge">{{ item.category.name }}</span>
              </div>
              <div class="analysis-card-content">
                <h3>{{ item.title }}</h3>
                <p>{{ item.excerpt }}</p>
                <div class="analysis-meta">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.67" stroke="#6B7280" stroke-width="1.33"/>
                    <path d="M8 4V8L10.67 9.33" stroke="#6B7280" stroke-width="1.33" stroke-linecap="round"/>
                  </svg>
                  <span>{{ formatDate(item.createdAt) }}</span>
                  <span v-if="authorName(item)" class="separator">•</span>
                  <span v-if="authorName(item)">{{ authorName(item) }}</span>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>

        <div class="analysis-sidebar">
          <div class="tendances-card">
            <div class="tendances-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#FC602E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>TENDANCES</span>
            </div>
            <ul class="tendances-list">
              <li v-for="(trend, index) in trends" :key="index">
                <span class="trend-number">{{ index + 1 }}</span>
                <div class="trend-content">
                  <RouterLink :to="`/article/${trend.id}`" class="trend-link">{{ trend.title }}</RouterLink>
                </div>
              </li>
            </ul>
          </div>

          <div class="newsletter-card">
            <div class="newsletter-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h4>Newsletter Blog123</h4>
            <p>Recevez les dernières actualités sportives chaque matin</p>
            <input type="email" placeholder="Votre email" class="newsletter-input" />
            <button class="btn-subscribe">S'INSCRIRE</button>
          </div>
        </div>
      </div>

      <div class="view-more-container">
        <RouterLink to="/sport/all" class="btn-view-more">VOIR PLUS D'ARTICLES</RouterLink>
      </div>
    </section>

    <!-- Explore by Sport Section -->
    <section class="explore-section">
      <h2 class="section-title">EXPLORER PAR SPORT</h2>
      
      <div class="sports-grid">
        <RouterLink 
          v-for="sport in sports" 
          :key="sport.name"
          :to="`/sport/${sport.slug}`"
          class="sport-card"
          :style="{ background: sport.color }"
        >
          <div class="sport-icon">{{ sport.icon }}</div>
          <span class="sport-name">{{ sport.name }}</span>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { articleService } from '../services/articleService'

const allArticles = ref([])
const loading = ref(false)

// Article hero — aléatoire parmi tous les articles
const heroArticle = computed(() => {
  if (allArticles.value.length === 0) return null
  const idx = Math.floor(Math.random() * Math.min(allArticles.value.length, 5))
  return allArticles.value[idx]
})

// Featured = premier article
const featuredArticle = computed(() => allArticles.value[0] || null)

// Sidebar = articles 2 à 4
const sidebarArticles = computed(() => allArticles.value.slice(1, 4))

// Analyses = articles 5 à 9
const analysisArticles = computed(() => allArticles.value.slice(4, 8))

const authorName = (article) => {
  if (!article.author) return ''
  const { firstName, lastName, email } = article.author
  if (firstName || lastName) return `${firstName || ''} ${lastName || ''}`.trim()
  return email || ''
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  loading.value = true
  try {
    allArticles.value = await articleService.getAll()
  } catch (e) {
    console.error('Erreur lors du chargement des articles', e)
  } finally {
    loading.value = false
  }
})

const trends = computed(() =>
  allArticles.value.slice(0, 5).map(a => ({
    title: a.title,
    id: a.id
  }))
)

const sports = ref([
  { name: 'FOOTBALL', slug: 'foot', color: '#10B981', icon: '⚽' },
  { name: 'BASKETBALL', slug: 'basket', color: '#F97316', icon: '🏀' },
  { name: 'TENNIS', slug: 'tennis', color: '#EAB308', icon: '🎾' },
  { name: 'RUGBY', slug: 'rugby', color: '#DC2626', icon: '🏉' },
  { name: 'FORMULE 1', slug: 'f1', color: '#3B82F6', icon: '🏎️' },
  { name: 'MMA', slug: 'mma', color: '#9333EA', icon: '🥊' }
])
</script>

<style scoped>
.home-page {
  background: #101318;
  color: #FAFAFA;
}

.hero-section {
  position: relative;
  height: 630px;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(16, 19, 24, 0.95) 0%, rgba(16, 19, 24, 0.7) 50%, transparent 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  padding: 180px 0 0 80px;
}

.hero-badges {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.badge {
  padding: 6px 16px;
  border-radius: 4px;
  font-family: 'Oswald', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.badge-featured {
  background: #EC1313;
  color: #FAFAFA;
}

.badge-sport {
  background: rgba(255, 255, 255, 0.9);
  color: #101318;
}

.hero-title {
  font-family: 'Oswald', sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.hero-description {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: #E5E7EB;
  margin-bottom: 20px;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  color: #8F96A3;
  font-size: 14px;
}

.separator { color: #8F96A3; }

.hero-actions { display: flex; gap: 12px; }

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  border: none;
  transition: all 0.3s;
}

.btn-primary { padding: 14px 28px; background: #FC602E; color: #FAFAFA; }
.btn-primary:hover { background: #E5541F; }

.loading-state { text-align: center; padding: 60px; color: #6B7280; font-size: 14px; }

.latest-news-section { padding: 60px 80px; }

.section-title {
  font-family: 'Oswald', sans-serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 32px;
}

.articles-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
}

.featured-article { width: 100%; }

.article-card {
  position: relative;
  height: 450px;
  border-radius: 16px;
  overflow: hidden;
  display: block;
  text-decoration: none;
  color: inherit;
}

.article-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.article-card:hover .article-image { transform: scale(1.03); }

.article-overlay {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 32px;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.85) 100%);
}

.article-tags { display: flex; gap: 8px; margin-bottom: 16px; }

.tag {
  padding: 4px 12px;
  border-radius: 4px;
  font-family: 'Oswald', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.tag-category { color: #FAFAFA; }
.tag-foot { background: #10B981; }
.tag-type { background: rgba(255, 255, 255, 0.2); color: #FAFAFA; }

.article-title {
  font-family: 'Oswald', sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 12px;
}

.article-excerpt { font-size: 14px; line-height: 1.5; color: #D1D5DB; }

.sidebar-articles { display: flex; flex-direction: column; gap: 16px; }

.sidebar-article {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #191D24;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;
}

.sidebar-article:hover { background: #1F242D; }

.sidebar-article-image { width: 100px; height: 80px; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
.sidebar-article-image img { width: 100%; height: 100%; object-fit: cover; }

.sidebar-article-content { display: flex; flex-direction: column; gap: 6px; }

.article-category {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  width: fit-content;
  background: #FC602E;
  color: #FAFAFA;
}

.sidebar-article-content h4 {
  font-family: 'Oswald', sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  color: #FAFAFA;
}

.article-time { font-size: 12px; color: #6B7280; }
.empty-sidebar { color: #6B7280; font-size: 14px; padding: 20px; text-align: center; }

.analysis-section { padding: 60px 80px; background: #0D0F13; }

.analysis-content-wrapper {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  margin-bottom: 40px;
}

.analysis-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }

.empty-analysis {
  color: #6B7280; font-size: 14px; padding: 40px;
  text-align: center; background: #191D24; border-radius: 12px;
}

.analysis-card {
  background: #191D24; border-radius: 12px; overflow: hidden;
  cursor: pointer; transition: all 0.3s; text-decoration: none; color: inherit; display: block;
}

.analysis-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4); }

.analysis-image { position: relative; height: 160px; overflow: hidden; }
.analysis-image img { width: 100%; height: 100%; object-fit: cover; }

.analysis-badge {
  position: absolute; top: 12px; left: 12px;
  padding: 4px 12px; border-radius: 4px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.5px;
  color: #FAFAFA; background: #FC602E;
}

.analysis-card-content { padding: 20px; }

.analysis-card-content h3 {
  font-family: 'Oswald', sans-serif; font-size: 17px; font-weight: 700;
  line-height: 1.3; margin-bottom: 10px; color: #FAFAFA;
}

.analysis-card-content p { font-size: 13px; line-height: 1.5; color: #9CA3AF; margin-bottom: 12px; }

.analysis-meta { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #6B7280; }

.analysis-sidebar { display: flex; flex-direction: column; gap: 24px; }

.tendances-card { background: #191D24; border-radius: 12px; padding: 24px; }

.tendances-header {
  display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
  font-family: 'Oswald', sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 0.5px;
}

.tendances-list { list-style: none; padding: 0; margin: 0; }

.tendances-list li {
  display: flex; align-items: flex-start; gap: 16px;
  padding: 12px 0; border-bottom: 1px solid #2B303B;
}

.tendances-list li:last-child { border-bottom: none; }

.trend-number {
  font-family: 'Oswald', sans-serif; font-size: 20px;
  font-weight: 700; color: #4B5563; min-width: 24px;
}

.trend-content h5 {
  font-family: 'Oswald', sans-serif; font-size: 14px;
  font-weight: 600; color: #FAFAFA; margin-bottom: 4px;
}

.trend-link {
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #FAFAFA;
  text-decoration: none;
  line-height: 1.3;
  display: block;
}

.trend-link:hover { color: #FC602E; }

.trend-discussions { font-size: 12px; color: #6B7280; }

.newsletter-card {
  background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
  border-radius: 12px; padding: 28px; text-align: center;
}

.newsletter-icon { margin-bottom: 16px; }

.newsletter-card h4 {
  font-family: 'Oswald', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 8px;
}

.newsletter-card p { font-size: 13px; color: rgba(255, 255, 255, 0.85); margin-bottom: 20px; }

.newsletter-input {
  width: 100%; padding: 12px 16px;
  background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px; color: #FAFAFA; font-size: 14px; margin-bottom: 12px;
}

.newsletter-input::placeholder { color: rgba(255, 255, 255, 0.6); }

.btn-subscribe {
  width: 100%; padding: 12px; background: #FC602E; border: none;
  border-radius: 8px; font-family: 'Oswald', sans-serif;
  font-size: 14px; font-weight: 700; letter-spacing: 0.5px;
  color: #FAFAFA; cursor: pointer; transition: all 0.3s;
}

.btn-subscribe:hover { background: #E5541F; }

.view-more-container { display: flex; justify-content: center; margin-top: 20px; }

.btn-view-more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px; background: #FC602E; border: none; border-radius: 8px;
  font-family: 'Oswald', sans-serif; font-size: 14px; font-weight: 700;
  letter-spacing: 0.5px; color: #FAFAFA; cursor: pointer; transition: all 0.3s;
  text-decoration: none;
}

.btn-view-more:hover { background: #E5541F; }

.explore-section { padding: 60px 80px 80px; }

.sports-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 20px; }

.sport-card {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 32px 20px; border-radius: 12px;
  text-decoration: none; transition: all 0.3s; cursor: pointer;
}

.sport-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4); }

.sport-icon { font-size: 48px; margin-bottom: 12px; }

.sport-name {
  font-family: 'Oswald', sans-serif; font-size: 14px;
  font-weight: 600; letter-spacing: 0.5px; color: #FAFAFA;
}

@media (max-width: 1280px) {
  .articles-grid { grid-template-columns: 1fr 350px; }
  .analysis-content-wrapper { grid-template-columns: 1fr 300px; }
  .sports-grid { grid-template-columns: repeat(3, 1fr); }
  .latest-news-section, .analysis-section, .explore-section { padding-left: 40px; padding-right: 40px; }
}

@media (max-width: 1024px) {
  .articles-grid { grid-template-columns: 1fr; }
  .analysis-content-wrapper { grid-template-columns: 1fr; }
  .analysis-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .hero-section { height: 500px; }
  .hero-content { padding: 120px 20px 0; max-width: 100%; }
  .hero-title { font-size: 32px; }
  .hero-actions { flex-direction: column; }
  .btn { width: 100%; }
  .latest-news-section, .analysis-section, .explore-section { padding: 40px 20px; }
  .sports-grid { grid-template-columns: repeat(2, 1fr); }
  .analysis-grid { grid-template-columns: 1fr; }
}
</style>