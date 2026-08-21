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

        const prenomInput = document.getElementById('prenom');
        const nomInput = document.getElementById('nom');
        const emailInput = document.getElementById('email');
        const telephoneInput = document.getElementById('telephone');
        const adresseInput = document.getElementById('adresse');
        const codepostalInput = document.getElementById('codepostal');
        const villeInput = document.getElementById('ville');
        const motdepasseInput = document.getElementById('motdepasse');
        const confirmerInput = document.getElementById('confirmer-motdepasse');
        const conditionsInput = document.getElementById('conditions');

        const prenom = prenomInput.value.trim();
        const nom = nomInput.value.trim();
        const email = emailInput.value.trim();
        const telephone = telephoneInput.value.trim();
        const adresse = adresseInput.value.trim();
        const codepostal = codepostalInput ? codepostalInput.value.trim() : '';
        const ville = villeInput ? villeInput.value.trim() : '';
        const motdepasse = motdepasseInput.value;
        const confirmerMotdepasse = confirmerInput.value;
        const conditions = conditionsInput.checked;

        if (v1) {
            let isValid = true;
            let firstInvalidInput = null;

            const champsTexte = [
                { input: prenomInput, error: document.getElementById('prenom-error'), value: prenom, message: 'Vous devez indiquer votre prénom.' },
                { input: nomInput, error: document.getElementById('nom-error'), value: nom, message: 'Vous devez indiquer votre nom.' },
                { input: adresseInput, error: document.getElementById('adresse-error'), value: adresse, message: 'Vous devez indiquer votre adresse.' },
                { input: codepostalInput, error: document.getElementById('codepostal-error'), value: codepostal, message: 'Vous devez indiquer votre code postal.' },
                { input: villeInput, error: document.getElementById('ville-error'), value: ville, message: 'Vous devez indiquer votre ville.' },
                { input: telephoneInput, error: document.getElementById('telephone-error'), value: telephone, message: 'Vous devez indiquer votre téléphone.' }
            ];

            champsTexte.forEach(champ => {
                if (champ.value === '') {
                    showError(champ.input, champ.error, champ.message);
                    isValid = false;
                    firstInvalidInput = firstInvalidInput || champ.input;
                } else {
                    hideError(champ.input, champ.error);
                }
            });

            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                showError(emailInput, emailError, 'Vous devez indiquer votre adresse e-mail.');
                isValid = false;
                firstInvalidInput = firstInvalidInput || emailInput;
            } else if (!emailRegex.test(email)) {
                showError(emailInput, emailError, 'Adresse e-mail invalide. Exemple : nom@domaine.fr');
                isValid = false;
                firstInvalidInput = firstInvalidInput || emailInput;
            } else if (utilisateurs.some(u => u.email === email)) {
                showError(emailInput, emailError, 'Cette adresse e-mail est déjà utilisée.');
                isValid = false;
                firstInvalidInput = firstInvalidInput || emailInput;
            } else {
                hideError(emailInput, emailError);
            }

            const motdepasseError = document.getElementById('motdepasse-error');
            if (motdepasse === '') {
                showError(motdepasseInput, motdepasseError, 'Vous devez indiquer votre mot de passe.');
                isValid = false;
                firstInvalidInput = firstInvalidInput || motdepasseInput;
            } else if (motdepasse.length < 6) {
                showError(motdepasseInput, motdepasseError, 'Votre mot de passe doit contenir au moins 6 caractères.');
                isValid = false;
                firstInvalidInput = firstInvalidInput || motdepasseInput;
            } else {
                hideError(motdepasseInput, motdepasseError);
            }

            const confirmerError = document.getElementById('confirmer-motdepasse-error');
            if (confirmerMotdepasse === '') {
                showError(confirmerInput, confirmerError, 'Vous devez confirmer votre mot de passe.');
                isValid = false;
                firstInvalidInput = firstInvalidInput || confirmerInput;
            } else if (confirmerMotdepasse !== motdepasse) {
                showError(confirmerInput, confirmerError, 'Les mots de passe ne correspondent pas.');
                isValid = false;
                firstInvalidInput = firstInvalidInput || confirmerInput;
            } else {
                hideError(confirmerInput, confirmerError);
            }

            const conditionsError = document.getElementById('conditions-error');
            if (!conditions) {
                showError(conditionsInput, conditionsError, 'Vous devez accepter les conditions d\'utilisation.');
                isValid = false;
                firstInvalidInput = firstInvalidInput || conditionsInput;
            } else {
                hideError(conditionsInput, conditionsError);
            }

            if (!isValid) {
                if (firstInvalidInput) {
                    firstInvalidInput.focus();
                }
                return;
            }
        } else {
            // Validation v0 volontairement non accessible (alertes bloquantes)
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

            if (utilisateurs.some(u => u.email === email)) {
                alert('Cet email est déjà utilisé!');
                return;
            }
        }

        // Créer un nouvel utilisateur
        const nouvelUtilisateur = {
            id: Date.now(),
            prenom,
            nom,
            email,
            telephone,
            adresse,
            codepostal,
            ville,
            motdepasse, // À ne pas faire en production!
            dateCreation: new Date().toLocaleDateString('fr-FR')
        };

        utilisateurs.push(nouvelUtilisateur);
        sauvegarderUtilisateurs();

        // Afficher le message de confirmation
        document.getElementById('inscription-form').style.display = 'none';
        const confirmation = document.getElementById('inscription-message');
        confirmation.style.display = 'block';

        if (v1) {
            // restitue la confirmation à tous les utilisateurs, sans redirection automatique
            confirmation.focus({ preventScroll: true });
            confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            setTimeout(() => {
                window.location.href = 'accueil.html';
            }, 2500);
        }
    });
});


