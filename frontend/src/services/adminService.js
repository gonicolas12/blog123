import api from './api'

export const adminService = {
    // Auth
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password })
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
        }
        return response.data
    },

    logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    },

    getUser: () => {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token')
    },

    // Articles
    createArticle: async (articleData) => {
        const response = await api.post('/articles', articleData)
        return response.data
    },

    updateArticle: async (id, articleData) => {
        const response = await api.patch(`/articles/${id}`, articleData)
        return response.data
    },

    deleteArticle: async (id) => {
        const response = await api.delete(`/articles/${id}`)
        return response.data
    },

    getAllArticles: async () => {
        const response = await api.get('/articles/admin/all')
        return response.data
    },

    // Catégories
    getCategories: async () => {
        const response = await api.get('/categories')
        return response.data
    },

    createCategory: async (data) => {
        const response = await api.post('/categories', data)
        return response.data
    },

    deleteCategory: async (id) => {
        const response = await api.delete(`/categories/${id}`)
        return response.data
    }
}