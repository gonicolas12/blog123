<template>
  <div class="contact-page">
    <!-- Header -->
    <div class="contact-header">
      <h1 class="contact-title">Contactez nous</h1>
      <p class="contact-subtitle">
        Vous avez une question, une suggestion ou souhaitez collaborer avec nous ?<br/>
        N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
      </p>
    </div>

    <!-- 2-col body -->
    <div class="contact-body">
      <!-- LEFT: Get in Touch -->
      <div class="get-in-touch">
        <h2 class="git-title">Get in Touch</h2>

        <div class="info-list">
          <div class="info-item">
            <div class="info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#FC602E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 6L12 13L2 6" stroke="#FC602E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="info-text">
              <p class="info-label">Email</p>
              <p class="info-value">contact@blog123.com</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.88 2 2 0 0 1 3.6 2.72l3-.01a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.56-1.56a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#FC602E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="info-text">
              <p class="info-label">Phone</p>
              <p class="info-value">+1 (555) 123-4567</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" stroke="#FC602E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10" r="3" stroke="#FC602E" stroke-width="2"/></svg>
            </div>
            <div class="info-text">
              <p class="info-label">Address</p>
              <p class="info-value">123 Sports Avenue<br/>Toulouse, 31000</p>
            </div>
          </div>
        </div>

        <!-- Horaires -->
        <div class="hours-box">
          <h3 class="hours-title">Ouverture</h3>
          <div class="hours-row">
            <span>Lundi - Vendredi</span>
            <span class="hours-val">9h - 18h</span>
          </div>
          <div class="hours-row">
            <span>Samedi</span>
            <span class="hours-val closed">Fermé</span>
          </div>
          <div class="hours-row">
            <span>Dimanche</span>
            <span class="hours-val closed">Fermé</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: Form -->
      <div class="form-panel">
        <form @submit.prevent="handleSubmit">
          <div class="form-row">
            <div class="form-group">
              <label>Nom</label>
              <input type="text" v-model="form.name" placeholder="Votre nom" required />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="form.email" placeholder="votre@email.com" required />
            </div>
          </div>
          <div class="form-group">
            <label>Objet</label>
            <input type="text" v-model="form.subject" placeholder="Objet de votre message" required />
          </div>
          <div class="form-group">
            <label>Message</label>
            <textarea v-model="form.message" placeholder="Votre message..." rows="7" required></textarea>
          </div>
          <button type="submit" class="btn-submit" :disabled="sent">
            {{ sent ? 'MESSAGE ENVOYÉ ✓' : 'ENVOYER' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({ name: '', email: '', subject: '', message: '' })
const sent = ref(false)

const handleSubmit = () => {
  sent.value = true
  setTimeout(() => {
    sent.value = false
    form.value = { name: '', email: '', subject: '', message: '' }
  }, 3000)
}
</script>

<style scoped>
.contact-page {
  background: #101318;
  min-height: calc(100vh - 72px);
  padding-top: 72px;
  color: #FAFAFA;
}

/* Header */
.contact-header {
  text-align: center;
  padding: 72px 40px 56px;
  border-bottom: 1px solid #1E2229;
}

.contact-title {
  font-family: 'Oswald', sans-serif;
  font-size: 44px;
  font-weight: 700;
  color: #FAFAFA;
  margin-bottom: 20px;
}

.contact-subtitle {
  font-size: 16px;
  line-height: 1.7;
  color: #9CA3AF;
  max-width: 540px;
  margin: 0 auto;
}

/* Body */
.contact-body {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 0;
  max-width: 1100px;
  margin: 0 auto;
  padding: 64px 40px;
}

/* Left: Get in Touch */
.get-in-touch {
  padding-right: 60px;
  border-right: 1px solid #1E2229;
}

.git-title {
  font-family: 'Oswald', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #FAFAFA;
  margin-bottom: 32px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.info-icon {
  width: 44px;
  height: 44px;
  background: rgba(252, 96, 46, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-label {
  font-family: 'Oswald', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #6B7280;
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 14px;
  color: #FAFAFA;
  line-height: 1.5;
}

/* Hours */
.hours-box {
  background: #141820;
  border-radius: 12px;
  padding: 24px;
}

.hours-title {
  font-family: 'Oswald', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #FAFAFA;
  margin-bottom: 16px;
}

.hours-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #9CA3AF;
  padding: 6px 0;
  border-bottom: 1px solid #1E2229;
}

.hours-row:last-child {
  border-bottom: none;
}

.hours-val {
  color: #FAFAFA;
  font-weight: 600;
}

.hours-val.closed {
  color: #6B7280;
}

/* Right: Form */
.form-panel {
  padding-left: 60px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-family: 'Oswald', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 14px 16px;
  background: #141820;
  border: 1px solid #2B303B;
  border-radius: 8px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 15px;
  color: #FAFAFA;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #FC602E;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #4B5563;
}

.form-group textarea {
  resize: vertical;
}

.btn-submit {
  width: 100%;
  padding: 16px;
  background: #FC602E;
  border: none;
  border-radius: 8px;
  font-family: 'Oswald', sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #FAFAFA;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
}

.btn-submit:hover:not(:disabled) {
  background: #E5541F;
}

.btn-submit:disabled {
  background: #2B503A;
  cursor: default;
}

@media (max-width: 900px) {
  .contact-body {
    grid-template-columns: 1fr;
    padding: 40px 20px;
  }
  .get-in-touch {
    padding-right: 0;
    border-right: none;
    border-bottom: 1px solid #1E2229;
    padding-bottom: 40px;
    margin-bottom: 40px;
  }
  .form-panel { padding-left: 0; }
}

@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; }
  .contact-header { padding: 56px 20px 40px; }
  .contact-title { font-size: 32px; }
}
</style>
