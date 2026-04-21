// Base de données des nouveautés

// Titres de romans
const titreksRomans = [
    "L'Homme qui Murmure", "Les Secrets du Silence", "Cœur Brisé", "Le Dernier Adieu", "Promesse Éternelle",
    "Voyage dans le Temps", "La Maison Hantée", "Amour et Trahison", "L'Île Mystérieuse", "Entre Deux Mondes",
    "Le Chemin du Retour", "Nuit Étoilée", "La Vie Secrète", "Destins Entrelacés", "Le Poids du Passé",
    "Aurore Nouvelle", "Tempête Intérieure", "Les Échos du Cœur", "Dans les Ténèbres", "Lumière d'Espoir",
    "Le Mensonge Parfait", "Confidences Nocturnes", "Rêves Oubliés", "La Vérité Cachée", "Le Jour de la Vengeance",
    "Sous les Étoiles", "Le Silence Brisé", "Chemins Croisés", "La Dernière Danse", "Voix du Passé",
    "Renaissance", "Le Puits des Souhaits", "Ombre et Lumière", "La Forêt Ancienne", "Monstre ou Héros",
    "Le Choix Difficile", "Âmes Perdues", "La Cicatrice Ineffaçable", "Rédemption", "Le Pont du Rêve",
    "Sables Mouvants", "La Prophétie Brisée", "Éternité Fugace", "Le Cri Silencieux", "Paradis Perdu",
    "Enfer et Ciel", "Le Tableau Vivant", "Symphonie Triste", "La Fin du Monde", "Nouveau Départ"
];

// Titres de développement
const titresDeveloppement = [
    "Python Avancé", "JavaScript Moderne", "React pour Experts", "TypeScript Complet", "Node.js Professionnel",
    "API RESTful", "Microservices", "Docker Mastery", "Kubernetes Essentials", "Cloud Computing",
    "Machine Learning", "Intelligence Artificielle", "Big Data", "Data Science", "Analytics",
    "DevOps Complet", "CI/CD Pipeline", "Git Avancé", "Linux Shell", "Web Security",
    "Cybersécurité", "Hacking Éthique", "Blockchain", "Crypto Assets", "Smart Contracts",
    "Vue.js Masterclass", "Angular Expert", "Svelte Advanced", "WebAssembly", "Progressive Web Apps",
    "GraphQL Avancé", "Next.js Complet", "Nuxt.js Expert", "Flutter Mobile", "Kotlin Android",
    "Swift iOS", "Java Enterprise", "C++ Modern", "Rust Systems", "Go Lang",
    "AWS Cloud", "Azure Cloud", "Google Cloud", "Serverless", "Container Orchestration",
    "Database Design", "SQL Avancé", "MongoDB", "PostgreSQL", "Redis Cache"
];

// Titres de jeunesse
const titresJeunesse = [
    "Les Aventures de Zoé", "L'École Magique", "Créatures Fantastiques", "Le Monde Caché", "Trésor Perdu",
    "L'Île aux Secrets", "Chevaliers et Dragons", "Châteaux Enchantés", "Princesse Rebelle", "Le Roi Lion",
    "Reine des Neiges", "Conte de Fées Moderne", "Héros Extraordinaires", "Sorciers Apprentis", "Le Portail",
    "Voyage Interstellaire", "Aliens Bienveillants", "Base Spatiale", "Vaisseau Fantôme", "Mission Spéciale",
    "Pirates des Mers", "Navire Volant", "Trésorier Marin", "Île Mystique", "Créature Légendaire",
    "Le Monstre Gentil", "Licornes Cachées", "Forêt Enchantée", "Elves Modernes", "Nains Courageux",
    "La Quête Sacrée", "Artefact Ancien", "Magie Perdue", "Sortilèges Puissants", "Mage Supreme",
    "L'Apprenti de Merlin", "Excalibur Retrouvée", "Chevalier de la Table Ronde", "Légende Arthurienne", "Graal Sacré",
    "Monde Parallèle", "Dimension Cachée", "Porte Interdite", "Clé Mystérieuse", "Énigme Éternelle",
    "Amitié Magique", "Courage Infini", "Destin Extraordinaire", "Rêves Vivants", "Lumière Éternelle"
];

// Auteurs variés
const auteurs = [
    "Marie Fontaine", "Jean Dupont", "Sophie Bernard", "Pierre Martin", "Isabelle Moreau",
    "François Lefevre", "Catherine Dubois", "Marc Rousseau", "Nathalie Petit", "Philippe Renard",
    "Valérie Laurent", "Claude Mercier", "Anna Garnier", "Olivier Lavigne", "Emma Richard"
];

// Fonction pour générer des nouvelles avec noms aléatoires
function genererNouvelles(titres, categorie, count = 50) {
    const nouvelles = [];
    const prix_base = categorie === 'developpement' ? 24.99 : (categorie === 'jeunesse' ? 12.99 : 15.99);
    const urlsExtraits = [
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    ];

    for (let i = 0; i < count; i++) {
        const titre = titres[i % titres.length];
        const auteur = auteurs[i % auteurs.length];
        const prix = (prix_base + (Math.random() * 20 - 10)).toFixed(2);
        const dureeMinutes = 360 + Math.floor(Math.random() * 840); // Entre 6h et 20h
        const heures = Math.floor(dureeMinutes / 60);
        const minutes = dureeMinutes % 60;

        nouvelles.push({
            id: `${categorie}-${i}`,
            titre: `${titre} - ${i + 1}`,
            auteur: auteur,
            prix: parseFloat(prix),
            categorie: categorie,
            duree: `${heures}h ${minutes}min`,
            description: `Nouvelle édition - Découvrez cette intrigante histoire`,
            emoji: categorie === 'developpement' ? '💻' : (categorie === 'jeunesse' ? '🎈' : '📖'),
            dateAjout: new Date(2026, 3, Math.floor(Math.random() * 14) + 1).toLocaleDateString('fr-FR'),
            extrait: urlsExtraits[i % urlsExtraits.length]
        });
    }

    return nouvelles;
}

// Générer les collections
const nouvellesRomans = genererNouvelles(titreksRomans, 'roman', 50);
const nouvellesDeveloppement = genererNouvelles(titresDeveloppement, 'developpement', 50);
const nouvellesJeunesse = genererNouvelles(titresJeunesse, 'jeunesse', 50);

// Toutes les nouvelles
const toutesLesNouvelles = [...nouvellesRomans, ...nouvellesDeveloppement, ...nouvellesJeunesse];

// État de la pagination
let etatPagination = {
    categorieActive: 'tous',
    pageActuelle: 1,
    itemsParPage: 10,
    donnees: toutesLesNouvelles
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    mettreAJourCompteurPanier();

    // Gestion du modal panier
    const modal = document.getElementById('panier-modal');
    const panierBtn = document.getElementById('panier-btn');
    const closeBtn = document.querySelector('.close');

    panierBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
        afficherPanier();
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Gestion des onglets
    document.querySelectorAll('.onglet-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.onglet-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const categorie = this.dataset.categorie;
            changerCategorie(categorie);
        });
    });

    // Affichage initial
    afficherNouvelles();
});

// Changer de catégorie
function changerCategorie(categorie) {
    etatPagination.categorieActive = categorie;
    etatPagination.pageActuelle = 1;

    // Mettre à jour les données
    if (categorie === 'tous') {
        etatPagination.donnees = toutesLesNouvelles;
    } else {
        etatPagination.donnees = toutesLesNouvelles.filter(n => n.categorie === categorie);
    }

    afficherNouvelles();
}

// Afficher les nouvelles
function afficherNouvelles() {
    const grid = document.getElementById('nouveaute-grid');
    grid.innerHTML = '';

    const debut = (etatPagination.pageActuelle - 1) * etatPagination.itemsParPage;
    const fin = debut + etatPagination.itemsParPage;
    const nouvellesAffichees = etatPagination.donnees.slice(debut, fin);

    nouvellesAffichees.forEach((nouvelle, index) => {
        const carte = document.createElement('div');
        carte.className = 'nouvelle-card';

        const couleurs = [
            { main: '#667eea', accent: '#764ba2' },
            { main: '#f093fb', accent: '#f5576c' },
            { main: '#4facfe', accent: '#00f2fe' },
            { main: '#43e97b', accent: '#38f9d7' },
            { main: '#fa709a', accent: '#fee140' },
            { main: '#30cfd0', accent: '#330867' },
            { main: '#a8edea', accent: '#fed6e3' },
            { main: '#ff9a56', accent: '#ff6a88' },
            { main: '#667eea', accent: '#764ba2' },
            { main: '#f093fb', accent: '#f5576c' }
        ];
        const couleur = couleurs[index % couleurs.length];

        carte.innerHTML = `
            <div class="nouvelle-couverture" style="background: linear-gradient(135deg, ${couleur.main} 0%, ${couleur.accent} 100%);">
                <div class="nouvelle-emoji">${nouvelle.emoji}</div>
                <div class="nouvelle-nouveau">🆕 NOUVEAU</div>
            </div>
            <div class="nouvelle-content">
                <div class="nouvelle-date">Ajouté: ${nouvelle.dateAjout}</div>
                <div class="nouvelle-titre">${nouvelle.titre}</div>
                <div class="nouvelle-auteur">par ${nouvelle.auteur}</div>
                <div class="nouvelle-categorie">${getCategorieLabel(nouvelle.categorie)}</div>
                <div class="nouvelle-description">${nouvelle.description}</div>
                <div class="nouvelle-duree">⏱️ ${nouvelle.duree}</div>
                <div class="nouvelle-prix">${nouvelle.prix.toFixed(2)}€</div>
                <div class="livre-extrait">
                    <label class="extrait-label">🎧 Écoutez un extrait:</label>
                    <audio class="extrait-audio" controls preload="none">
                        <source src="${nouvelle.extrait}" type="audio/mpeg">
                        Votre navigateur ne supporte pas l'élément audio.
                    </audio>
                </div>
                <button class="btn-ajouter" onclick="ajouterAuPanier('${nouvelle.id}', '${nouvelle.titre}', ${nouvelle.prix})">Ajouter au panier</button>
            </div>
        `;
        grid.appendChild(carte);
    });

    // Mettre à jour la pagination
    mettreAJourPagination();
}

// Mettre à jour la pagination
function mettreAJourPagination() {
    const totalPages = Math.ceil(etatPagination.donnees.length / etatPagination.itemsParPage);
    const debut = (etatPagination.pageActuelle - 1) * etatPagination.itemsParPage + 1;
    const fin = Math.min(etatPagination.pageActuelle * etatPagination.itemsParPage, etatPagination.donnees.length);

    // Info de pagination
    document.getElementById('pagination-info').textContent =
        `Affichage ${debut} à ${fin} sur ${etatPagination.donnees.length} nouveautés`;

    // Boutons précédent/suivant
    document.getElementById('prev-btn').disabled = etatPagination.pageActuelle === 1;
    document.getElementById('next-btn').disabled = etatPagination.pageActuelle === totalPages;

    // Numéros de pages
    const numbersDiv = document.getElementById('pagination-numbers');
    numbersDiv.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= etatPagination.pageActuelle - 1 && i <= etatPagination.pageActuelle + 1)) {
            if (i > 1 && (i === 3 && etatPagination.pageActuelle > 4)) {
                numbersDiv.innerHTML += '<span class="pagination-ellipsis">...</span>';
            }

            const btn = document.createElement('button');
            btn.className = `pagination-number ${i === etatPagination.pageActuelle ? 'active' : ''}`;
            btn.textContent = i;
            btn.onclick = () => allerPage(i);
            numbersDiv.appendChild(btn);

            if (i < totalPages - 1 && (i === etatPagination.pageActuelle + 1 && totalPages > etatPagination.pageActuelle + 3)) {
                numbersDiv.innerHTML += '<span class="pagination-ellipsis">...</span>';
            }
        }
    }
}

// Navigation pagination
function allerPage(pageNum) {
    etatPagination.pageActuelle = pageNum;
    afficherNouvelles();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function allerPagePrecedente() {
    if (etatPagination.pageActuelle > 1) {
        allerPage(etatPagination.pageActuelle - 1);
    }
}

function allerPageSuivante() {
    const totalPages = Math.ceil(etatPagination.donnees.length / etatPagination.itemsParPage);
    if (etatPagination.pageActuelle < totalPages) {
        allerPage(etatPagination.pageActuelle + 1);
    }
}

// Ajouter au panier (fonction personnalisée pour ne pas collisionner)
function ajouterAuPanier(livreId, titre, prix) {
    const itemExistant = panier.find(item => item.id === livreId);

    if (itemExistant) {
        itemExistant.quantite += 1;
    } else {
        panier.push({
            id: livreId,
            titre: titre,
            prix: prix,
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

