<template>
  <div class="contact-page">
    <div class="container">
      <h1 class="page-title">Contact</h1>
      <p class="page-description">
        Vous avez une question, une suggestion ou souhaitez collaborer avec nous ?<br/>
        N'hésitez pas à nous contacter.
      </p>

      <div class="contact-content">
        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Nom complet</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name"
              placeholder="Votre nom"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="subject">Sujet</label>
            <input 
              type="text" 
              id="subject" 
              v-model="form.subject"
              placeholder="Sujet de votre message"
              required
            />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea 
              id="message" 
              v-model="form.message"
              placeholder="Votre message..."
              rows="6"
              required
            ></textarea>
          </div>

          <button type="submit" class="btn-submit">
            ENVOYER LE MESSAGE
          </button>
        </form>

        <div class="contact-info">
          <div class="info-card">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#FC602E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="#FC602E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>Email</h3>
            <p>contact@blog123.fr</p>
          </div>

          <div class="info-card">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#FC602E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="#FC602E" stroke-width="2"/>
              </svg>
            </div>
            <h3>Adresse</h3>
            <p>Paris, France</p>
          </div>

          <div class="info-card">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="#FC602E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>Réseaux sociaux</h3>
            <p>@blog123_sport</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  // TODO: Implement contact form submission
  console.log('Form submitted:', form.value)
  alert('Message envoyé ! Nous vous répondrons dans les plus brefs délais.')
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}
</script>

<style scoped>
.contact-page {
  min-height: calc(100vh - 72px);
  padding: 80px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 80px;
}

.page-title {
  font-family: 'Oswald', sans-serif;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

.page-description {
  font-size: 18px;
  color: #9CA3AF;
  line-height: 1.6;
  margin-bottom: 60px;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 60px;
}

/* Form */
.contact-form {
  background: #191D24;
  border-radius: 16px;
  padding: 40px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #FAFAFA;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 14px 18px;
  background: #101318;
  border: 1px solid #2B303B;
  border-radius: 8px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 15px;
  color: #FAFAFA;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #FC602E;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #6B7280;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-submit {
  width: 100%;
  padding: 16px;
  background: #FC602E;
  border: none;
  border-radius: 8px;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #FAFAFA;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-submit:hover {
  background: #E5541F;
}

/* Info Cards */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-card {
  background: #191D24;
  border-radius: 12px;
  padding: 24px;
}

.info-icon {
  width: 48px;
  height: 48px;
  background: rgba(252, 96, 46, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.info-card h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.info-card p {
  font-size: 14px;
  color: #9CA3AF;
}

/* Responsive */
@media (max-width: 1024px) {
  .container {
    padding: 0 40px;
  }
  
  .contact-content {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .info-card {
    flex: 1;
    min-width: 200px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }
  
  .page-title {
    font-size: 36px;
  }
  
  .contact-form {
    padding: 24px;
  }
  
  .contact-info {
    flex-direction: column;
  }
}
</style>
