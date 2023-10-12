const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const CLI_PORT = 3000;
const WS_PORT = 4000;

const app = express();


const wss = new WebSocket.Server({ port: WS_PORT })

wss.on('connection', (ws) => {

    console.log('Client connected');

    ws.send('Welcome to the WebSocket server!');

    ws.on("message", data => {
    console.log(`Client has sent us: ${data}`)
    });

    ws.on("close", () => {
        console.log("the client has connected");
    });

    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(CLI_PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${CLI_PORT}`);
});

