# 🧪 Guide des Tests - Projet Kasa

## 📋 Configuration

Ce projet utilise **Jest** et **React Testing Library** pour les tests, basé sur les méthodes d'[OpenClassrooms](https://openclassrooms.com/fr/courses/7150606-creez-une-application-react-complete/7256627-decouvrez-la-base-des-tests-dans-react-avec-jest).

## 🚀 Commandes de Test

```bash
# Lancer tous les tests
npm test

# Lancer les tests en mode watch (re-exécution automatique)
npm run test:watch

# Lancer les tests avec rapport de couverture
npm run test:coverage
```

## 📁 Structure des Tests

```
src/
├── components/
│   └── __tests__/
│       ├── ThumbCard.test.jsx
│       ├── Tag.test.jsx
│       ├── ApartmentDropdown.test.jsx
│       └── Navigation.test.jsx
├── pages/
│   └── __tests__/
│       ├── Home.test.jsx
│       └── AccommodationDetail.test.jsx
├── utils/
│   └── __tests__/
│       └── testUtils.js
├── App.test.jsx
└── setupTests.js
```

## 🎯 Types de Tests Implémentés

### 1. **Tests de Composants**
- **ThumbCard** : Rendu, navigation, classes CSS
- **Tag** : Affichage du texte, gestion des noms longs
- **ApartmentDropdown** : Ouverture/fermeture, affichage des équipements
- **Navigation** : Liens, logo cliquable, attributs href

### 2. **Tests de Pages**
- **Home** : Chargement, affichage des cartes, gestion des erreurs API
- **AccommodationDetail** : Carrousel, détails, navigation, gestion 404

### 3. **Tests d'Intégration**
- **App** : Navigation globale, footer, routage

## 🔧 Méthodes de Test Utilisées

### **React Testing Library**
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
```

### **Jest Matchers**
```javascript
// Vérifications de base
expect(element).toBeInTheDocument();
expect(element).toHaveTextContent('Texte');
expect(element).toHaveAttribute('href', '/path');

// Vérifications d'événements
expect(mockFunction).toHaveBeenCalled();
expect(mockFunction).toHaveBeenCalledWith('argument');
```

### **Mocks et Utilitaires**
```javascript
// Mock de fetch
global.fetch = jest.fn(() => Promise.resolve({...}));

// Wrapper avec Router
const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);
```

## 📊 Couverture de Code

Le projet est configuré pour maintenir une couverture de **70%** minimum :
- Branches : 70%
- Fonctions : 70%
- Lignes : 70%
- Statements : 70%

## 🎨 Bonnes Pratiques Appliquées

### **1. Tests Isolés**
- Chaque test est indépendant
- Mocks appropriés pour les dépendances externes
- Nettoyage après chaque test

### **2. Tests Significatifs**
- Tests basés sur le comportement utilisateur
- Vérification des interactions réelles
- Tests de cas d'erreur

### **3. Structure Claire**
- Nommage descriptif des tests
- Groupement logique avec `describe`
- Utilisation d'utilitaires réutilisables

## 🐛 Tests de Régression

Les tests couvrent les corrections apportées :
- ✅ Tags ne débordent plus du conteneur
- ✅ Navigation conditionnelle (soulignement actif)
- ✅ Logo cliquable partout
- ✅ Carrousel avec flèches chevron
- ✅ Responsive design

## 🚀 Exécution des Tests

### **Mode Développement**
```bash
npm run test:watch
```
- Re-exécution automatique lors des modifications
- Interface interactive pour filtrer les tests

### **Mode CI/CD**
```bash
npm test
```
- Exécution unique
- Rapport de succès/échec
- Idéal pour l'intégration continue

### **Analyse de Couverture**
```bash
npm run test:coverage
```
- Rapport détaillé de couverture
- Identification des zones non testées
- Génération de rapports HTML

## 📈 Métriques de Qualité

- **Tests unitaires** : 15+ tests
- **Tests d'intégration** : 5+ tests
- **Couverture cible** : 70%+
- **Temps d'exécution** : < 30s

## 🔍 Debugging des Tests

### **Tests qui échouent**
```bash
# Exécuter un test spécifique
npm test -- --testNamePattern="ThumbCard"

# Mode verbose pour plus de détails
npm test -- --verbose
```

### **Tests en mode debug**
```javascript
// Ajouter des logs dans les tests
console.log('Debug info:', screen.debug());
```

---

**🎉 Suite de tests complète basée sur les standards OpenClassrooms !**
