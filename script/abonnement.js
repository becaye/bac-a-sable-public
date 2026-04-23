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
    if (v2) {
        // ARIA disclosure pattern (v2)
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                const answerId = this.getAttribute('aria-controls');
                const answer = document.getElementById(answerId);
                const toggle = this.querySelector('.faq-toggle');

                // Fermer les autres reponses
                document.querySelectorAll('.faq-question').forEach(btn => {
                    if (btn !== this && btn.getAttribute('aria-expanded') === 'true') {
                        btn.setAttribute('aria-expanded', 'false');
                        btn.querySelector('.faq-toggle').textContent = '+';
                        const otherAnswerId = btn.getAttribute('aria-controls');
                        document.getElementById(otherAnswerId).hidden = true;
                    }
                });

                // Basculer la reponse actuelle
                this.setAttribute('aria-expanded', !isExpanded);
                toggle.textContent = isExpanded ? '+' : '−';
                answer.hidden = isExpanded;
            });
        });
    } else {
        // Ancien fonctionnement (pas v2) - structure div/div/div sans ARIA
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                // Trouver la reponse avec nextElementSibling (ancien HTML structure)
                const answer = this.nextElementSibling;
                const toggle = this.querySelector('.faq-toggle');

                // Fermer les autres reponses
                document.querySelectorAll('.faq-question').forEach(btn => {
                    if (btn !== this) {
                        const otherAnswer = btn.nextElementSibling;
                        if (otherAnswer) {
                            otherAnswer.style.display = 'none';
                            btn.querySelector('.faq-toggle').textContent = '+';
                        }
                    }
                });

                // Basculer la reponse actuelle
                if (answer) {
                    if (answer.style.display === 'none' || !answer.style.display) {
                        answer.style.display = 'block';
                        toggle.textContent = '−';
                    } else {
                        answer.style.display = 'none';
                        toggle.textContent = '+';
                    }
                }
            });
        });
    }
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

