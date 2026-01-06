# 🎓 Gestion Formation Employés

**Gestion Formation Employés** est une application web robuste conçue pour simplifier le suivi et la gestion des inscriptions des employés aux sessions de formation. Ce projet met en œuvre des technologies modernes pour offrir une interface fluide et des données sécurisées.

---

## ✨ Fonctionnalités Clés

* **📦 Gestion d'État avec Redux Toolkit :** Utilisation d'un store centralisé pour une gestion prévisible et performante des données.
* **📊 Tableau de Bord Statistique :** Visualisation interactive des données via des graphiques **Chart.js**, permettant de suivre le taux de participation par employé.
* **♻️ Suppression en Cascade :** Logique intelligente qui supprime automatiquement les inscriptions liées lorsqu'un employé est supprimé du système.
* **💾 Persistance de la Navigation :** Grâce à l'utilisation du **LocalStorage**, l'application mémorise la page actuelle de l'utilisateur, évitant ainsi de perdre sa progression lors d'un rafraîchissement [cite: 2026-01-06].
* **📄 Exportation de Rapports :** Possibilité d'exporter les statistiques en format **PDF** (avec graphiques) et les listes de données en format **Excel**.
* **🔍 Filtrage Dynamique :** Barres de recherche instantanées pour filtrer les employés et les formations en temps réel.
* **🔔 Système de Notifications :** Alertes élégantes avec **React-Toastify** pour confirmer les actions (ajout, modification, suppression).

---

## 🛠 Structure du Projet (Arborescence)

Basé sur l'architecture Redux et une organisation par fonctionnalités :

* **`src/api/`** : Configuration des services Axios pour chaque entité (employés, formations, participations).
* **`src/app/`** : Configuration du Redux Store (`store.js`).
* **`src/components/`** : Composants UI réutilisables (Modales, Listes, Pagination, Statistiques, Sidebar).
* **`src/data/`** : Fichiers JSON servant de base de données pour les serveurs locaux.
* **`src/features/`** : Slices Redux gérant la logique et les états (Actions & Reducers).

---

## 🚀 Installation et Lancement du Projet

Pour faire fonctionner l'application, vous devez lancer le Frontend ainsi que les trois serveurs de données.

### 1. Cloner le projet et installer les dépendances
git clone https://github.com/OussousMohamed/Gestion-formations-Employee.git
cd Gestion-Formation-Employe
npm install
### 2. Lancer les serveurs de données (JSON Servers)
Ouvrez trois terminaux différents et lancez les commandes suivantes :

-- Serveur Employés (Port 5005) :
    json-server --watch src/data/employe.json --port 5005
-- Serveur Formations (Port 8585) :
    json-server --watch src/data/formation.json --port 8585
-- Serveur Participations (Port 5000) :
    json-server --watch src/data/participation.json --port 5000
### 3. Lancer l'application React
Dans un nouveau terminal, lancez :
    npm run dev
    L'application sera accessible sur http://localhost:5173.
