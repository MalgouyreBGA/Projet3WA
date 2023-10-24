schema entite clé etrangere
diagramme de class

Modifiez votre commande ng serve pour inclure la configuration de proxy. Vous pouvez le faire en ajoutant l'option --proxy-config à votre commande ng serve dans le fichier package.json, par exemple :
json
Copy code
"scripts": {
  "start": "ng serve --proxy-config proxy.conf.js"
}
Assurez-vous que le script "start" dans le fichier package.json inclut l'option --proxy-config pour pointer vers votre fichier de configuration de proxy proxy.conf.js.