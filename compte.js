// Logique spécifique pour la page de compte

document.addEventListener('DOMContentLoaded', function() {
    mettreAJourCompteurPanier();

    // Gestion du modal panier
    const modal = document.getElementById('panier-modal');
    const panierBtn = document.getElementById('panier-btn');
    const closeBtns = document.querySelectorAll('.close');

    panierBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
        afficherPanier();
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Formulaire d'inscription
    document.getElementById('inscription-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const prenom = document.getElementById('prenom').value;
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const telephone = document.getElementById('telephone').value;
        const adresse = document.getElementById('adresse').value;
        const motdepasse = document.getElementById('motdepasse').value;
        const confirmerMotdepasse = document.getElementById('confirmer-motdepasse').value;
        const conditions = document.getElementById('conditions').checked;

        // Validation
        if (motdepasse !== confirmerMotdepasse) {
            alert('Les mots de passe ne correspondent pas!');
            return;
        }

        if (motdepasse.length < 6) {
            alert('Le mot de passe doit contenir au moins 6 caractères!');
            return;
        }

        if (!conditions) {
            alert('Vous devez accepter les conditions d\'utilisation!');
            return;
        }

        // Vérifier si l'email existe
        if (utilisateurs.find(u => u.email === email)) {
            alert('Cet email est déjà utilisé!');
            return;
        }

        // Créer un nouvel utilisateur
        const nouvelUtilisateur = {
            id: Date.now(),
            prenom,
            nom,
            email,
            telephone,
            adresse,
            motdepasse, // À ne pas faire en production!
            dateCreation: new Date().toLocaleDateString('fr-FR')
        };

        utilisateurs.push(nouvelUtilisateur);
        sauvegarderUtilisateurs();

        // Afficher le message de confirmation
        document.getElementById('inscription-form').style.display = 'none';
        document.getElementById('inscription-message').style.display = 'block';

        setTimeout(() => {
            window.location.href = 'accueil.html';
        }, 2500);
    });
});
