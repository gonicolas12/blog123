<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Logo & Social -->
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="/assets/images/logo.svg" alt="Blog123" class="logo-img" />
        </div>
        <p class="footer-tagline">
          Votre source d'actualités sportives en temps réel. Football, Basketball, Tennis et plus encore.
        </p>
        <div class="social-links">
          <a href="#" class="social-link" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
              <circle cx="18" cy="6" r="1" fill="currentColor"/>
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="YouTube">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 1 11.75C0.988687 13.537 1.14266 15.3213 1.46 17.08C1.59096 17.5398 1.8383 17.9581 2.17814 18.2945C2.51798 18.6308 2.93882 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0113 9.96295 22.8573 8.1787 22.54 6.42Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.75 15.02L15.5 11.75L9.75 8.48V15.02Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Sports -->
      <div class="footer-column">
        <h3 class="footer-title">SPORTS</h3>
        <ul class="footer-links">
          <li><RouterLink to="/sport/foot">Football</RouterLink></li>
          <li><RouterLink to="/sport/basket">Basketball</RouterLink></li>
          <li><RouterLink to="/sport/tennis">Tennis</RouterLink></li>
          <li><RouterLink to="/sport/rugby">Rugby</RouterLink></li>
          <li><RouterLink to="/sport/f1">Formule 1</RouterLink></li>
          <li><RouterLink to="/sport/mma">MMA</RouterLink></li>
        </ul>
      </div>

      <!-- Navigation -->
      <div class="footer-column">
        <h3 class="footer-title">NAVIGATION</h3>
        <ul class="footer-links">
          <li><RouterLink to="/">Articles</RouterLink></li>
          <li><RouterLink to="/sport/foot">Sports</RouterLink></li>
          <li><RouterLink to="/about">À propos</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
        </ul>
      </div>

      <!-- Informations -->
      <div class="footer-column">
        <h3 class="footer-title">INFORMATIONS</h3>
        <ul class="footer-links">
          <li><RouterLink to="/about">À propos</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
          <li><a href="#">Mentions légales</a></li>
          <li><a href="#">Politique de confidentialité</a></li>
        </ul>
      </div>
    </div>

    <!-- Bottom -->
    <div class="footer-bottom">
      <p>© {{ currentYear }} Blog123. Tous droits réservés.</p>
      <p class="footer-credit">Développé avec passion pour les fans de sport</p>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: #101318;
  border-top: 1px solid #2B303B;
  padding-top: 60px;
}

.footer-container {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 48px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px 48px;
}

/* Brand */
.footer-brand {
  max-width: 300px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 16px;
}

.logo-img {
  height: 36px;
  width: auto;
}

.footer-tagline {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 24px;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #191D24;
  border-radius: 10px;
  color: #6B7280;
  transition: all 0.2s;
}

.social-link:hover {
  background: #2B303B;
  color: #FAFAFA;
}

/* Columns */
.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #FAFAFA;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  font-size: 14px;
  color: #6B7280;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #FC602E;
}

/* Bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 80px;
  border-top: 1px solid #2B303B;
}

.footer-bottom p {
  font-size: 13px;
  color: #4B5563;
}

.footer-credit {
  color: #4B5563;
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    padding: 0 40px 40px;
  }
  
  .footer-bottom {
    padding: 24px 40px;
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    padding: 0 20px 32px;
  }
  
  .footer-brand {
    max-width: 100%;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    padding: 24px 20px;
    text-align: center;
  }
}
</style>
