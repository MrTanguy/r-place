const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const CLI_PORT = 3000;
const WS_PORT = 4000;
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const wss = new WebSocket.Server({ port: WS_PORT })

// Fonction utilisée à la connexion d'un client pour récupérer tous les pixels modifiés
async function dbGetAllPixels() {
    return new Promise((resolve, reject) => {
        var mysql = require('mysql');

        var db = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PWD,
            database: process.env.MYSQL_DB
        });

        db.connect(function(err) {
            if (err) {
                return reject('error: ' + err.message);
            }
            db.query("SELECT position, color FROM pixel", function(err, result) {
                if (err) return reject(err);
                resolve(result);
            });
        });
    });
}

// Fonction utilisée pour mettre à jour un pixel
async function updatePixel(pixel) {
    return new Promise((resolve, reject) => {
        var mysql = require('mysql');

        var db = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PWD,
            database: process.env.MYSQL_DB
        });

        db.connect(function(err) {
            if (err) {
                return reject('error: ' + err.message);
            }
            const sql = `
                        INSERT INTO ${process.env.MYSQL_DB_TABLE} (position, color)
                        VALUES ('${pixel.position}', '${pixel.color}')
                        ON DUPLICATE KEY UPDATE color = VALUES(color);`;

            db.query(sql, function(err, result) {
                if (err) return reject(err);
                resolve(result);
            });
        });
    });
}


// WebSocket : A la connexion d'un client
wss.on('connection', async (ws) => {

    console.log('Client connected');

    try {
        // On récupère tous les pixels et on les envoie au client fraichement connecté
        const allPixels = await dbGetAllPixels();
        ws.send(JSON.stringify(allPixels));
    } catch (error) {
        console.error("Erreur lors de la récupération des pixels:", error);
    }

    // A la reception d'un message d'un client
    ws.on("message", data => {
        const pixel = JSON.parse(data)

        // On met à jour la db pour les prochains utilisateurs 
        updatePixel(pixel)

        // On envoie à tous les utilisateurs connectés le nouveau pixel modifié
        wss.clients.forEach(client => {
            client.send(JSON.stringify([pixel]))
        });
    });

    ws.on("close", () => {
        console.log("the client has connected");
    });

    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});

// Partie serveur-client classique
app.use(express.static(path.join(__dirname, 'public')));

app.listen(CLI_PORT, () => {
    console.log(`Serveur lancé sur http://127.0.0.1:${CLI_PORT}`);
});

