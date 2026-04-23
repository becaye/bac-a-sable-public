# AudioBooks - Site de Test en Accessibilité Web

## Description

Ce projet est un **site de test éducatif** dédié à l'apprentissage et à la démonstration des pratiques d'accessibilité web. Il présente une plateforme fictive de vente de livres audio et propose deux versions distinctes pour comparaison et analyse.

### Objectifs Éducatifs

- Sensibiliser aux enjeux de l'accessibilité web
- Comparer les bonnes et mauvaises pratiques d'accessibilité
- Fournir une base d'étude pour les développeurs et designers
- Démontrer l'importance de l'accessibilité dans les interfaces utilisateur

## Structure du Projet

```
bac-a-sable-public/
├── index.html                 # Page d'accueil principale
├── annulaire.html            # Page supplémentaire (annulaire)
├── styles.css                # Feuille de styles principale
├── favicon-poo.svg           # Favicon du site
├── script/                   # Scripts JavaScript
│   ├── script.js            # Script principal
│   ├── abonnement.js        # Gestion des abonnements
│   ├── compte.js            # Gestion des comptes utilisateur
│   ├── nouveaute.js         # Section nouveautés
│   └── sondage.js           # Sondages
├── v0/                       # Version 0 (avec défauts d'accessibilité)
│   ├── abonnement.html
│   ├── compte.html
│   ├── nouveaute.html
│   └── sondage.html
└── v1/                       # Version 1 (corrigée pour l'accessibilité)
    ├── abonnement.html
    ├── compte.html
    ├── nouveaute.html
    └── sondage.html
```

## Fonctionnalités

### Page d'Accueil
- Navigation responsive avec menu
- Carousel des meilleures ventes
- Catalogue de livres audio filtrables
- Section actualités
- Panier d'achat
- Formulaire de contact
- Liens vers les réseaux sociaux

### Pages Supplémentaires
- **Abonnements** : Plans d'abonnement et tarification
- **Compte** : Espace utilisateur et inscription
- **Nouveautés** : Présentation des nouveaux titres
- **Sondage** : Sondages interactifs pour les utilisateurs

## Versioning

### Version 0 (v0)
- Implémentation de base du site
- Contient des défauts d'accessibilité intentionnels
- À utiliser comme référence pour identifier les problèmes

### Version 1 (v1)
- Version améliorée avec corrections d'accessibilité
- Implémente les bonnes pratiques WCAG
- À utiliser comme exemple de site accessible

## Contributeurs

- **David Galantin** : Développement initial
- **François-Xavier Lair** : Travail sur l'accessibilité
- **Henri Gauffriau** : Travail sur l'accessibilité

## Utilisation

1. Ouvrez `index.html` dans votre navigateur pour accéder à la page d'accueil
2. Naviguez vers les pages v0 ou v1 pour comparer les deux versions
3. Utilisez les outils de développement de votre navigateur pour analyser le code
4. Testez avec des outils d'accessibilité comme :
   - axe DevTools
   - WAVE (WebAIM)
   - Lighthouse (Chrome)
   - NVDA (lecteur d'écran gratuit)

## Aspects d'Accessibilité à Étudier

- **Contraste des couleurs** : Vérification des ratios de contraste WCAG
- **Navigation au clavier** : Support complet de la navigation
- **Labels et descriptions** : Associations appropriées des éléments
- **Hiérarchie sémantique** : Utilisation correcte des balises HTML
- **Textes alternatifs** : Descriptions pour les images
- **Formulaires accessibles** : Validation et message d'erreur
- **Lecteurs d'écran** : Compatibilité avec les technologies d'assistance

## Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styling et layouts responsifs
- **JavaScript (ES6+)** : Interactivité et gestion dynamique
- **SVG** : Icônes et éléments graphiques vectoriels

## Ressources Recommandées

- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Web Docs - Accessibilité](https://developer.mozilla.org/fr/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)

## Licence

Ce projet est destiné à des fins éducatives.

---

**Version** : 1.0  
**Dernière mise à jour** : Avril 2026

