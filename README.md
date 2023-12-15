# r-place

Ce projet a pour but de simuler en local la fameuse pixel war organisée par reddit. <br>
Pour ce faire, ce projet utilise un websocket et un serveur/client developpé en JavaScript avec NodeJS (qui sont des prérequis).

## Démarrer avec NodeJS

### Prérequis

- nodejs : [installation](https://nodejs.org/en/download)
- npm : Inclus dans l'installation de nodejs

### Initialiser le projet 

```
git clone https://github.com/MrTanguy/r-place.git
cd r-place
git checkout dev
npm install
```

### Créer la base de données

Dans votre base de données MySQL, éxécuter ce script : 

```
CREATE DATABASE `r-place`;
CREATE TABLE `r-place`.`pixel` (`id` INT NOT NULL AUTO_INCREMENT , `position` VARCHAR(255) NOT NULL , `color` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`), UNIQUE (`position`)) ENGINE = InnoDB;
```

Cette requête va créer la base r-place, dans laquelle il va y avoir la table pixel. <br>
La table contient 3 colonnes : id - position - color

### Configurer le projet 

A la racine du projet, créer le fichier .env en suivant le template : 

```
MYSQL_HOST = "localhost"
MYSQL_USER = ""
MYSQL_PWD = ""
MYSQL_DB = "r-place"
MYSQL_DB_TABLE = "pixel"
```

Si le script sql a été lancé, MYSQL_DB et MYSQL_DB_TABLE ont déjà les bonnes valeurs.

### Lancer le projet 

`npm start`

## Démarrer avec Docker

- WSL2 : [installation](https://learn.microsoft.com/fr-fr/windows/wsl/install)
- Docker : [installation](https://www.docker.com/products/docker-desktop/)

### Initialisation 

Recupérer le repository via `git clone https://github.com/MrTanguy/r-place.git`

Se rendre dans le dossier `cd .\r-place\`

Utiliser la branch dev `git checkout dev`

Lancer la commande `docker-compose up`

Se rendre sur `http://localhost:3000` pour tester.

PS : Un nouveau container devrait apparaître dans Docker Desktop

