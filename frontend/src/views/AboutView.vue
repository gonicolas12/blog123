<template>
  <div class="about-page">

    <!-- Who are we -->
    <section class="who-section">
      <div class="who-inner">
        <h1 class="section-heading">QUI SOMMES-NOUS ?</h1>
        <p class="who-text">
          Blog123 est né de la passion commune pour le sport et de l'envie de créer un espace où les fans peuvent se retrouver autour d'analyses approfondies et d'une couverture de qualité. Depuis sa fondation en 2020, notre équipe a travaillé sans relâche pour offrir des contenus pertinents, engageants et toujours bien documentés. Que vous soyez un passionné de football, de basket, de tennis ou même de sports plus marginaux, Blog123 est votre référence pour un contenu riche et authentique.
        </p>
      </div>
    </section>

    <!-- Mission -->
    <section class="mission-section">
      <div class="mission-inner">
        <h2 class="section-heading-accent">NOTRE MISSION</h2>
        <p class="mission-text">
          Chez Blog123, notre mission est simple : offrir aux fans une couverture sportive qui va au-delà des résultats et des scores. Nous croyons que chaque événement sportif a une histoire à raconter, que ce soit la persévérance des athlètes, les stratégies des équipes ou les moments inattendus qui marquent une compétition. Nous nous engageons à vous fournir des analyses détaillées, des interviews exclusives et des rapports d'actualité qui vous plongent dans l'univers du sport sous toutes ses facettes.
        </p>
        <p class="mission-text">
          Nous aspirons à devenir la plateforme incontournable pour les passionnés de sport, offrant un contenu varié et accessible à tous. Blog123 se veut un site où chaque visiteur trouve non seulement des informations précieuses, mais aussi une communauté de fans qui partagent les mêmes intérêts et la même passion. Nous encourageons le débat, l'échange et la réflexion autour des sujets qui comptent vraiment pour vous.
        </p>
      </div>
    </section>

    <!-- Values -->
    <section class="values-section">
      <div class="values-inner">
        <h2 class="section-heading-accent">NOS VALEURS</h2>
        <div class="values-grid">
          <div v-for="value in values" :key="value.title" class="value-card">
            <div class="value-icon" v-html="value.icon"></div>
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-desc">{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="team-section">
      <div class="team-inner">
        <h2 class="section-heading-accent">LA TEAM</h2>
        <p class="team-sub">Meet the passionate journalists behind Blog123</p>
        <div class="team-grid">
          <div v-for="(member, i) in team" :key="i" class="member-card">
            <img :src="member.avatar" :alt="member.name" class="member-avatar" />
            <div class="member-info">
              <h4 class="member-name">{{ member.name }}</h4>
              <span class="member-role">{{ member.role }}</span>
              <p class="member-bio">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="cta-inner">
        <h2 class="cta-title">Contactez-nous</h2>
        <p class="cta-text">
          Vous avez une idée de sujet ou souhaitez collaborer avec nous ? Nous serions ravis de vous entendre et de travailler ensemble. N'hésitez pas à nous contacter pour partager vos propositions, suggestions ou tout simplement échanger avec notre équipe.
        </p>
        <RouterLink to="/contact" class="cta-btn">CONTACTEZ NOUS</RouterLink>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const values = ref([
  {
    title: 'Précision avant tout',
    desc: 'Nous nous assurons que chaque article publié est le fruit d\'une recherche approfondie et d\'une vérification rigoureuse des faits.',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#FC602E" stroke-width="1.5"/><path d="M12 6V12L15 14" stroke="#FC602E" stroke-width="1.5" stroke-linecap="round"/></svg>`
  },
  {
    title: 'À l\'écoute des fans',
    desc: 'Nous créons du contenu qui répond aux attentes des fans, en nous concentrant sur ce qui compte vraiment pour eux.',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#FC602E" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="#FC602E" stroke-width="1.5"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#FC602E" stroke-width="1.5" stroke-linecap="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#FC602E" stroke-width="1.5" stroke-linecap="round"/></svg>`
  },
  {
    title: 'Qualité et expertise',
    desc: 'Nos journalistes spécialisés apportent une perspective unique et experte sur chacun des sujets.',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FC602E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    title: 'Couverture globale',
    desc: 'Nous couvrons les événements sportifs du monde entier, pour vous offrir une vision complète des compétitions les plus importantes.',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#FC602E" stroke-width="1.5"/><path d="M2 12H22M12 2C9.33 5.33 8 8.67 8 12C8 15.33 9.33 18.67 12 22C14.67 18.67 16 15.33 16 12C16 8.67 14.67 5.33 12 2Z" stroke="#FC602E" stroke-width="1.5" stroke-linecap="round"/></svg>`
  }
])

const team = ref([
  {
    name: 'Marcus Chen',
    role: 'Rédacteur en Chef',
    bio: 'Marcus brings over 15 years of sports journalism experience, having covered major events from the World Cup to the Olympics.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
  },
  {
    name: 'Sarah Mitchell',
    role: 'Senior Writer',
    bio: 'Sarah specializes in tennis and motorsport coverage, known for her insightful player interviews and race analysis.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80'
  },
  {
    name: 'Lucas Petit',
    role: 'Senior Writer',
    bio: 'Sarah specializes in tennis and motorsport coverage, known for her insightful player interviews and race analysis.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
  },
  {
    name: 'Sophie Durand',
    role: 'Senior Writer',
    bio: 'Sarah specializes in tennis and motorsport coverage, known for her insightful player interviews and race analysis.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'
  },
  {
    name: 'Antoine Moreau',
    role: 'Senior Writer',
    bio: 'Sarah specializes in tennis and motorsport coverage, known for her insightful player interviews and race analysis.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'
  }
])
</script>

<style scoped>
.about-page {
  background: #101318;
  padding-top: 72px;
  color: #FAFAFA;
}

.section-heading {
  font-family: 'Oswald', sans-serif;
  font-size: 40px;
  font-weight: 700;
  color: #FAFAFA;
  text-align: center;
  margin-bottom: 32px;
  letter-spacing: 0.5px;
}

.section-heading-accent {
  font-family: 'Oswald', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #FAFAFA;
  text-align: center;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
  position: relative;
  padding-bottom: 20px;
}

.section-heading-accent::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: #FC602E;
  border-radius: 2px;
}

/* Who section */
.who-section {
  padding: 80px 40px 80px;
}

.who-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.who-text {
  font-size: 16px;
  line-height: 1.8;
  color: #9CA3AF;
}

/* Mission */
.mission-section {
  padding: 80px 40px;
  background: #0D0F13;
}

.mission-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.mission-text {
  font-size: 15px;
  line-height: 1.8;
  color: #9CA3AF;
  margin-bottom: 20px;
}

/* Values */
.values-section {
  padding: 80px 40px;
}

.values-inner {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-top: 48px;
}

.value-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.value-icon {
  width: 64px;
  height: 64px;
  background: rgba(252, 96, 46, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.value-title {
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #FAFAFA;
}

.value-desc {
  font-size: 13px;
  line-height: 1.6;
  color: #9CA3AF;
  text-align: center;
}

/* Team */
.team-section {
  padding: 80px 40px;
  background: #0D0F13;
}

.team-inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.team-sub {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 48px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.team-grid .member-card:last-child:nth-child(odd) {
  grid-column: span 2;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
}

.member-card {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: #141820;
  border-radius: 12px;
  text-align: left;
}

.member-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.member-name {
  font-family: 'Oswald', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #FAFAFA;
  margin-bottom: 4px;
}

.member-role {
  font-size: 12px;
  font-weight: 700;
  color: #FC602E;
  display: block;
  margin-bottom: 8px;
}

.member-bio {
  font-size: 13px;
  line-height: 1.6;
  color: #9CA3AF;
}

/* CTA */
.cta-section {
  padding: 80px 40px;
  background: #FC602E;
  text-align: center;
}

.cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.cta-title {
  font-family: 'Oswald', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #FAFAFA;
  margin-bottom: 16px;
}

.cta-text {
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255,255,255,0.85);
  margin-bottom: 32px;
}

.cta-btn {
  display: inline-block;
  padding: 14px 32px;
  background: transparent;
  border: 2px solid #FAFAFA;
  border-radius: 8px;
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #FAFAFA;
  text-decoration: none;
  transition: all 0.2s;
}

.cta-btn:hover {
  background: rgba(255,255,255,0.15);
}

@media (max-width: 768px) {
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .team-grid { grid-template-columns: 1fr; }
  .team-grid .member-card:last-child:nth-child(odd) { grid-column: span 1; max-width: 100%; }
  .who-section, .mission-section, .values-section, .team-section { padding: 60px 20px; }
  .cta-section { padding: 60px 20px; }
}
</style>
