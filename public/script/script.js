// Partie WS
const socket = new WebSocket('ws://localhost:4000');

socket.addEventListener('open', (event) => {
    console.log('Connected to the WebSocket server');
});

socket.addEventListener('message', (event) => {

    const data = JSON.parse(event.data)

    let canvas = document.getElementById('place');
    const ctx = canvas.getContext("2d");

    let colors = {
        0: 'white', 
        1: 'Red', 
        2: 'Green', 
        3: 'Blue'
    }

    data.forEach(pixel => {

        let [x, y] = pixel.position.split('-').map(Number);

        ctx.fillStyle = colors[pixel.color];
        ctx.fillRect(x, y, 1, 1);
    });    

    

});

// Partie changement pixel
let button = document.getElementById('buttonValidate');

button.addEventListener('click', () => {

    let x = document.getElementById('x').value;
    let y = document.getElementById('y').value;
    let color = document.getElementById('color').value;

    if (x != "" && y != "") {
        socket.send(JSON.stringify({'position':`${x}-${y}`, 'color': color}))
    } 

})