# 🎓 Gestion Formation Employés

**Gestion Formation Employés** est une application web moderne et intuitive conçue pour simplifier le suivi et la gestion des inscriptions des employés aux sessions de formation. Ce projet utilise React, Redux Toolkit et Vite pour offrir une interface fluide, réactive et performante avec une gestion d'état centralisée.

---

##  Vue d'ensemble du Projet

L'application permet aux organisations de :
- **Gérer les employés** : Créer, modifier, supprimer et consulter la liste des employés
- **Gérer les formations** : Créer, modifier, supprimer et consulter les sessions de formation disponibles
- **Gérer les participations** : Inscrire des employés à des formations et suivre leurs participations
- **Analyser les données** : Visualiser des statistiques et générer des rapports détaillés
- **Automatiser les processus** : Suppression en cascade des participations lors de la suppression d'un employé

---

## ✨ Fonctionnalités Clés

### 1. ** Gestion d'État Centralisée avec Redux Toolkit**
- Architecture Redux robuste avec slices pour chaque entité (Employés, Formations, Participations)
- Async Thunks pour la gestion des opérations asynchrones (récupération, création, mise à jour, suppression)
- Dispatch d'actions prévisibles pour une gestion d'état fiable et traçable

### 2. ** Tableau de Bord Statistique Interactif**
- Visualisation interactive des données via **Chart.js**
- Graphiques dynamiques montrant :
  - Taux de participation par employé
  - Distribution des formations par grade/catégorie
  - Statistiques globales sur les participations
- Export des rapports en format **PDF** avec graphiques intégrés

### 3. ** Suppression en Cascade Intelligente**
- Logique métier qui supprime automatiquement tous les enregistrements de participation liés lorsqu'un employé est supprimé
- Intégrité des données garantie

### 4. ** Persistance de la Navigation**
- **LocalStorage** mémorise la page actuelle et le state utilisateur
- L'application retrouve exactement où l'utilisateur s'était arrêté après un rafraîchissement
- Améliore l'expérience utilisateur

### 5. ** Exportation de Rapports**
- **Export en Excel** : Exporter les listes d'employés, formations et participations
- **Export en PDF** : Générer des rapports avec graphiques et statistiques
- Utilisation de la bibliothèque **XLSX** pour la génération de fichiers

### 6. ** Filtrage Dynamique en Temps Réel**
- Barres de recherche dans chaque liste (employés, formations)
- Filtrage instantané avec mise à jour immédiate de l'affichage
- Améliore la productivité des utilisateurs

### 7. ** Système de Notifications Élégant**
- **React-Toastify** pour les alertes utilisateur
- Notifications de confirmation pour :
  - Ajout d'un nouvel élément
  - Modification d'un élément existant
  - Suppression avec confirmation
- Positionnement et durée d'affichage configurable

### 8. ** Design Réactif avec Bootstrap**
- Interface responsive basée sur **React-Bootstrap**
- Navigation fluide via **React Router**
- Composants réutilisables (Modales, Pagination, Listes)

### 9. ** Performance Optimisée**
- Build ultra-rapide avec **Vite**
- Chargement optimisé des données avec loaders
- Composants dédié pour l'affichage du chargement (Spinner)

---

## 🛠 Structure du Projet (Arborescence)

L'application suit une architecture modulaire et scalable basée sur Redux :

```
src/
├── api/                          # Services Axios pour les appels API
│   ├── employee.js              # Configuration API Employés (Port 5005)
│   ├── formation.js             # Configuration API Formations (Port 8585)
│   └── participation.js         # Configuration API Participations (Port 5000)
│
├── app/
│   └── store.js                 # Configuration du Redux Store
│
├── components/                   # Composants React réutilisables
│   ├── EmployeeList.jsx         # Liste des employés avec CRUD
│   ├── EmployeeModal.jsx        # Formulaire modal pour ajouter/modifier un employé
│   ├── FormationList.jsx        # Liste des formations avec CRUD
│   ├── FormationModal.jsx       # Formulaire modal pour ajouter/modifier une formation
│   ├── ParticipationList.jsx    # Liste des participations
│   ├── ParticipationModal.jsx   # Formulaire modal pour ajouter une participation
│   ├── Statistics.jsx           # Tableau de bord avec graphiques
│   ├── Sidebar.jsx              # Navigation latérale
│   ├── DeleteConfirmed.jsx      # Composant de confirmation de suppression
│   ├── pagination.jsx           # Composant de pagination réutilisable
│   └── spinner.jsx              # Spinner de chargement
│
├── features/                     # Redux Slices (logique métier)
│   ├── employee/
│   │   └── employeeSlice.js     # Actions, Reducers pour les employés
│   ├── formation/
│   │   └── formationSlice.js    # Actions, Reducers pour les formations
│   └── participation/
│       └── participationSlice.js # Actions, Reducers pour les participations
│
├── data/                         # Base de données locale (JSON)
│   ├── employe.json             # Données des employés
│   ├── formation.json           # Données des formations
│   └── participation.json       # Données des participations
│
├── App.jsx                       # Composant racine avec configuration des routes
├── main.jsx                      # Point d'entrée de l'application
└── index.css                     # Styles globaux
```

### Description des Dossiers Clés :

| Dossier | Description |
|---------|-------------|
| **`src/api/`** | Services Axios configurés pour chaque entité, gestion des requêtes HTTP |
| **`src/app/`** | Configuration du Redux Store (stockage centralisé de l'état) |
| **`src/components/`** | Composants React réutilisables pour l'interface utilisateur |
| **`src/features/`** | Slices Redux contenant la logique métier (actions, reducers, thunks) |
| **`src/data/`** | Fichiers JSON serveurs locaux simulant une base de données |

---

## 🚀 Installation et Lancement du Projet

### Prérequis
- **Node.js** (v16 ou supérieur)
- **npm** ou **yarn**
- **json-server** pour les serveurs de données locaux

### 1. Cloner le projet et installer les dépendances

```bash
git clone https://github.com/OussousMohamed/Gestion-formations-Employee.git
cd Gestion-Formation-Employe
npm install
```

### 2. Installer json-server globalement (si non déjà installé)

```bash
npm install -g json-server
```

### 3. Lancer les serveurs de données (JSON Servers)

Ouvrez **trois terminaux différents** et lancez les commandes suivantes :

#### Terminal 1 - Serveur Employés (Port 5005)
```bash
json-server --watch src/data/employe.json --port 5005
```

#### Terminal 2 - Serveur Formations (Port 8585)
```bash
json-server --watch src/data/formation.json --port 8585
```

#### Terminal 3 - Serveur Participations (Port 5000)
```bash
json-server --watch src/data/participation.json --port 5000
```

### 4. Lancer l'application Front-end (Terminal 4)

```bash
npm run dev
```

L'application sera accessible à : **http://localhost:5173**

### Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement Vite |
| `npm run build` | Crée une version optimisée pour la production |
| `npm run preview` | Prévisualise la build de production localement |
| `npm run lint` | Vérifie la qualité du code avec ESLint |

---

##  Modèle de Données

### Structure des Employés
```json
{
  "id": "1",
  "nom": "Bachiri",
  "grade": "Technicien",
  "sexe": "m",
  "salaire": 7500
}
```

### Structure des Formations
```json
{
  "id": "1",
  "titre": "React Avancé",
  "dateDebut": "2026-01-15",
  "dateFin": "2026-01-20",
  "duree": "5 jours"
}
```

### Structure des Participations
```json
{
  "id": "1",
  "idemp": "1",
  "idform": "1",
  "dateInscription": "2026-01-10"
}
```

---

##  Flux de Données (Architecture Redux)

```
Component 
    ↓
Dispatch Action (Async Thunk)
    ↓
API Call (Axios)
    ↓
Redux Reducer
    ↓
Store Update
    ↓
Component Re-render
```

### Exemple de Flux - Ajouter un Employé :

1. Utilisateur remplit le formulaire `EmployeeModal.jsx`
2. Dispatch de l'action `addEmployee` (Async Thunk)
3. Appel HTTP POST via `apiEmployee`
4. Mise à jour du state dans `employeeSlice.js`
5. Re-rendu du composant `EmployeeList.jsx`
6. Notification Toast de confirmation

---

##  Cas d'Usage Principaux

### 1. Gérer les Employés
- Ajouter un nouvel employé (nom, grade, sexe, salaire)
- Modifier les informations d'un employé
- Supprimer un employé (avec suppression en cascade des participations)
- Rechercher un employé par nom

### 2. Gérer les Formations
- Créer une nouvelle formation (titre, dates, durée)
- Modifier une formation existante
- Supprimer une formation
- Rechercher une formation

### 3. Gérer les Participations
- Inscrire un employé à une formation
- Consulter l'historique des participations
- Supprimer une participation

### 4. Analyser les Données
- Visualiser les statistiques de participation
- Voir le taux de participation par employé
- Générer des rapports PDF et Excel
- Exporter les données pour analyse externe

---

## 🛠 Technologies Utilisées

| Technologie | Utilisation |
|-------------|------------|
| **React 19** | Framework UI pour l'interface utilisateur |
| **Redux Toolkit** | Gestion centralisée de l'état |
| **Vite** | Build tool ultra-rapide |
| **React Router** | Navigation entre pages |
| **Axios** | Client HTTP pour les requêtes API |
| **React Bootstrap** | Composants UI Bootstrap en React |
| **Chart.js & react-chartjs-2** | Visualisation de graphiques |
| **React-Toastify** | Système de notifications |
| **XLSX** | Export en format Excel |
| **Bootstrap Icons** | Icônes modernes |
| **json-server** | Serveur de données local pour développement |
| **ESLint** | Vérification de la qualité du code |

---

##  Détails des Composants Principaux

### **EmployeeList.jsx**
- Affiche la liste de tous les employés avec pagination
- Barre de recherche pour filtrer par nom
- Boutons CRUD (Créer, Modifier, Supprimer)
- Confirmation avant suppression

### **EmployeeModal.jsx**
- Formulaire modal pour ajouter/modifier un employé
- Validation des champs
- Soumission via Redux Actions

### **FormationList.jsx**
- Liste des formations disponibles
- Recherche dynamique par titre
- Gestion CRUD des formations

### **ParticipationList.jsx**
- Affiche les inscriptions d'employés aux formations
- Permet ajouter/supprimer des participations
- Affiche les informations de l'employé et de la formation

### **Statistics.jsx**
- Graphiques de participation par employé
- Statistiques globales
- Export en PDF avec graphiques
- Export en Excel des données

### **Sidebar.jsx**
- Navigation principale de l'application
- Liens vers : Employés, Formations, Participations, Statistiques
- Design responsive

---

##  Sécurité et Bonnes Pratiques

 **Gestion d'état prévisible** avec Redux  
 **Validation des données** côté client  
 **Confirmation de suppression** pour éviter les accidents  
 **Suppression en cascade** pour maintenir l'intégrité des données  
 **Gestion des erreurs** avec Try-Catch et notifications utilisateur  
 **Code modulaire** et réutilisable  

---

##  Améliorations Futures Possibles

- [ ] Authentification utilisateur et rôles
- [ ] Intégration avec une vraie base de données (MongoDB, PostgreSQL)
- [ ] Export en PDF natif sans dépendances externes
- [ ] Notifications par email
- [ ] Filtres avancés et tri des colonnes
- [ ] Import de données CSV
- [ ] Dashboard avec plus de statistiques
- [ ] Responsiveness mobile améliorée
- [ ] Tests unitaires et d'intégration
- [ ] CI/CD avec GitHub Actions

---

##  Support et Contribution

Pour toute question ou suggestion :
- Ouverture d'issues sur GitHub
- Pull requests bienvenues
- Documentation améliorée acceptée

---

##  Licence

Ce projet est fourni à titre d'exemple éducatif.

---

##  Auteur

**Oussous Mohamed**  
GitHub: [OussousMohamed](https://github.com/OussousMohamed)  
Projet: [Gestion-formations-Employee](https://github.com/OussousMohamed/Gestion-formations-Employee)

---

**Dernière mise à jour** : 13 Janvier 2026
    json-server --watch src/data/participation.json --port 5000
### 3. Lancer l'application React
Dans un nouveau terminal, lancez :
   ```bash 
    npm run dev
L'application sera accessible sur http://localhost:5173.
