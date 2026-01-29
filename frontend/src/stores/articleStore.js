import { defineStore } from 'pinia'
import { ref } from 'vue'
import { articleService } from '@/services/articleService'

export const useArticleStore = defineStore('article', () => {
  const articles = ref([])
  const currentArticle = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchArticles = async (params = {}) => {
    loading.value = true
    error.value = null
    try {
      articles.value = await articleService.getAll(params)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchArticle = async (id) => {
    loading.value = true
    error.value = null
    try {
      currentArticle.value = await articleService.getById(id)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    articles,
    currentArticle,
    loading,
    error,
    fetchArticles,
    fetchArticle
  }
})
