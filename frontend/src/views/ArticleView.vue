<template>
  <div class="article-page">
    <div v-if="loading" class="loading-screen">
      <div class="spinner"></div>
    </div>

    <template v-else-if="article">
      <!-- Hero -->
      <section class="article-hero">
        <img :src="article.imageUrl || heroFallback" :alt="article.title" class="hero-bg" />
        <div class="hero-overlay"></div>
        <div class="hero-inner">
          <RouterLink to="/" class="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Retour aux articles
          </RouterLink>
        </div>
      </section>

      <!-- Content -->
      <div class="article-content-wrapper">
        <!-- Tags -->
        <div class="article-tags">
          <span 
            v-if="article.category" 
            class="tag tag-category"
            :style="{ background: getCategoryColor(article.category?.slug) }"
          >{{ article.category?.name || article.category }}</span>
          <span class="tag tag-type">Analyse</span>
        </div>

        <!-- Title -->
        <h1 class="article-title">{{ article.title }}</h1>
        <p class="article-excerpt" v-if="article.excerpt">{{ article.excerpt }}</p>

        <!-- Meta -->
        <div class="article-meta-row">
          <div class="meta-left">
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6B7280" stroke-width="1.5"/>
                <path d="M3 9H21" stroke="#6B7280" stroke-width="1.5"/>
                <path d="M8 2V6M16 2V6" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <span>{{ formatDate(article.createdAt) }}</span>
            </div>
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#6B7280" stroke-width="1.5"/>
                <path d="M12 7V12L15 14" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <span>8 min read</span>
            </div>
          </div>
          <div class="share-row">
            <span class="share-label">Share:</span>
            <div class="share-icons">
              <button class="share-btn" title="Twitter/X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 4L13.5 12.5M22 4H15L2 20H9L22 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <button class="share-btn" title="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 2H15C13.67 2 12.4 2.53 11.46 3.46C10.53 4.4 10 5.67 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73 14.11 6.48 14.29 6.29C14.48 6.11 14.73 6 15 6H18V2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <button class="share-btn" title="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="2"/><path d="M7 10V17M7 7V7.01M12 17V13C12 12.47 12.21 11.96 12.59 11.59C12.96 11.21 13.47 11 14 11C14.53 11 15.04 11.21 15.41 11.59C15.79 11.96 16 12.47 16 13V17M12 10V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <button class="share-btn" title="Copier le lien">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Audio Player -->
        <div class="audio-section">
          <button class="audio-pill-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="#FAFAFA" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19.07 4.93C20.94 6.8 22 9.33 22 12C22 14.67 20.94 17.2 19.07 19.07M15.54 8.46C16.47 9.39 17 10.67 17 12C17 13.33 16.47 14.61 15.54 15.54" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Écoutez cet article
          </button>
          <span class="audio-author-info" v-if="article.author">Narré par {{ article.author?.firstName || article.author?.email }} (06:21)</span>
        </div>

        <div class="audio-player-bar">
          <button class="play-btn" @click="togglePlay">
            <svg v-if="!isPlaying" width="18" height="18" viewBox="0 0 24 24" fill="#FC602E">
              <path d="M5 3L19 12L5 21V3Z"/>
            </svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="#FC602E">
              <rect x="6" y="4" width="4" height="16" fill="#FC602E"/>
              <rect x="14" y="4" width="4" height="16" fill="#FC602E"/>
            </svg>
          </button>
          <span class="time-label">00:00</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 0%"></div>
          </div>
          <span class="time-label">06:21</span>
          <button class="volume-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19.07 4.93C20.94 6.8 22 9.33 22 12C22 14.67 20.94 17.2 19.07 19.07" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="article-body" v-html="article.content || sampleContent"></div>

        <!-- Author card -->
        <div class="author-section">
          <p class="author-label">ÉCRIT PAR</p>
          <div class="author-card">
            <img 
              :src="article.author?.avatar || 'https://media.licdn.com/dms/image/v2/D4D03AQEmvdWJ3xXyOQ/profile-displayphoto-shrink_800_800/B4DZbtdKr3HEAc-/0/1747740570484?e=1773273600&v=beta&t=zg9CuO77NKd5l13TG6Wnrt5uF4VmizARZ9mNveXdeJA'" 
              :alt="authorName"
              class="author-avatar"
            />
            <div class="author-info">
              <h4 class="author-name">{{ authorName }}</h4>
              <p class="author-role">Chef de projet</p>
              <p class="author-bio">
                {{ authorName }} est un passionné de sport et de journalisme. En tant que chef de projet chez Blog123, il supervise la création de contenu captivant et de haute qualité, en veillant à ce que chaque article offre une perspective unique et approfondie sur le monde du sport.
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom share -->
        <div class="bottom-share">
          <span>Vous avez apprécié cet article ?</span>
          <div class="share-row">
            <span class="share-label">Partager:</span>
            <div class="share-icons">
              <button class="share-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 4L13.5 12.5M22 4H15L2 20H9L22 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              <button class="share-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 2H15C13.67 2 12.4 2.53 11.46 3.46C10.53 4.4 10 5.67 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73 14.11 6.48 14.29 6.29C14.48 6.11 14.73 6 15 6H18V2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              <button class="share-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="2"/><path d="M7 10V17M7 7V7.01M12 17V13C12 12.47 12.21 11.96 12.59 11.59C12.96 11.21 13.47 11 14 11C14.53 11 15.04 11.21 15.41 11.59C15.79 11.96 16 12.47 16 13V17M12 10V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              <button class="share-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            </div>
          </div>
        </div>
      </div>

      <!-- More Articles -->
      <section class="more-articles-section">
        <div class="more-articles-inner">
          <h2 class="more-title">More Articles</h2>
          <div class="more-grid">
            <RouterLink 
              v-for="related in relatedArticles" 
              :key="related.id" 
              :to="`/article/${related.id}`"
              class="more-card"
            >
              <div class="more-card-img">
                <img :src="related.image" :alt="related.title" />
                <div class="more-card-tags">
                  <span class="tag tag-category" :style="{ background: related.catColor }">{{ related.category }}</span>
                  <span class="tag tag-type">{{ related.type }}</span>
                </div>
              </div>
              <div class="more-card-body">
                <h3>{{ related.title }}</h3>
                <p>{{ related.excerpt }}</p>
              </div>
            </RouterLink>
          </div>
        </div>
      </section>
    </template>

    <div v-else class="error-screen">
      <p>Article non trouvé.</p>
      <RouterLink to="/" class="back-link">← Retour à l'accueil</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useArticleStore } from '../stores/articleStore'

const route = useRoute()
const articleStore = useArticleStore()

const article = ref(null)
const loading = ref(true)
const isPlaying = ref(false)

const heroFallback = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80'

const sampleContent = `
<p>L'atmosphère dans le stade était électrique, une cacophonie de 80 000 voix créant un décor inoubliable pour ce qui allait devenir l'une des finales les plus fascinantes de l'histoire de la Ligue des champions.</p>
<h3>Le Contexte</h3>
<p>Dès le coup de sifflet, il était clair que les deux entraîneurs avaient bien préparé leur équipe. Le pressing haut de l'attaque se heurtait à la patience défensive, créant un match tactique qui se déroulerait sur 90 minutes.</p>
<h3>Moments Tactiques Clés</h3>
<p>Le combat au milieu de terrain fut décisif. Les deux équipes déployaient des zones compactes, forçant le jeu sur les côtés et créant un match de demi-espaces et de courses qui mettaient à l'épreuve la position de chaque joueur.</p>
<blockquote>"Nous savions qu'ils essaieraient de nous étouffer au milieu. La clé était la patience et la confiance." — Entraîneur Principal</blockquote>
<h3>Le Changement Décisif</h3>
<p>Le remplacement à la 67e minute changea tout. L'entrée de nouveaux joueurs au milieu offensif créa de nouvelles lignes de passe et rompit enfin l'impasse qui avait frustré les deux équipes.</p>
<h3>Analyse Statistique</h3>
<p>Les chiffres racontent une histoire fascinante :</p>
<p><strong>Possession :</strong> 57% vs 48%<br/><strong>Buts attendus :</strong> 1.8 vs 2.1<br/><strong>Pressing :</strong> 127 vs 96 high recoveries<br/><strong>Passes dans le dernier tiers :</strong> 89 vs 76</p>
`

const authorName = computed(() => {
  if (!article.value?.author) return 'Shemsedine MALAGOUEN'
  const a = article.value.author
  if (a.firstName && a.lastName) return `${a.firstName} ${a.lastName}`
  return a.firstName || a.email?.split('@')[0] || 'Auteur'
})

const relatedArticles = ref([
  {
    id: 'r1',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',
    category: 'Basketball',
    catColor: '#F97316',
    type: 'Feature',
    title: 'Étoiles montantes : la prochaine Génération de talents NBA',
    excerpt: 'Des tribunes universitaires aux ligues majeures, nous profitons les recrues...'
  },
  {
    id: 'r2',
    image: 'https://images.unsplash.com/photo-1622279457486-62bcc26ba4d3?w=600&q=80',
    category: 'Tennis',
    catColor: '#22C55E',
    type: 'Preview',
    title: 'Aperçu du Grand Chelem : qui peut Défier les meilleures...',
    excerpt: 'À l\'approche du tournoi majeur, nous analysons les prétendants et som...'
  },
  {
    id: 'r3',
    image: 'https://images.unsplash.com/photo-1541401154946-62f8d84bd284?w=600&q=80',
    category: 'Formule 1',
    catColor: '#3B82F6',
    type: 'Analyse',
    title: 'Bilan de la saison 2025 : Des innovations techniques...',
    excerpt: 'Une plongée profonde dans la technique d\''
  }
])

const getCategoryColor = (slug) => {
  const colors = {
    'foot': '#10B981',
    'football': '#10B981',
    'basket': '#F97316',
    'basketball': '#F97316',
    'tennis': '#22C55E',
    'rugby': '#DC2626',
    'f1': '#3B82F6',
    'mma': '#9333EA'
  }
  return colors[slug] || '#FC602E'
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

const formatDate = (date) => {
  if (!date) return 'January 15, 2024'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  try {
    await articleStore.fetchArticle(route.params.id)
    article.value = articleStore.currentArticle
    // Si l'API répond null/undefined, on met le mock
    if (!article.value) throw new Error('empty')
  } catch (e) {
    article.value = {
      id: route.params.id,
      title: 'Finale de la Ligue des Champions : La bataille tactique qui a défini une génération',
      excerpt: 'Une analyse approfondie de la façon dont deux philosophies contrastées se sont affrontées dans ce que beaucoup appellent la plus grande finale de l\'histoire du tournoi.',
      imageUrl: heroFallback,
      content: sampleContent,
      createdAt: '2024-01-15',
      category: { name: 'Football', slug: 'foot' },
      author: { firstName: 'Shemsedine', lastName: 'MALAGOUEN', email: 'blog123toulouse@gmail.com' }
    }
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.article-page {
  background: #101318;
  min-height: 100vh;
  padding-top: 72px;
}

/* Hero */
.article-hero {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.hero-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(16,19,24,0.3) 0%, rgba(16,19,24,0.7) 100%);
}

.hero-inner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-start;
  padding: 32px 80px;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #D1D5DB;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.back-link:hover { color: #FAFAFA; }

/* Content */
.article-content-wrapper {
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 40px 0;
}

.article-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  padding: 4px 12px;
  border-radius: 4px;
  font-family: 'Oswald', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #FAFAFA;
}

.tag-type {
  background: #2B303B;
  color: #D1D5DB;
}

.article-title {
  font-family: 'Oswald', sans-serif;
  font-size: 44px;
  font-weight: 700;
  line-height: 1.1;
  color: #FAFAFA;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.article-excerpt {
  font-size: 17px;
  line-height: 1.6;
  color: #9CA3AF;
  margin-bottom: 24px;
}

/* Meta */
.article-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 1px solid #2B303B;
  border-bottom: 1px solid #2B303B;
  margin-bottom: 32px;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #9CA3AF;
}

.share-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.share-label {
  font-size: 13px;
  color: #6B7280;
}

.share-icons {
  display: flex;
  gap: 8px;
}

.share-btn {
  width: 34px;
  height: 34px;
  background: #1F242D;
  border: 1px solid #2B303B;
  border-radius: 50%;
  color: #9CA3AF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.share-btn:hover {
  background: #2B303B;
  color: #FAFAFA;
}

/* Audio */
.audio-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.audio-pill-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: #FC602E;
  border: none;
  border-radius: 8px;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #FAFAFA;
  cursor: pointer;
  transition: background 0.2s;
}

.audio-pill-btn:hover { background: #E5541F; }

.audio-author-info {
  font-size: 13px;
  color: #6B7280;
}

.audio-player-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: #191D24;
  border-radius: 10px;
  margin-bottom: 40px;
}

.play-btn {
  width: 40px;
  height: 40px;
  background: rgba(252, 96, 46, 0.15);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.time-label {
  font-size: 13px;
  color: #9CA3AF;
  min-width: 36px;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: #2B303B;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #FC602E;
  border-radius: 999px;
}

.volume-btn {
  background: transparent;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  display: flex;
  align-items: center;
}

/* Article body */
.article-body {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 16px;
  line-height: 1.8;
  color: #D1D5DB;
  margin-bottom: 48px;
}

.article-body :deep(p) {
  margin-bottom: 1.4rem;
}

.article-body :deep(h3) {
  font-family: 'Oswald', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #FAFAFA;
  margin: 2rem 0 1rem;
}

.article-body :deep(blockquote) {
  border-left: 3px solid #FC602E;
  padding: 12px 20px;
  margin: 20px 0;
  background: #191D24;
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: #9CA3AF;
}

.article-body :deep(strong) {
  color: #FAFAFA;
  font-weight: 600;
}

/* Author */
.author-section {
  padding-top: 40px;
  border-top: 1px solid #2B303B;
  margin-bottom: 40px;
}

.author-label {
  font-family: 'Oswald', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #6B7280;
  margin-bottom: 16px;
}

.author-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: #191D24;
  border-radius: 12px;
}

.author-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.author-name {
  font-family: 'Oswald', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #FAFAFA;
  margin-bottom: 4px;
}

.author-role {
  font-size: 13px;
  color: #FC602E;
  margin-bottom: 8px;
}

.author-bio {
  font-size: 14px;
  line-height: 1.6;
  color: #9CA3AF;
}

/* Bottom share */
.bottom-share {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0 60px;
  border-top: 1px solid #2B303B;
  font-size: 15px;
  color: #9CA3AF;
}

/* More articles */
.more-articles-section {
  background: #0D0F13;
  padding: 60px 40px 80px;
}

.more-articles-inner {
  max-width: 860px;
  margin: 0 auto;
}

.more-title {
  font-family: 'Oswald', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #FAFAFA;
  margin-bottom: 32px;
}

.more-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.more-card {
  background: #191D24;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s;
}

.more-card:hover {
  transform: translateY(-4px);
}

.more-card-img {
  position: relative;
  height: 160px;
  overflow: hidden;
}

.more-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.more-card-tags {
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  gap: 6px;
}

.more-card-body {
  padding: 16px;
}

.more-card-body h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #FAFAFA;
  line-height: 1.3;
  margin-bottom: 8px;
}

.more-card-body p {
  font-size: 13px;
  color: #6B7280;
  line-height: 1.5;
}

/* States */
.loading-screen, .error-screen {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #9CA3AF;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #2B303B;
  border-top-color: #FC602E;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 768px) {
  .hero-inner { padding: 20px; }
  .article-content-wrapper { padding: 32px 20px 0; }
  .article-title { font-size: 30px; }
  .article-meta-row { flex-direction: column; gap: 16px; align-items: flex-start; }
  .more-grid { grid-template-columns: 1fr; }
  .more-articles-section { padding: 40px 20px; }
}
</style>
