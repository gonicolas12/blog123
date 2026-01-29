// ========== Variables globales ==========
const mobileBreakpoint = 992;
let isMobile = window.innerWidth < mobileBreakpoint;

// ========== Gestion du menu mobile ==========
const initMobileMenu = () => {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    
    if (!nav) return;
    
    // Créer le bouton hamburger si nécessaire
    if (isMobile && !header.querySelector('.mobile-menu-btn')) {
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.setAttribute('aria-label', 'Menu');
        menuBtn.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        header.querySelector('.header-content').insertBefore(menuBtn, header.querySelector('.search-btn'));
        
        // Gestion du clic
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            nav.classList.toggle('mobile-active');
            document.body.style.overflow = nav.classList.contains('mobile-active') ? 'hidden' : '';
        });
    }
};

// ========== Smooth scroll pour les liens d'ancrage ==========
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                const nav = document.querySelector('.nav');
                const menuBtn = document.querySelector('.mobile-menu-btn');
                if (nav && nav.classList.contains('mobile-active')) {
                    nav.classList.remove('mobile-active');
                    menuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
};

// ========== Gestion du formulaire newsletter ==========
const initNewsletterForm = () => {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        if (email) {
            // Simuler l'envoi (à remplacer par un vrai appel API)
            showNotification('Merci de votre inscription ! 🎉');
            form.reset();
        }
    });
};

// ========== Notification toast ==========
const showNotification = (message, type = 'success') => {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Ajouter les styles si pas déjà présents
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 120px;
                right: 20px;
                padding: 16px 24px;
                background: #16A34A;
                color: white;
                border-radius: 8px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
            }
            
            .notification-error {
                background: #DC2626;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Retirer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// ========== Gestion du bouton de recherche ==========
const initSearch = () => {
    const searchBtn = document.querySelector('.search-btn');
    if (!searchBtn) return;
    
    searchBtn.addEventListener('click', () => {
        // Créer une modal de recherche simple
        const searchModal = document.createElement('div');
        searchModal.className = 'search-modal';
        searchModal.innerHTML = `
            <div class="search-modal-content">
                <button class="search-modal-close" aria-label="Fermer">&times;</button>
                <h2>Rechercher un article</h2>
                <input type="search" placeholder="Entrez votre recherche..." autofocus>
                <div class="search-results">
                    <p>Commencez à taper pour rechercher...</p>
                </div>
            </div>
        `;
        
        // Ajouter les styles si pas déjà présents
        if (!document.getElementById('search-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'search-modal-styles';
            style.textContent = `
                .search-modal {
                    position: fixed;
                    inset: 0;
                    background: rgba(16, 19, 24, 0.95);
                    backdrop-filter: blur(10px);
                    z-index: 10000;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    padding-top: 100px;
                    animation: fadeIn 0.3s ease-out;
                }
                
                .search-modal-content {
                    background: #191D24;
                    border-radius: 16px;
                    padding: 32px;
                    max-width: 600px;
                    width: 90%;
                    position: relative;
                }
                
                .search-modal-close {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    font-size: 32px;
                    color: #8F96A3;
                    cursor: pointer;
                    background: none;
                    border: none;
                }
                
                .search-modal-close:hover {
                    color: #FAFAFA;
                }
                
                .search-modal h2 {
                    margin-bottom: 20px;
                    font-family: 'Oswald', sans-serif;
                    font-size: 24px;
                }
                
                .search-modal input {
                    width: 100%;
                    padding: 16px;
                    border-radius: 8px;
                    border: 1px solid #2B303B;
                    background: #101318;
                    color: white;
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                
                .search-modal input:focus {
                    outline: none;
                    border-color: #F59B0A;
                }
                
                .search-results {
                    color: #8F96A3;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(searchModal);
        document.body.style.overflow = 'hidden';
        
        // Gestion de la fermeture
        const closeModal = () => {
            searchModal.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                searchModal.remove();
                document.body.style.overflow = '';
            }, 300);
        };
        
        searchModal.querySelector('.search-modal-close').addEventListener('click', closeModal);
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) closeModal();
        });
        
        // Échap pour fermer
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
        
        // Simuler la recherche
        const searchInput = searchModal.querySelector('input');
        const resultsDiv = searchModal.querySelector('.search-results');
        
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = e.target.value.trim();
                if (query.length > 2) {
                    resultsDiv.innerHTML = '<p>Recherche en cours...</p>';
                    // Ici vous pourriez appeler une API de recherche
                    setTimeout(() => {
                        resultsDiv.innerHTML = '<p>Aucun résultat trouvé pour "' + query + '"</p>';
                    }, 500);
                } else if (query.length === 0) {
                    resultsDiv.innerHTML = '<p>Commencez à taper pour rechercher...</p>';
                }
            }, 300);
        });
    });
};

// ========== Lazy loading des images ==========
const initLazyLoading = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
};

// ========== Animation au scroll ==========
const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.article-card, .news-card-small, .sport-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }
};

// ========== Gestion du header au scroll ==========
const initHeaderScroll = () => {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Ajouter la transition
    header.style.transition = 'transform 0.3s ease';
};

// ========== Gestion du resize ==========
const handleResize = () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth < mobileBreakpoint;
    
    if (wasMobile !== isMobile) {
        // Réinitialiser le menu si on change de mode
        const nav = document.querySelector('.nav');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (nav) {
            nav.classList.remove('mobile-active');
            document.body.style.overflow = '';
        }
        
        if (menuBtn && !isMobile) {
            menuBtn.remove();
        } else if (!menuBtn && isMobile) {
            initMobileMenu();
        }
    }
};

// ========== Gestion des clics sur les articles ==========
const initArticleClicks = () => {
    document.querySelectorAll('.article-card, .news-card-small, .news-main').forEach(card => {
        card.addEventListener('click', (e) => {
            // Éviter de naviguer si on clique sur un bouton ou un lien
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
            
            // Ici vous pourriez rediriger vers la page de l'article
            console.log('Article cliqué:', card);
            // window.location.href = '/article/...';
        });
        
        // Ajouter un curseur pointer pour indiquer que c'est cliquable
        card.style.cursor = 'pointer';
    });
};

// ========== Initialisation au chargement de la page ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Blog123 initialisé');
    
    // Initialiser tous les modules
    initMobileMenu();
    initSmoothScroll();
    initNewsletterForm();
    initSearch();
    initLazyLoading();
    initScrollAnimations();
    initHeaderScroll();
    initArticleClicks();
    
    // Écouter les redimensionnements
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
});

// ========== Performance: Précharger les pages importantes ==========
const prefetchImportantPages = () => {
    const links = document.querySelectorAll('a[href^="/"]');
    const prefetchLinks = Array.from(links).slice(0, 5); // Précharger les 5 premiers liens
    
    prefetchLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkElement = document.createElement('link');
        linkElement.rel = 'prefetch';
        linkElement.href = href;
        document.head.appendChild(linkElement);
    });
};

// Appeler le prefetch après le chargement complet
window.addEventListener('load', () => {
    setTimeout(prefetchImportantPages, 2000);
});

// ========== Export pour utilisation externe (si nécessaire) ==========
window.Blog123 = {
    showNotification,
    initMobileMenu,
    initSearch
};
