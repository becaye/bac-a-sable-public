// Logique du sondage

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

    // Gestion du formulaire de sondage
    const sondageForm = document.getElementById('sondage-form');
    
    sondageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        soumettresondage();
    });

    // Suivi de la barre de progression en temps réel
    const inputsRequired = sondageForm.querySelectorAll('input[required], textarea[required]');
    
    inputsRequired.forEach(input => {
        input.addEventListener('change', mettreAJourProgression);
    });

    mettreAJourProgression();
});

// Mettre à jour la barre de progression
function mettreAJourProgression() {
    const sondageForm = document.getElementById('sondage-form');
    const questions = sondageForm.querySelectorAll('.sondage-question');
    let questionsRepondues = 0;

    // Vérifier q1 (nécessaire)
    if (sondageForm.q1.value) questionsRepondues++;
    
    // Vérifier q2 (nécessaire)
    if (sondageForm.q2.value) questionsRepondues++;
    
    // Vérifier q3 (nécessaire)
    if (sondageForm.q3.value) questionsRepondues++;
    
    // Vérifier q4 (nécessaire)
    if (sondageForm.q4.value) questionsRepondues++;
    
    // Vérifier q5 (nécessaire)
    if (sondageForm.q5.value) questionsRepondues++;
    
    // Vérifier q6 (nécessaire)
    if (sondageForm.q6.value) questionsRepondues++;
    
    // Vérifier q7 (au moins un checkbox coché)
    const q7Checked = sondageForm.querySelectorAll('input[name="q7"]:checked').length > 0;
    if (q7Checked) questionsRepondues++;
    
    // Q8 optionnel mais compté
    questionsRepondues++;
    
    // Q9 optionnel mais compté
    questionsRepondues++;
    
    // Vérifier q10 (nécessaire)
    if (sondageForm.q10.value) questionsRepondues++;

    const pourcentage = (questionsRepondues / 10) * 100;
    document.getElementById('progress-fill').style.width = pourcentage + '%';
    document.getElementById('question-count').textContent = questionsRepondues;
}

// Soumettre le sondage
function soumettresondage() {
    const sondageForm = document.getElementById('sondage-form');
    
    // Collecter toutes les réponses
    const sondage = {
        id: Date.now(),
        timestamp: new Date().toLocaleString('fr-FR'),
        q1: sondageForm.q1.value,
        q2: sondageForm.q2.value,
        q3: sondageForm.q3.value,
        q4: sondageForm.q4.value,
        q5: sondageForm.q5.value,
        q6: sondageForm.q6.value,
        q7: getCheckboxValues('q7'),
        q8: sondageForm.q8.value,
        q9: sondageForm.q9.value,
        q10: sondageForm.q10.value
    };

    // Stocker les sondages en localStorage
    let sondages = JSON.parse(localStorage.getItem('sondages')) || [];
    sondages.push(sondage);
    localStorage.setItem('sondages', JSON.stringify(sondages));

    // Afficher le message de confirmation
    document.getElementById('sondage-form-container').style.display = 'none';
    document.getElementById('sondage-confirmation').style.display = 'block';

    // Log pour vérification
    console.log('Sondage soumis:', sondage);
}

// Récupérer les valeurs des checkboxes
function getCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

// Retourner à l'accueil
function retournerAccueil() {
    window.location.href = 'accueil.html';
}

