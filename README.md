# Groupomania

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
