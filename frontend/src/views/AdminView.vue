<template>
  <div class="admin-layout">

    <!-- LOGIN -->
    <div v-if="!isAuthenticated" class="login-page">
      <div class="login-card">
        <div class="login-logo">
          <img src="/assets/images/logo.svg" alt="Blog123" class="logo-img" />
        </div>
        <h1 class="login-title">Administration</h1>
        <p class="login-sub">Connectez-vous pour gérer les articles</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="field">
            <label class="field-label">Email</label>
            <input v-model="loginForm.email" type="email" class="field-input" placeholder="admin@blog123.fr" required />
          </div>
          <div class="field">
            <label class="field-label">Mot de passe</label>
            <input v-model="loginForm.password" type="password" class="field-input" placeholder="••••••••" required />
          </div>
          <p v-if="loginError" class="error-msg">{{ loginError }}</p>
          <button type="submit" class="btn-primary" :disabled="loginLoading">
            {{ loginLoading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>
      </div>
    </div>

    <!-- DASHBOARD -->
    <div v-else class="dashboard">

      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-logo">
          <img src="/assets/images/logo.svg" alt="Blog123" class="logo-img" />
        </div>
        <nav class="sidebar-nav">
          <button class="nav-item" :class="{ active: currentTab === 'articles' }" @click="currentTab = 'articles'">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
            Articles
          </button>
          <button class="nav-item" :class="{ active: currentTab === 'create' }" @click="openCreateForm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Nouvel article
          </button>
          <button class="nav-item" :class="{ active: currentTab === 'categories' }" @click="currentTab = 'categories'">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            Catégories
          </button>
        </nav>
        <div class="sidebar-footer">
          <span class="user-email">{{ currentUser?.email }}</span>
          <button class="btn-logout" @click="handleLogout">Déconnexion</button>
        </div>
      </aside>

      <!-- Main content -->
      <main class="main-content">

        <!-- Liste des articles -->
        <div v-if="currentTab === 'articles'">
          <div class="content-header">
            <h2 class="content-title">Articles</h2>
            <button class="btn-primary small" @click="openCreateForm">+ Nouvel article</button>
          </div>
          <div v-if="articlesLoading" class="loading">Chargement...</div>
          <div v-else-if="articles.length === 0" class="empty-state">Aucun article pour l'instant.</div>
          <div v-else class="articles-table">
            <div class="table-header">
              <span>Titre</span>
              <span>Catégorie</span>
              <span>Statut</span>
              <span>Date</span>
              <span>Actions</span>
            </div>
            <div v-for="article in articles" :key="article.id" class="table-row">
              <span class="article-title-cell">{{ article.title }}</span>
              <span class="cell-muted">{{ article.category?.name || '—' }}</span>
              <span>
                <span class="badge" :class="article.published ? 'badge-published' : 'badge-draft'">
                  {{ article.published ? 'Publié' : 'Brouillon' }}
                </span>
              </span>
              <span class="cell-muted">{{ formatDate(article.createdAt) }}</span>
              <span class="actions-cell">
                <button class="btn-edit" @click="openEditForm(article)">Modifier</button>
                <button class="btn-delete" @click="confirmDelete(article)">Supprimer</button>
              </span>
            </div>
          </div>
        </div>

        <!-- Formulaire création / édition -->
        <div v-if="currentTab === 'create'">
          <div class="content-header">
            <h2 class="content-title">{{ editingArticle ? 'Modifier l\'article' : 'Nouvel article' }}</h2>
            <button class="btn-secondary small" @click="currentTab = 'articles'">← Retour</button>
          </div>
          <form @submit.prevent="handleSubmit" class="article-form">
            <div class="form-grid">
              <div class="field full">
                <label class="field-label">Titre *</label>
                <input v-model="articleForm.title" type="text" class="field-input" placeholder="Titre de l'article" required />
              </div>
              <div class="field">
                <label class="field-label">Catégorie</label>
                <select v-model="articleForm.categoryId" class="field-input">
                  <option value="">Sans catégorie</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
              </div>
              <div class="field">
                <label class="field-label">URL de l'image</label>
                <input v-model="articleForm.imageUrl" type="url" class="field-input" placeholder="https://..." />
              </div>
              <div class="field full">
                <label class="field-label">Vidéo YouTube <span class="field-hint">— colle l'URL complète (optionnel)</span></label>
                <input v-model="articleForm.videoUrl" type="text" class="field-input" placeholder="https://www.youtube.com/watch?v=..." />
                <span v-if="youtubePreviewId" class="field-preview">✓ Vidéo détectée : {{ youtubePreviewId }}</span>
                <span v-else-if="articleForm.videoUrl" class="field-error-small">⚠ URL YouTube non reconnue</span>
              </div>
              <div class="field full">
                <label class="field-label">Audio MP3 <span class="field-hint">— URL publique d'un fichier .mp3 (optionnel)</span></label>
                <input v-model="articleForm.audioUrl" type="text" class="field-input" placeholder="https://example.com/podcast.mp3" />
                <span v-if="articleForm.audioUrl" class="field-preview">✓ URL audio renseignée</span>
              </div>
              <div class="field full">
                <label class="field-label">Extrait</label>
                <input v-model="articleForm.excerpt" type="text" class="field-input" placeholder="Courte description visible sur les cartes d'articles" />
              </div>
              <div class="field full">
                <label class="field-label">Contenu *</label>
                <textarea v-model="articleForm.content" class="field-textarea" placeholder="Contenu de l'article..." rows="16" required />
              </div>
              <div class="field full">
                <label class="field-label checkbox-label">
                  <input type="checkbox" v-model="articleForm.published" class="checkbox" />
                  Publier l'article immédiatement
                </label>
              </div>
            </div>
            <p v-if="formError" class="error-msg">{{ formError }}</p>
            <p v-if="formSuccess" class="success-msg">{{ formSuccess }}</p>
            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="currentTab = 'articles'">Annuler</button>
              <button type="submit" class="btn-primary" :disabled="formLoading">
                {{ formLoading ? 'Enregistrement...' : (editingArticle ? 'Mettre à jour' : 'Créer l\'article') }}
              </button>
            </div>
          </form>
        </div>

        <!-- Gestion des catégories -->
        <div v-if="currentTab === 'categories'">
          <div class="content-header">
            <h2 class="content-title">Catégories</h2>
          </div>

          <!-- Formulaire nouvelle catégorie -->
          <div class="article-form" style="margin-bottom: 24px;">
            <h3 class="form-section-title">Ajouter une catégorie</h3>
            <div class="form-grid" style="margin-bottom: 0;">
              <div class="field">
                <label class="field-label">Nom *</label>
                <input v-model="catForm.name" type="text" class="field-input" placeholder="Ex: Cyclisme" @input="autoSlug" />
              </div>
              <div class="field">
                <label class="field-label">Slug *</label>
                <input v-model="catForm.slug" type="text" class="field-input" placeholder="Ex: cyclisme" />
              </div>
              <div class="field full">
                <label class="field-label">Description</label>
                <input v-model="catForm.description" type="text" class="field-input" placeholder="Courte description (optionnel)" />
              </div>
            </div>
            <p v-if="catError" class="error-msg" style="margin-top: 16px;">{{ catError }}</p>
            <p v-if="catSuccess" class="success-msg" style="margin-top: 16px;">{{ catSuccess }}</p>
            <div class="form-actions">
              <button class="btn-primary" @click="createCategory" :disabled="catLoading">
                {{ catLoading ? 'Création...' : 'Créer la catégorie' }}
              </button>
            </div>
          </div>

          <!-- Liste des catégories -->
          <div v-if="categories.length === 0" class="empty-state">Aucune catégorie.</div>
          <div v-else class="articles-table">
            <div class="table-header" style="grid-template-columns: 1fr 1fr 2fr 120px;">
              <span>Nom</span>
              <span>Slug</span>
              <span>Description</span>
              <span>Actions</span>
            </div>
            <div v-for="cat in categories" :key="cat.id" class="table-row" style="grid-template-columns: 1fr 1fr 2fr 120px;">
              <span class="article-title-cell">{{ cat.name }}</span>
              <span class="cell-muted">{{ cat.slug }}</span>
              <span class="cell-muted">{{ cat.description || '—' }}</span>
              <span class="actions-cell">
                <button class="btn-delete" @click="confirmDeleteCat(cat)">Supprimer</button>
              </span>
            </div>
          </div>
        </div>

      </main>
    </div>

    <!-- Modal confirmation suppression article -->
    <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
      <div class="modal">
        <h3 class="modal-title">Supprimer l'article ?</h3>
        <p class="modal-body">« {{ deleteTarget.title }} » sera supprimé définitivement.</p>
        <div class="modal-actions">
          <button class="btn-secondary" @click="deleteTarget = null">Annuler</button>
          <button class="btn-danger" @click="handleDelete" :disabled="deleteLoading">
            {{ deleteLoading ? 'Suppression...' : 'Supprimer' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal confirmation suppression catégorie -->
    <div v-if="deleteCatTarget" class="modal-overlay" @click.self="deleteCatTarget = null">
      <div class="modal">
        <h3 class="modal-title">Supprimer la catégorie ?</h3>
        <p class="modal-body">« {{ deleteCatTarget.name }} » sera supprimée définitivement.</p>
        <div class="modal-actions">
          <button class="btn-secondary" @click="deleteCatTarget = null">Annuler</button>
          <button class="btn-danger" @click="handleDeleteCat" :disabled="deleteCatLoading">
            {{ deleteCatLoading ? 'Suppression...' : 'Supprimer' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { adminService } from '@/services/adminService'

// Auth
const isAuthenticated = ref(adminService.isAuthenticated())
const currentUser = ref(adminService.getUser())
const loginForm = ref({ email: '', password: '' })
const loginError = ref('')
const loginLoading = ref(false)

// Navigation
const currentTab = ref('articles')

// Articles
const articles = ref([])
const articlesLoading = ref(false)
const editingArticle = ref(null)
const deleteTarget = ref(null)
const deleteLoading = ref(false)

// Catégories
const categories = ref([])
const deleteCatTarget = ref(null)
const deleteCatLoading = ref(false)
const catForm = ref({ name: '', slug: '', description: '' })
const catLoading = ref(false)
const catError = ref('')
const catSuccess = ref('')

// Formulaire article
const articleForm = ref({ title: '', content: '', excerpt: '', imageUrl: '', videoUrl: '', audioUrl: '', categoryId: '', published: false })
const formLoading = ref(false)
const formError = ref('')
const formSuccess = ref('')

// Extrait l'ID YouTube (regex robuste qui ignore les paramètres supplémentaires)
const youtubePreviewId = computed(() => {
  const url = articleForm.value.videoUrl
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
})

// Login
const handleLogin = async () => {
  loginLoading.value = true
  loginError.value = ''
  try {
    await adminService.login(loginForm.value.email, loginForm.value.password)
    isAuthenticated.value = true
    currentUser.value = adminService.getUser()
    await loadData()
  } catch (err) {
    loginError.value = err.response?.data?.message || 'Email ou mot de passe incorrect'
  } finally {
    loginLoading.value = false
  }
}

const handleLogout = () => {
  adminService.logout()
  isAuthenticated.value = false
  currentUser.value = null
}

// Chargement
const loadData = async () => {
  articlesLoading.value = true
  try {
    const [arts, cats] = await Promise.all([
      adminService.getAllArticles(),
      adminService.getCategories()
    ])
    articles.value = arts
    categories.value = cats
  } catch (err) {
    console.error('Erreur chargement:', err)
  } finally {
    articlesLoading.value = false
  }
}

// Articles
const resetForm = () => {
  articleForm.value = { title: '', content: '', excerpt: '', imageUrl: '', videoUrl: '', audioUrl: '', categoryId: '', published: false }
  editingArticle.value = null
  formError.value = ''
  formSuccess.value = ''
}

const openCreateForm = () => {
  resetForm()
  currentTab.value = 'create'
}

const openEditForm = (article) => {
  editingArticle.value = article
  articleForm.value = {
    title: article.title,
    content: article.content,
    excerpt: article.excerpt || '',
    imageUrl: article.imageUrl || '',
    videoUrl: article.videoUrl || '',
    audioUrl: article.audioUrl || '',
    categoryId: article.categoryId || '',
    published: article.published
  }
  formError.value = ''
  formSuccess.value = ''
  currentTab.value = 'create'
}

const handleSubmit = async () => {
  formLoading.value = true
  formError.value = ''
  formSuccess.value = ''
  try {
    const payload = { ...articleForm.value }
    if (!payload.categoryId) delete payload.categoryId
    if (!payload.imageUrl) delete payload.imageUrl
    if (!payload.excerpt) delete payload.excerpt
    if (!payload.videoUrl) delete payload.videoUrl
    if (!payload.audioUrl) delete payload.audioUrl

    if (editingArticle.value) {
      await adminService.updateArticle(editingArticle.value.id, payload)
      formSuccess.value = 'Article mis à jour avec succès !'
    } else {
      await adminService.createArticle(payload)
      formSuccess.value = 'Article créé avec succès !'
      resetForm()
    }
    await loadData()
  } catch (err) {
    formError.value = err.response?.data?.message || 'Une erreur est survenue'
  } finally {
    formLoading.value = false
  }
}

const confirmDelete = (article) => { deleteTarget.value = article }

const handleDelete = async () => {
  deleteLoading.value = true
  try {
    await adminService.deleteArticle(deleteTarget.value.id)
    deleteTarget.value = null
    await loadData()
  } catch (err) {
    console.error('Erreur suppression:', err)
  } finally {
    deleteLoading.value = false
  }
}

// Catégories
const autoSlug = () => {
  catForm.value.slug = catForm.value.name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const createCategory = async () => {
  catLoading.value = true
  catError.value = ''
  catSuccess.value = ''
  try {
    if (!catForm.value.name || !catForm.value.slug) {
      catError.value = 'Le nom et le slug sont obligatoires'
      return
    }
    await adminService.createCategory({ ...catForm.value })
    catSuccess.value = `Catégorie « ${catForm.value.name} » créée !`
    catForm.value = { name: '', slug: '', description: '' }
    await loadData()
  } catch (err) {
    catError.value = err.response?.data?.message || 'Erreur lors de la création'
  } finally {
    catLoading.value = false
  }
}

const confirmDeleteCat = (cat) => { deleteCatTarget.value = cat }

const handleDeleteCat = async () => {
  deleteCatLoading.value = true
  try {
    await adminService.deleteCategory(deleteCatTarget.value.id)
    deleteCatTarget.value = null
    await loadData()
  } catch (err) {
    console.error('Erreur suppression catégorie:', err)
  } finally {
    deleteCatLoading.value = false
  }
}

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

onMounted(() => {
  if (isAuthenticated.value) loadData()
})
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #101318;
  color: #FAFAFA;
  font-family: 'Source Sans 3', sans-serif;
}

.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
}

.login-card {
  background: #191D24;
  border: 1px solid #2B303B;
  border-radius: 16px;
  padding: 48px;
  width: 100%;
  max-width: 420px;
}

.login-logo { margin-bottom: 24px; }
.logo-img { height: 36px; }

.login-title {
  font-family: 'Oswald', sans-serif;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #FAFAFA;
}

.login-sub {
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 32px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dashboard { display: flex; min-height: 100vh; }

.sidebar {
  width: 240px;
  background: #191D24;
  border-right: 1px solid #2B303B;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
}

.sidebar-logo {
  padding: 0 24px 24px;
  border-bottom: 1px solid #2B303B;
  margin-bottom: 16px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 12px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #6B7280;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
  width: 100%;
}

.nav-item:hover { background: #2B303B; color: #FAFAFA; }
.nav-item.active { background: rgba(252, 96, 46, 0.12); color: #FC602E; }

.sidebar-footer {
  padding: 16px 24px;
  border-top: 1px solid #2B303B;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-email {
  font-size: 12px;
  color: #6B7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-logout {
  background: transparent;
  border: 1px solid #2B303B;
  color: #6B7280;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'Source Sans 3', sans-serif;
}

.btn-logout:hover { border-color: #FC602E; color: #FC602E; }

.main-content {
  margin-left: 240px;
  flex: 1;
  padding: 40px;
  max-width: calc(100vw - 240px);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.content-title {
  font-family: 'Oswald', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #FAFAFA;
}

.form-section-title {
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #FAFAFA;
  margin-bottom: 20px;
}

.field { display: flex; flex-direction: column; gap: 6px; }

.field-label {
  font-size: 13px;
  font-weight: 500;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.field-input {
  background: #101318;
  border: 1px solid #2B303B;
  border-radius: 8px;
  padding: 10px 14px;
  color: #FAFAFA;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
}

.field-input:focus { border-color: #FC602E; }
.field-input option { background: #191D24; }

.field-textarea {
  background: #101318;
  border: 1px solid #2B303B;
  border-radius: 8px;
  padding: 12px 14px;
  color: #FAFAFA;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
  resize: vertical;
  line-height: 1.6;
}

.field-textarea:focus { border-color: #FC602E; }

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #9CA3AF;
  cursor: pointer;
  text-transform: none;
  letter-spacing: 0;
}

.checkbox { width: 16px; height: 16px; accent-color: #FC602E; cursor: pointer; }

.field-hint {
  font-size: 11px;
  color: #6B7280;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
}

.field-preview {
  font-size: 12px;
  color: #10B981;
  margin-top: 6px;
  display: block;
}

.field-error-small {
  font-size: 12px;
  color: #F87171;
  margin-top: 6px;
  display: block;
}

.btn-primary {
  background: #FC602E;
  color: #FAFAFA;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-family: 'Oswald', sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-primary:hover:not(:disabled) { background: #e5531e; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-primary.small { padding: 8px 16px; font-size: 13px; }

.btn-secondary {
  background: transparent;
  border: 1px solid #2B303B;
  color: #9CA3AF;
  border-radius: 8px;
  padding: 10px 20px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-secondary:hover { border-color: #6B7280; color: #FAFAFA; }
.btn-secondary.small { padding: 8px 16px; font-size: 13px; }

.btn-danger {
  background: #DC2626;
  color: #FAFAFA;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-danger:hover:not(:disabled) { background: #b91c1c; }
.btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }

.articles-table {
  background: #191D24;
  border: 1px solid #2B303B;
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 0.8fr 1fr 1fr;
  padding: 12px 20px;
  background: #101318;
  border-bottom: 1px solid #2B303B;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6B7280;
  gap: 16px;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 0.8fr 1fr 1fr;
  padding: 16px 20px;
  border-bottom: 1px solid #2B303B;
  align-items: center;
  font-size: 14px;
  gap: 16px;
  transition: background 0.1s;
}

.table-row:last-child { border-bottom: none; }
.table-row:hover { background: rgba(255,255,255,0.02); }

.article-title-cell {
  color: #FAFAFA;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cell-muted { color: #6B7280; font-size: 13px; }

.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-published { background: rgba(16, 185, 129, 0.15); color: #10B981; }
.badge-draft { background: rgba(107, 114, 128, 0.15); color: #6B7280; }

.actions-cell { display: flex; gap: 8px; }

.btn-edit {
  background: transparent;
  border: 1px solid #2B303B;
  color: #9CA3AF;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'Source Sans 3', sans-serif;
}

.btn-edit:hover { border-color: #FC602E; color: #FC602E; }

.btn-delete {
  background: transparent;
  border: 1px solid #2B303B;
  color: #9CA3AF;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'Source Sans 3', sans-serif;
}

.btn-delete:hover { border-color: #DC2626; color: #DC2626; }

.article-form {
  background: #191D24;
  border: 1px solid #2B303B;
  border-radius: 12px;
  padding: 32px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.field.full { grid-column: 1 / -1; }

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #2B303B;
}

.error-msg {
  color: #F87171;
  font-size: 13px;
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.2);
  padding: 10px 14px;
  border-radius: 8px;
}

.success-msg {
  color: #10B981;
  font-size: 13px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 10px 14px;
  border-radius: 8px;
}

.loading { color: #6B7280; text-align: center; padding: 48px; }

.empty-state {
  color: #6B7280;
  text-align: center;
  padding: 64px;
  background: #191D24;
  border: 1px solid #2B303B;
  border-radius: 12px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background: #191D24;
  border: 1px solid #2B303B;
  border-radius: 12px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
}

.modal-title {
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  margin-bottom: 12px;
  color: #FAFAFA;
}

.modal-body { color: #9CA3AF; font-size: 14px; margin-bottom: 24px; }

.modal-actions { display: flex; justify-content: flex-end; gap: 12px; }
</style>