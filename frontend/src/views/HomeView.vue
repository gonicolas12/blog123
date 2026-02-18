<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <img 
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80" 
          alt="Hero background"
          class="hero-image"
        />
        <div class="hero-overlay"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-badges">
          <span class="badge badge-featured">À LA UNE</span>
          <span class="badge badge-sport">FOOTBALL</span>
        </div>
        
        <h1 class="hero-title">
          Le PSG écrase l'OM dans un Classique historique : 4-0
        </h1>
        
        <p class="hero-description">
          Une performance exceptionnelle des Parisiens qui envoient un message fort à leurs rivaux marseillais dans un Vélodrome bouillant.
        </p>
        
        <div class="hero-meta">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.67" stroke="#8F96A3" stroke-width="1.33"/>
            <path d="M8 4V8L10.67 9.33" stroke="#8F96A3" stroke-width="1.33" stroke-linecap="round"/>
          </svg>
          <span>Il y a 2 heures</span>
          <span class="separator">•</span>
          <span>Par Jean Dupont</span>
        </div>
        
        <div class="hero-actions">
          <RouterLink to="/article/hero-1" class="btn btn-primary">LIRE L'ARTICLE</RouterLink>
          <button class="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2L13.33 8L4 14V2Z" stroke="#FAFAFA" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            VOIR LES TEMPS FORTS
          </button>
        </div>
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="latest-news-section">
      <h2 class="section-title">DERNIÈRES ACTUALITÉS</h2>
      
      <div class="articles-grid">
        <!-- Featured Article (Large) -->
        <article class="featured-article">
          <RouterLink to="/article/featured-1" class="article-card">
            <img 
              src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80" 
              alt="Finale Champions League"
              class="article-image"
            />
            <div class="article-overlay">
              <div class="article-tags">
                <span class="tag tag-category tag-foot">FOOT</span>
                <span class="tag tag-type">Analyses</span>
              </div>
              <h3 class="article-title">Finale de la Ligue des Champions : la bataille tactique qui a défini une génération</h3>
              <p class="article-excerpt">
                Une analyse approfondie de la façon dont deux philosophies de jeu contrastées se sont affrontées lors de la plus grande finale de l'histoire du tournoi.
              </p>
            </div>
          </RouterLink>
        </article>

        <!-- Sidebar Articles -->
        <div class="sidebar-articles">
          <RouterLink :to="`/article/${article.id}`" class="sidebar-article" v-for="(article, index) in sidebarArticles" :key="index">
            <div class="sidebar-article-image">
              <img :src="article.image" :alt="article.title" />
            </div>
            <div class="sidebar-article-content">
              <span class="article-category" :class="article.categoryClass">{{ article.category }}</span>
              <h4>{{ article.title }}</h4>
              <p class="article-time">Il y a {{ article.time }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Analysis Section -->
    <section class="analysis-section">
      <h2 class="section-title">ANALYSES & REPORTAGES</h2>
      
      <div class="analysis-content-wrapper">
        <!-- Articles Grid -->
        <div class="analysis-main">
          <div class="analysis-grid">
            <RouterLink :to="`/article/${item.id}`" class="analysis-card" v-for="(item, index) in analysisArticles" :key="index">
              <div class="analysis-image">
                <img :src="item.image" :alt="item.title" />
                <span class="analysis-badge" :class="item.badgeClass">{{ item.category }}</span>
              </div>
              <div class="analysis-card-content">
                <h3>{{ item.title }}</h3>
                <p>{{ item.excerpt }}</p>
                <div class="analysis-meta">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.67" stroke="#6B7280" stroke-width="1.33"/>
                    <path d="M8 4V8L10.67 9.33" stroke="#6B7280" stroke-width="1.33" stroke-linecap="round"/>
                  </svg>
                  <span>Il y a {{ item.hours }}h</span>
                  <span class="separator">•</span>
                  <span>{{ item.author }}</span>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="analysis-sidebar">
          <!-- Tendances -->
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
                  <h5>{{ trend.title }}</h5>
                  <span class="trend-discussions">{{ trend.discussions }} discussions</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- Newsletter -->
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
        <button class="btn-view-more">VOIR PLUS D'ARTICLES</button>
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
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const sidebarArticles = ref([
  {
    id: 'sidebar-1',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80',
    category: 'Basketball',
    categoryClass: 'cat-basketball',
    title: 'Steve Kerr expulsé, Stephen Curry commet une faute lors de la défaite des Warriors',
    time: '2h'
  },
  {
    id: 'sidebar-2',
    image: 'https://images.unsplash.com/photo-1541401154946-62f8d84bd284?w=400&q=80',
    category: 'F1',
    categoryClass: 'cat-f1',
    title: 'Zhou Guanyu troque Ferrari contre Cadillac, débutant en F1, en tant que pilote de réserve',
    time: '3h'
  },
  {
    id: 'sidebar-3',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&q=80',
    category: 'MMA',
    categoryClass: 'cat-mma',
    title: '10 combats de MMA que nous voulons voir en 2026',
    time: '4h'
  }
])

const analysisArticles = ref([
  {
    id: 'analysis-1',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',
    category: 'BASKETBALL',
    badgeClass: 'badge-basketball',
    title: 'NBA: LeBron James dépasse un nouveau record historique',
    excerpt: 'Le King continue d\'écrire l\'histoire de la NBA avec cette nouvelle performance légendaire.',
    hours: 4,
    author: 'Paul Bernard'
  },
  {
    id: 'analysis-2',
    image: 'https://images.unsplash.com/photo-1622279457486-62bcc26ba4d3?w=600&q=80',
    category: 'TENNIS',
    badgeClass: 'badge-tennis',
    title: 'Open d\'Australie: Djokovic affrontera Sinner en finale',
    excerpt: 'Une finale de rêve entre le champion serbe et la révélation italienne.',
    hours: 5,
    author: 'Sophie Durand'
  },
  {
    id: 'analysis-3',
    image: 'https://images.unsplash.com/photo-1541401154946-62f8d84bd284?w=600&q=80',
    category: 'FORMULE 1',
    badgeClass: 'badge-f1',
    title: 'Verstappen : \'Cette saison sera la plus compétitive\'',
    excerpt: 'Le triple champion du monde s\'attend à une lutte acharnée pour le titre.',
    hours: 6,
    author: 'Lucas Petit'
  },
  {
    id: 'analysis-4',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80',
    category: 'RUGBY',
    badgeClass: 'badge-rugby',
    title: 'Six Nations: La France favorite pour le Grand Chelem',
    excerpt: 'Les Bleus arrivent en favoris de la compétition après une préparation exemplaire.',
    hours: 7,
    author: 'Antoine Moreau'
  }
])

const trends = ref([
  { title: 'Mbappé buteur face à l\'OM', discussions: '12.1K' },
  { title: 'Real Madrid en forme', discussions: '8.2K' },
  { title: 'Coupe de France tirage', discussions: '6.1K' },
  { title: 'Transferts mercato', discussions: '5.8K' },
  { title: 'NBA All-Star votes', discussions: '4.3K' }
])

const sports = ref([
  { 
    name: 'FOOTBALL', 
    slug: 'foot', 
    color: '#10B981',
    icon: '⚽'
  },
  { 
    name: 'BASKETBALL', 
    slug: 'basket', 
    color: '#F97316',
    icon: '🏀'
  },
  { 
    name: 'TENNIS', 
    slug: 'tennis', 
    color: '#EAB308',
    icon: '🎾'
  },
  { 
    name: 'RUGBY', 
    slug: 'rugby', 
    color: '#DC2626',
    icon: '🏉'
  },
  { 
    name: 'FORMULE 1', 
    slug: 'f1', 
    color: '#3B82F6',
    icon: '🏎️'
  },
  { 
    name: 'MMA', 
    slug: 'mma', 
    color: '#9333EA',
    icon: '🥊'
  }
])
</script>

<style scoped>
.home-page {
  background: #101318;
  color: #FAFAFA;
}

/* Hero Section */
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

.separator {
  color: #8F96A3;
}

.hero-actions {
  display: flex;
  gap: 12px;
}

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

.btn-primary {
  padding: 14px 28px;
  background: #FC602E;
  color: #FAFAFA;
}

.btn-primary:hover {
  background: #E5541F;
}

.btn-secondary {
  padding: 14px 24px;
  background: rgba(39, 44, 53, 0.8);
  border: 1px solid #3B4048;
  color: #FAFAFA;
}

.btn-secondary:hover {
  background: rgba(59, 64, 72, 0.9);
}

/* Latest News Section */
.latest-news-section {
  padding: 60px 80px;
}

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

.featured-article {
  width: 100%;
}

.article-card {
  position: relative;
  height: 450px;
  border-radius: 16px;
  overflow: hidden;
  display: block;
  text-decoration: none;
  color: inherit;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.article-card:hover .article-image {
  transform: scale(1.03);
}

.article-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.85) 100%);
}

.article-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  padding: 4px 12px;
  border-radius: 4px;
  font-family: 'Oswald', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.tag-category {
  color: #FAFAFA;
}

.tag-foot {
  background: #10B981;
}

.tag-type {
  background: rgba(255, 255, 255, 0.2);
  color: #FAFAFA;
}

.article-title {
  font-family: 'Oswald', sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 12px;
}

.article-excerpt {
  font-size: 14px;
  line-height: 1.5;
  color: #D1D5DB;
}

/* Sidebar Articles */
.sidebar-articles {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

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

.sidebar-article:hover {
  background: #1F242D;
}

.sidebar-article-image {
  width: 100px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.sidebar-article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sidebar-article-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.article-category {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  width: fit-content;
}

.cat-basketball {
  background: #DC2626;
  color: #FAFAFA;
}

.cat-f1 {
  background: #3B82F6;
  color: #FAFAFA;
}

.cat-mma {
  background: #9333EA;
  color: #FAFAFA;
}

.sidebar-article-content h4 {
  font-family: 'Oswald', sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  color: #FAFAFA;
}

.article-time {
  font-size: 12px;
  color: #6B7280;
}

/* Analysis Section */
.analysis-section {
  padding: 60px 80px;
  background: #0D0F13;
}

.analysis-content-wrapper {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  margin-bottom: 40px;
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.analysis-card {
  background: #191D24;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.analysis-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
}

.analysis-image {
  position: relative;
  height: 160px;
  overflow: hidden;
}

.analysis-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.analysis-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #FAFAFA;
}

.badge-basketball {
  background: #F97316;
}

.badge-tennis {
  background: #22C55E;
}

.badge-f1 {
  background: #3B82F6;
}

.badge-rugby {
  background: #DC2626;
}

.analysis-card-content {
  padding: 20px;
}

.analysis-card-content h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 10px;
  color: #FAFAFA;
}

.analysis-card-content p {
  font-size: 13px;
  line-height: 1.5;
  color: #9CA3AF;
  margin-bottom: 12px;
}

.analysis-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7280;
}

/* Sidebar - Tendances */
.analysis-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.tendances-card {
  background: #191D24;
  border-radius: 12px;
  padding: 24px;
}

.tendances-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.tendances-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tendances-list li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #2B303B;
}

.tendances-list li:last-child {
  border-bottom: none;
}

.trend-number {
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #4B5563;
  min-width: 24px;
}

.trend-content h5 {
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #FAFAFA;
  margin-bottom: 4px;
}

.trend-discussions {
  font-size: 12px;
  color: #6B7280;
}

/* Newsletter */
.newsletter-card {
  background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
  border-radius: 12px;
  padding: 28px;
  text-align: center;
}

.newsletter-icon {
  margin-bottom: 16px;
}

.newsletter-card h4 {
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.newsletter-card p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 20px;
}

.newsletter-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  color: #FAFAFA;
  font-size: 14px;
  margin-bottom: 12px;
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.btn-subscribe {
  width: 100%;
  padding: 12px;
  background: #FC602E;
  border: none;
  border-radius: 8px;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #FAFAFA;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-subscribe:hover {
  background: #E5541F;
}

.view-more-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn-view-more {
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
  transition: all 0.3s;
}

.btn-view-more:hover {
  background: #E5541F;
}

/* Explore Section */
.explore-section {
  padding: 60px 80px 80px;
}

.sports-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}

.sport-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
}

.sport-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
}

.sport-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.sport-name {
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #FAFAFA;
}

/* Responsive */
@media (max-width: 1280px) {
  .articles-grid {
    grid-template-columns: 1fr 350px;
  }
  
  .analysis-content-wrapper {
    grid-template-columns: 1fr 300px;
  }
  
  .sports-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .latest-news-section,
  .analysis-section,
  .explore-section {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 1024px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .analysis-content-wrapper {
    grid-template-columns: 1fr;
  }
  
  .analysis-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 500px;
  }
  
  .hero-content {
    padding: 120px 20px 0;
    max-width: 100%;
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .hero-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
  
  .latest-news-section,
  .analysis-section,
  .explore-section {
    padding: 40px 20px;
  }
  
  .sports-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .analysis-grid {
    grid-template-columns: 1fr;
  }
}
</style>
