[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arout820_TsakanianAroutioun_7_10032022&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arout820_TsakanianAroutioun_7_10032022)

# Groupomania - Créer un réseau social d'entreprise

Un énorme projet de création de réseau social d'entreprise pour la fin de ma formation diplômante de développeur web bac +2 avec l'utilisation de **React.js** côté client, de **Node.js avec Express** côté serveur, et de **mySql** pour la base de donnée.

## Installation

Suivez les étapes pour une installation complète.

### Git

```bash
  git clone git@github.com:Arout820/TsakanianAroutioun_7_10032022.git
```

### Dépendances

Il faudra ensuite installer les dépendances coté frontend avec le terminal de commande en faisant

```bash
  cd frontend
  npm i
```

Puis installez les dépendances coté backend avec le terminal de commande en faisant

```bash
  cd backend
  npm i
```

### MySql

Une exportation de la structure de la base de donnée pour le site Groupomania mySql se trouve dans **backend/config/Groupomani.sql**.
Pour pouvoir utiliser la base de données il faudra la créer avec le fichier en l'important.

### Variable d'environnement

Dans mon projet j'ai utilsé les variables d'environnements.

Un fichier .env.sample se trouve dans le projet dans le dossier backend/config.

Dans ce fichier se trouve les variables, il faut mettre les valeurs personnels.

Il faudra également renommer le fichier en .env

```bash
# Port api
PORT=

# Pour JasonWebToken
TOKEN=

# Base de données
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

## Lancement du projet

Pour lancer le projet il faudra ouvrir un terminal de commande pour le backend et un autre pour le frontend étant donné que nous sommes sur React.
Il faudra les laisser ouvert pour que le site puisse etre ouvert à l'adresse http://localhost:5000/ (si par exemple le port que vous avez choisi est le 5000).

Dans le terminal du backend du projet faire **npm start**, et pareil pour le backend.

# Compte administrateur

Pour rendre un compte en mode administrateur il faut créer un compte normal puis dans la base de donnée modifier la table user pour que la valeur de isAdmin qui par defaut est égale à 0 soit égale à 1.
Vous pouvez le faire soit dans le terminal en vous connectant à votre base de donnée soit dans l'application phpMyAdmin si vous l'utilisez dans l'onglet SQL avec la requête suivante.

Par exemple pour un utilisateur qui a 1 comme user_id :

```bash
  UPDATE `user` SET `isAdmin` = '1' WHERE `user_id` = '1';
```

La page wall d'un administrateur a une couleure différente de celle des autres utilisateurs.

# Routes

Fonctionneront lorsque le serveur sera lancé avec node server ou nodemon server, pouvant être mis dans un script npm start dans le fichier package.json.
Je vais utiliser le port 5000 pour les exemples, mais vous modifierez le port selon ce que vous avez choisi.

## Routes user

Pour s'inscrire (route POST):
http://localhost:5000/api/user/signup

Pour se connecter (route POST):
http://localhost:5000/api/user/login

Pour retrouver un utilisateur en particulier, le modifier ou le supprimer (routes GET, PUT et DELETE) :
http://localhost:5000/api/user/:userId

## Routes post

Pour créer un post ou récupérer tous les posts (routes POST et GET):
http://localhost:5000/api/post

Pour récupérer le nombre de commentaire d'un post (route GET):
http://localhost:5000/api/post/comments/:postId

Pour retrouver un post en particulier, le modifier ou le supprimer (routes GET, PUT et DELETE) :
http://localhost:5000/api/post/:postId

## Routes comment

Pour créer un post ou récupérer tous les comments (routes POST et GET):
http://localhost:5000/api/comment

Pour retrouver un comment en particulier ou le supprimer (routes GET et DELETE) :
http://localhost:5000/api/comment/:commentId

## Routes likes

Pour créer un like (route POST):
http://localhost:5000/api/likes

Pour supprimer un like (route DELETE):
http://localhost:5000/api/likes/:userId/:postId/:isLiked

Pour récupérer les likes d'un utilisateurs (routes GET) :
http://localhost:5000/api/likes/:userId/:postId

## 🛠 Skills

Je suis un développeur **Full Stack spécialisé React**.

J'utilise l'outil de versioning Git et GitHub, je mets en place les bonnes pratiques pour
le référencement naturel, pour les normes d'accessibilité ainsi que pour le respect des performances.

**Front** : React, Vanilla Javascript, HTML, CSS, Sass, Autoformation Next.js💪

**Back** : Node.js avec Express, MongoDB, mySQL

## Mon profil Linkedin

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aroutiountsakanian/)
