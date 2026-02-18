<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useArticleStore } from './stores/articleStore'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const articleStore = useArticleStore()

onMounted(() => {
  // Load articles on app mount
  articleStore.fetchArticles()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  background: #101318;
  color: #FAFAFA;
}

.app {
  font-family: 'Source Sans 3', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Oswald', sans-serif;
}
</style>
