// Logique spécifique pour la page d'abonnement

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

    // Gestion des questions FAQ
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');

            // Fermer les autres réponses
            document.querySelectorAll('.faq-answer').forEach(ans => {
                if (ans !== answer) {
                    ans.style.display = 'none';
                    ans.previousElementSibling.querySelector('.faq-toggle').textContent = '+';
                }
            });

            // Basculer la réponse actuelle
            if (answer.style.display === 'none' || !answer.style.display) {
                answer.style.display = 'block';
                toggle.textContent = '−';
            } else {
                answer.style.display = 'none';
                toggle.textContent = '+';
            }
        });
    });
});

// Fonction pour souscrire à un abonnement
function souscrire(formule) {
    const utilisateurConnecte = localStorage.getItem('utilisateur-connecte');

    if (!utilisateurConnecte) {
        // Rediriger vers la page de compte si pas connecté
        alert(`Vous avez choisi: ${formule}\n\nVeuillez d'abord créer un compte ou vous connecter.`);
        window.location.href = 'compte.html';
        return;
    }

    // Afficher une confirmation
    alert(`Abonnement ${formule} en cours de traitement...\n\nVous serez redirigé vers la page de paiement.`);

    // Enregistrer l'abonnement choisi
    localStorage.setItem('abonnement-choisi', formule);

    // Simuler un redirection vers un formulaire de paiement
    console.log(`Abonnement ${formule} choisi`);
}

