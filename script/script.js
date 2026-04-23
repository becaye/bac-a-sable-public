// Base de données de livres audio
const livres = [
    {
        id: 1,
        titre: "Le Seigneur des Anneaux",
        auteur: "J.R.R. Tolkien",
        prix: 19.99,
        categorie: "jeunesse",
        duree: "42h 30min",
        description: "L'épopée fantasy classique",
        emoji: "💍",
        extrait: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        titre: "1984",
        auteur: "George Orwell",
        prix: 14.99,
        categorie: "roman",
        duree: "13h 15min",
        description: "Un roman dystopique captivant",
        emoji: "📚",
        extrait: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        titre: "Clean Code",
        auteur: "Robert C. Martin",
        prix: 29.99,
        categorie: "developpement",
        duree: "16h 45min",
        description: "Guide complet pour coder proprement",
        emoji: "💻",
        extrait: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        id: 4,
        titre: "Harry Potter à l'école des sorciers",
        auteur: "J.K. Rowling",
        prix: 16.99,
        categorie: "jeunesse",
        duree: "18h 20min",
        description: "Le début d'une saga magique",
        emoji: "🪄",
        extrait: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        id: 5,
        titre: "Le Hobbit",
        auteur: "J.R.R. Tolkien",
        prix: 15.99,
        categorie: "jeunesse",
        duree: "12h 45min",
        description: "Une aventure fantastique inoubliable",
        emoji: "🏔️",
        extrait: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        id: 6,
        titre: "Python pour les débutants",
        auteur: "Mark Lutz",
        prix: 24.99,
        categorie: "developpement",
        duree: "22h 10min",
        description: "Apprenez Python depuis le départ",
        emoji: "🐍",
        extrait: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    {
        id: 7,
        titre: "Fondation",
        auteur: "Isaac Asimov",
        prix: 17.99,
        categorie: "roman",
        duree: "15h 30min",
        description: "Une saga de science-fiction épique",
        emoji: "🚀",
        extrait: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    {
        id: 8,
        titre: "JavaScript: Le Bon Parti",
        auteur: "Douglas Crockford",
        prix: 22.99,
        categorie: "developpement",
        duree: "14h 20min",
        description: "Maîtrisez les bonnes pratiques JavaScript",
        emoji: "⚡",
        extrait: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    }
];

// Panier
let panier = JSON.parse(localStorage.getItem('panier')) || [];

// Utilisateurs
let utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];

// Détection v2 (v2 ou annulaire.html)
const v2 = window.location.href.includes('v2') || window.location.pathname.includes('annulaire.html');

// Validation du formulaire de contact (globale)
function validateContactForm() {
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Validation nom
    const nomError = document.getElementById('nom-error');
    const nomInput = document.getElementById('nom');
    if (nom === '') {
        showError(nomInput, nomError, 'Ce champ est obligatoire');
        isValid = false;
    } else {
        hideError(nomInput, nomError);
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById('email-error');
    const emailInput = document.getElementById('email');
    if (email === '') {
        showError(emailInput, emailError, 'Ce champ est obligatoire');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError(emailInput, emailError, 'Veuillez entrer une adresse email valide');
        isValid = false;
    } else {
        hideError(emailInput, emailError);
    }
    
    // Validation message
    const messageError = document.getElementById('message-error');
    const messageInput = document.getElementById('message');
    if (message === '') {
        showError(messageInput, messageError, 'Ce champ est obligatoire');
        isValid = false;
    } else if (message.length < 10) {
        showError(messageInput, messageError, 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    } else if (message.length > 500) {
        showError(messageInput, messageError, 'Le message ne peut pas dépasser 500 caractères');
        isValid = false;
    } else {
        hideError(messageInput, messageError);
    }
    
    // Si valide, soumettre
    if (isValid) {
        const contactForm = document.getElementById('contact-form');
        const confirmation = document.getElementById('message-confirmation');
        if (confirmation) {
            confirmation.style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                confirmation.style.display = 'none';
            }, 3000);
        }
    }
}

function showError(input, errorDiv, message) {
    input.classList.add('input-error');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

function hideError(input, errorDiv) {
    input.classList.remove('input-error');
    errorDiv.textContent = '';
    errorDiv.classList.remove('show');
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Burger Menu Mobile - Doit fonctionner sur toutes les pages
    initBurgerMenu();

    // Le reste du code ne s'exécute que sur la page d'accueil
    const livresGrid = document.getElementById('livres-grid');
    if (livresGrid) {
        afficherLivres('tous');
        mettreAJourCompteurPanier();
        if (shouldSyncAriaPressedOnCurrentPage()) {
            syncFiltreAriaPressed();
        }

        // Event listeners
        document.querySelectorAll('.filtre-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filtre-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                if (shouldSyncAriaPressedOnCurrentPage()) {
                    syncFiltreAriaPressed();
                }
                afficherLivres(this.dataset.filtre);
            });
        });

        // Initialiser le carousel des meilleures ventes
        initCarousel();
    }

    // Gestion du modal panier (sur toutes les pages)
    const modal = document.getElementById('panier-modal');
    const panierBtn = document.getElementById('panier-btn');
    const closeBtn = document.querySelector('.close');

    if (panierBtn) {
        panierBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (modal) {
                modal.classList.add('active');
                afficherPanier();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (modal) {
                modal.classList.remove('active');
            }
        });
    }

    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Listeners pour nettoyer les erreurs au fur et à mesure
    document.getElementById('nom')?.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            hideError(this, document.getElementById('nom-error'));
        }
    });
    
    document.getElementById('email')?.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            hideError(this, document.getElementById('email-error'));
        }
    });
    
    document.getElementById('message')?.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            hideError(this, document.getElementById('message-error'));
        }
    });

    // Navigation active
    document.querySelectorAll('nav a, .hero button').forEach(link => {
        if (link.getAttribute('href')) {
            link.addEventListener('click', function() {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                if (!this.classList.contains('panier-btn')) {
                     this.classList.add('active');
                 }
            });
        }
    });
});

function shouldSyncAriaPressedOnCurrentPage() {
    const path = window.location.pathname;
    return path.endsWith('/annulaire.html') || path.includes('/v1/');
}

function syncFiltreAriaPressed() {
    if (!shouldSyncAriaPressedOnCurrentPage()) {
        return;
    }

    document.querySelectorAll('.filtre-btn').forEach(btn => {
        const isActive = btn.classList.contains('active');
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}

// Initialiser le Burger Menu
function initBurgerMenu() {
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');

    if (burgerMenu && navLinks) {
        // Toggle menu au clic sur le burger
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fermer le menu quand un lien est cliqué
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function(event) {
            if (navLinks.classList.contains('active')) {
                const isClickInsideNav = navLinks.contains(event.target);
                const isClickInsideBurger = burgerMenu.contains(event.target);

                if (!isClickInsideNav && !isClickInsideBurger) {
                    burgerMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    }
}

// Afficher les livres selon le filtre
function afficherLivres(filtre) {
    const grid = document.getElementById('livres-grid');
    
    grid.innerHTML = '';

    const path = window.location.pathname;
    const useAccessibleDuree = path.endsWith('/annulaire.html') || path.includes('/v1/');

    const livresFiltres = filtre === 'tous' ? livres : livres.filter(l => l.categorie === filtre);

    livresFiltres.forEach((livre, index) => {
        let carte;
        if(v2) 
              carte = document.createElement('li');
        else
            carte = document.createElement('div');
       
        carte.className = 'livre-card';
        const couleurs = [
            { main: '#667eea', accent: '#764ba2' },
            { main: '#f093fb', accent: '#f5576c' },
            { main: '#4facfe', accent: '#00f2fe' },
            { main: '#43e97b', accent: '#38f9d7' },
            { main: '#fa709a', accent: '#fee140' },
            { main: '#30cfd0', accent: '#330867' },
            { main: '#a8edea', accent: '#fed6e3' },
            { main: '#ff9a56', accent: '#ff6a88' }
        ];
        const couleur = couleurs[index % couleurs.length];

        carte.innerHTML = `
            <div class="livre-couverture" style="background: linear-gradient(135deg, ${couleur.main} 0%, ${couleur.accent} 100%);">
                <div class="livre-emoji" aria-hidden="true">${livre.emoji}</div>
                <div class="livre-couverture-content">
                    <div class="livre-couverture-titre">${livre.titre}</div>
                    <div class="livre-couverture-auteur">${livre.auteur}</div>
                </div>
            </div>
            <div class="livre-content">
                <h3 class="livre-titre">${livre.titre}</h3>
                <div class="livre-auteur">par ${livre.auteur}</div>
                <div class="livre-categorie">${getCategorieLabel(livre.categorie)}</div>
                <div class="livre-description">${livre.description}</div>
                <div class="livre-duree">${useAccessibleDuree ? `<span aria-hidden="true">⏱️</span><span class="sr-only">Durée</span>` : '⏱️'} ${livre.duree}</div>
                <div class="livre-prix">${livre.prix.toFixed(2)}€</div>
                <button class="btn-ajouter" onclick="ajouterAuPanier(${livre.id})">Ajouter au panier</button>
            </div>
        `;
        grid.appendChild(carte);
    });
}

// Catégories
function getCategorieLabel(categ) {
    const categories = {
        'roman': 'Roman',
        'developpement': 'Développement',
        'jeunesse': 'Jeunesse'
    };
    return categories[categ] || categ;
}

// Ajouter au panier
function ajouterAuPanier(livreId) {
    const livre = livres.find(l => l.id === livreId);
    const itemExistant = panier.find(item => item.id === livreId);

    if (itemExistant) {
        itemExistant.quantite += 1;
    } else {
        panier.push({
            id: livre.id,
            titre: livre.titre,
            prix: livre.prix,
            quantite: 1
        });
    }

    sauvegarderPanier();
    mettreAJourCompteurPanier();

    // Feedback visuel
    event.target.textContent = '✓ Ajouté';
    event.target.classList.add('ajoute');
    setTimeout(() => {
        event.target.textContent = 'Ajouter au panier';
        event.target.classList.remove('ajoute');
    }, 1500);
}

// Afficher le panier
function afficherPanier() {
    const panierDiv = document.getElementById('panier-items');

    if (panier.length === 0) {
        panierDiv.innerHTML = '<div class="panier-vide">Votre panier est vide</div>';
        document.getElementById('total').textContent = '0,00';
        return;
    }

    let html = '';
    let total = 0;

    panier.forEach(item => {
        const sousTotal = item.prix * item.quantite;
        total += sousTotal;
        html += `
            <div class="panier-item">
                <div class="panier-item-info">
                    <div class="panier-item-titre">${item.titre}</div>
                    <div style="font-size: 12px; color: #666;">
                        ${item.prix.toFixed(2)}€ x ${item.quantite}
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="panier-item-prix">${sousTotal.toFixed(2)}€</span>
                    <button class="panier-item-remove" onclick="retirerDuPanier(${item.id})">×</button>
                </div>
            </div>
        `;
    });

    panierDiv.innerHTML = html;
    document.getElementById('total').textContent = total.toFixed(2);
}

// Retirer du panier
function retirerDuPanier(livreId) {
    panier = panier.filter(item => item.id !== livreId);
    sauvegarderPanier();
    mettreAJourCompteurPanier();
    afficherPanier();
}

// Mettre à jour le compteur
function mettreAJourCompteurPanier() {
    const totalItems = panier.reduce((sum, item) => sum + item.quantite, 0);
    document.getElementById('panier-count').textContent = totalItems;
}

// Sauvegarder le panier
function sauvegarderPanier() {
    localStorage.setItem('panier', JSON.stringify(panier));
}

// Commander
function commander() {
    if (panier.length === 0) {
        alert('Votre panier est vide!');
        return;
    }

    const total = panier.reduce((sum, item) => sum + (item.prix * item.quantite), 0);

    alert(`Merci pour votre commande!\n\nTotal: ${total.toFixed(2)}€\n\nVous recevrez bientôt un email de confirmation.`);

    panier = [];
    sauvegarderPanier();
    mettreAJourCompteurPanier();
    afficherPanier();
    document.getElementById('panier-modal').classList.remove('active');
}

// Sauvegarder les utilisateurs
function sauvegarderUtilisateurs() {
    localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
}

// ===== CAROUSEL MEILLEURES VENTES =====

// Les meilleures ventes sont les 5 premiers livres
const meilleuresVentes = livres.slice(0, 5);
let currentSlide = 0;

// Initialiser le carousel
function initCarousel() {
    if (meilleuresVentes.length === 0) return;

    const carousel = document.getElementById('carousel');
    const dotsContainer = document.getElementById('carousel-dots');

    if (!carousel || !dotsContainer) return;

    // Créer les slides
    carousel.innerHTML = '';
    meilleuresVentes.forEach((livre, index) => {
        const couleurs = [
            { main: '#667eea', accent: '#764ba2' },
            { main: '#f093fb', accent: '#f5576c' },
            { main: '#4facfe', accent: '#00f2fe' },
            { main: '#43e97b', accent: '#38f9d7' },
            { main: '#fa709a', accent: '#fee140' }
        ];
        const couleur = couleurs[index % couleurs.length];
        const background = `linear-gradient(135deg, ${couleur.main} 0%, ${couleur.accent} 100%)`;

        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.background = background;
        slide.innerHTML = `
            <div class="carousel-slide-image">${livre.emoji}</div>
            <div class="carousel-slide-content">
                <div class="carousel-slide-title">${livre.titre}</div>
                <div class="carousel-slide-author">par ${livre.auteur}</div>
                <div class="carousel-slide-description">${livre.description}</div>
                <div class="carousel-slide-details">
                    <div class="carousel-slide-detail">
                        <div class="carousel-slide-detail-label">Durée</div>
                        <div class="carousel-slide-detail-value">${livre.duree}</div>
                    </div>
                    <div class="carousel-slide-detail">
                        <div class="carousel-slide-detail-label">Catégorie</div>
                        <div class="carousel-slide-detail-value">${getCategorieLabel(livre.categorie)}</div>
                    </div>
                </div>
                <div class="carousel-slide-price">${livre.prix.toFixed(2)}€</div>
                <button class="carousel-btn-add" onclick="ajouterAuPanier(${livre.id}, 'carousel')">🛒 Ajouter au Panier</button>
            </div>
        `;
        carousel.appendChild(slide);
    });

    // Créer les dots
    dotsContainer.innerHTML = '';
    meilleuresVentes.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });

    updateCarousel();
}

// Mettre à jour le carousel
function updateCarousel() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;

    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Mettre à jour les dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Aller à une slide spécifique
function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Slide suivant
function nextSlide() {
    currentSlide = (currentSlide + 1) % meilleuresVentes.length;
    updateCarousel();
}

// Slide précédent
function prevSlide() {
    currentSlide = (currentSlide - 1 + meilleuresVentes.length) % meilleuresVentes.length;
    updateCarousel();
}
