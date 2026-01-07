# # Blog123 - Site d'actualités sportives

## 📁 Architecture du projet

```
blog123/
├── index.html          # Page d'accueil
├── css/
│   └── styles.css      # Tous les styles CSS
├── js/
│   └── main.js         # Scripts JavaScript
├── assets/
│   └── images/         # Images et logos
└── README.md           # Documentation
```

## 🚀 Fonctionnalités

### Implémentées
- ✅ Design moderne et responsive
- ✅ Header sticky avec navigation
- ✅ Section hero avec article à la une
- ✅ Grille d'articles avec images
- ✅ Sidebar avec tendances et newsletter
- ✅ Catégories de sports
- ✅ Footer complet avec liens sociaux
- ✅ Animations au scroll
- ✅ Menu mobile
- ✅ Recherche modale
- ✅ Formulaire newsletter
- ✅ Lazy loading des images

### À développer
- [ ] Système de routing pour les pages article
- [ ] Connexion à une API backend
- [ ] Système de commentaires
- [ ] Partage social
- [ ] Mode sombre/clair
- [ ] Système de favoris
- [ ] Recherche avancée

## 🎨 Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec variables CSS
- **JavaScript Vanilla** - Pas de dépendances
- **Google Fonts** - Oswald & Source Sans 3

## 📱 Responsive Design

Le site est entièrement responsive et optimisé pour :
- 📱 Mobile (< 768px)
- 📱 Tablette (768px - 992px)
- 💻 Desktop (> 992px)

## 🔧 Installation & Utilisation

### Méthode 1 : Directement dans le navigateur
1. Ouvrez `index.html` dans votre navigateur
2. C'est tout ! 🎉

### Méthode 2 : Avec un serveur local
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (npx)
npx serve

# Puis ouvrez http://localhost:8000
```

## 🖼️ Images

Pour ajouter votre logo :
1. Placez votre logo dans `assets/images/logo.png`
2. Le site l'utilisera automatiquement

Les images des articles utilisent actuellement des URLs de Builder.io.
Pour utiliser vos propres images, remplacez les URLs dans `index.html`.

## 🎯 Personnalisation

### Couleurs
Modifiez les variables CSS dans `css/styles.css` :
```css
:root {
    --primary-color: #F59B0A;      /* Orange principal */
    --secondary-color: #FFBF00;    /* Jaune */
    --accent-color: #EC1313;       /* Rouge */
    --dark-bg: #101318;            /* Fond sombre */
    /* ... */
}
```

### Typographie
Les polices sont importées depuis Google Fonts :
- **Oswald** - Titres et navigation
- **Source Sans 3** - Texte du corps

## 📝 Structure du code

### HTML (`index.html`)
- Structure sémantique claire
- Attributs ARIA pour l'accessibilité
- Classes BEM-like pour le CSS

### CSS (`css/styles.css`)
- Variables CSS pour la cohérence
- Mobile-first approach
- Animations fluides
- Grid & Flexbox modernes

### JavaScript (`js/main.js`)
- Code modulaire et commenté
- Gestion du menu mobile
- Animations au scroll
- Recherche modale
- Newsletter

## 🌐 Compatibilité navigateurs

- ✅ Chrome (dernière version)
- ✅ Firefox (dernière version)
- ✅ Safari (dernière version)
- ✅ Edge (dernière version)

## 📄 Licence

Ce projet est libre d'utilisation pour vos besoins éducatifs et professionnels.

## 🤝 Contribution

Pour améliorer le projet :
1. Ajoutez de nouvelles fonctionnalités dans `js/main.js`
2. Créez de nouveaux composants CSS dans `css/styles.css`
3. Ajoutez de nouvelles pages HTML selon vos besoins

## 📞 Support

Pour toute question, consultez la documentation ou les commentaires dans le code.

---

**Fait avec ❤️ pour les fans de sport**