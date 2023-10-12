# r-place

Ce projet a pour but de simuler en local la fameuse pixel war organisée par reddit. <br>
Pour ce faire, ce projet utilise un websocket et un serveur/client developpé en JavaScript.

## Initialiser le projet 

`git clone https://github.com/MrTanguy/r-place.git` 
`cd r-place`
`git checkout dev`
`npm install`

## Créer la base de données

Dans votre base de données MySQL, éxécuter ce script : 

```
CREATE TABLE `r-place`.`pixel` (`id` INT NOT NULL AUTO_INCREMENT , `position` VARCHAR(255) NOT NULL , `color` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`), UNIQUE (`position`)) ENGINE = InnoDB;
```

Cette requête va créer la base r-place, dans laquelle il va y avoir la table pixel. <br>
La table contient 3 colonnes : id - position - couleur

## Configurer le projet 

A la racine du projet, créer le fichier .env en suivant le template : 

`
MYSQL_HOST = "localhost"
MYSQL_USER = ""
MYSQL_PWD = ""
MYSQL_DB = "r-place"
MYSQL_DB_TABLE = "pixel"
`

Si le script sql a été lancé, MYSQL_DB et MYSQL_DB_TABLE ont déjà les bonnes valeurs.

## Lancer le projet 

`node node .\index.js`



