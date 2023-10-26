Creer un fichier . dans la root de Projet3wServer:
API_KEY=______________________ <= api key de https://newsapi.org/s/france-news-api
tokens_secret_key=____________ <= utilisé dans jwt tokens


Etape 1 : lancer la base de données mongodb : mongod --port 27017 --dbpath '.\app\mongodb'
Etape 2 : lancer le serveur : node server.js
Etape 3 : lancer Projet3wApp !ATTENTION! avec la commande npm start car un proxy est utilisé
