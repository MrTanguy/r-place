// Partie création canve

let canva = document.getElementById('place')



// Partie WS
const socket = new WebSocket('ws://localhost:4000');

socket.addEventListener('open', (event) => {
    console.log('Connected to the WebSocket server');
    socket.send('Hello, server!');
});

socket.addEventListener('message', (event) => {
    console.log(`Message from server: ${event.data}`);
});

// Partie changement pixel
let button = document.getElementById('buttonValidate');

button.addEventListener('click', () => {

    let selector = document.getElementById('color')

    socket.send(selector.value)

})