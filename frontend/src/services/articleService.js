import api from './api'

export const articleService = {
  // Récupérer tous les articles
  getAll: async (params = {}) => {
    const response = await api.get('/articles', { params })
    return response.data
  },

  // Récupérer un article par ID
  getById: async (id) => {
    const response = await api.get(`/articles/${id}`)
    return response.data
  },

  // Récupérer les articles par sport
  getBySport: async (sport, params = {}) => {
    const response = await api.get(`/articles/sport/${sport}`, { params })
    return response.data
  },

  // Créer un article (admin)
  create: async (articleData) => {
    const response = await api.post('/articles', articleData)
    return response.data
  },

  // Mettre à jour un article (admin)
  update: async (id, articleData) => {
    const response = await api.put(`/articles/${id}`, articleData)
    return response.data
  },

  // Supprimer un article (admin)
  delete: async (id) => {
    const response = await api.delete(`/articles/${id}`)
    return response.data
  }
}

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
  }
}
