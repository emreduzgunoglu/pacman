const gameFrame = document.querySelector("#gameFrame")
const context = gameFrame.getContext("2d");

const scoreText = document.querySelector("#scoreLabel")
const restartButton = document.querySelector("#RestartButton")
let timerClock = document.querySelector("#timer");
let startTime = 300;
let changedTime = 0;

restartButton.addEventListener("click", closeGame);

let collusion = false;

function closeGame() {
    running = false;
    console.log(`Game Running: ${running}`)
}

const gameWidth = gameFrame.height; // 665px
const gameHeight = gameFrame.width; // 665px

const tiles = 21; // 21x21 tile
const tileSize = 35; // 35x35 px
const speed = 3;

window.addEventListener("keydown", changeDirection)

//const img = document.createElement("img");
//img.src = "https://picsum.photos/200/301";
//document.body.appendChild(img);

let player;
let playerStartPointX = tileSize * 9 + tileSize / 2
let playerStartPointY = tileSize * 9 + tileSize / 2
let playerX = playerStartPointX //4*tileSize + tileSize/2
let playerY = playerStartPointY //3*tileSize + tileSize/2
let midPoint = tileSize / 2; //17.5 
let intervalID;

let up = false;
let down = false;
let right = false;
let left = false;

let running = true;

const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

drawMap(map);
drawPlayer();
nextTick();
clock();

function changeDirection(event) {

    const keyPressed = event.keyCode;

    const upNum = 38;
    const downNum = 40;
    const rightNum = 39;
    const leftNum = 37;
    const space = 32;

    let temp;

    switch (keyPressed) {
        case upNum:
            temp = (playerX - tileSize / 2) / (tileSize);
            if (left) {
                temp = Math.floor(temp);
            }
            else if (right) {
                temp = Math.ceil(temp);
            }
            temp = temp * tileSize + tileSize / 2;
            console.log(`playerX snap: ${playerX} ${temp}`);

            if(playerX == temp){
                up = true;
            }

            //playerX = temp;
            up = true;
            down = false;
            right = false;
            left = false;
            break;
        case downNum:
            temp = (playerX - tileSize / 2) / (tileSize);
            if (left) {
                temp = Math.floor(temp);
            }
            else if (right) {
                temp = Math.ceil(temp);
            }
            temp = temp * tileSize + tileSize / 2;
            console.log(`playerX snap: ${playerX} ${temp}`);
            playerX = temp;
            down = true;
            up = false;
            right = false;
            left = false;
            break;
        case rightNum:
            right = true;
            left = false;
            up = false;
            down = false;
            break;
        case leftNum:
            left = true;
            right = false;
            up = false;
            down = false;
            break;
        case space:
            left = false;
            right = false;
            up = false;
            down = false;
            break;
    }
}

function movePlayer() {

    isCollied();

    if (!collusion) {
        if (up) {
            playerY = playerY - speed;
        }
        else if (down) {
            playerY = playerY + speed;
        }
        else if (right) {
            playerX = playerX + speed;
            if (playerX > gameHeight + midPoint) {
                playerX = 0 - midPoint;
            }
        }
        else if (left) {
            playerX = playerX - speed;
            if (playerX + tileSize + midPoint < tileSize) {
                playerX = 20 * tileSize
            }
        }
    }
}

function drawMap(map) {

    // i = Height // j = Width

    for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 19; j++) {
            if (map[i][j] == 1) {
                context.fillStyle = "black";
                context.fillRect(j * tileSize, i * tileSize, tileSize, tileSize)
            }
            else if (map[i][j] == 0) {
                context.fillStyle = "lightblue";
                context.fillRect(j * tileSize, i * tileSize, tileSize, tileSize)
            }
        }
    }
}

function drawPlayer() {

    context.beginPath();
    context.arc(playerX, playerY, tileSize / 2, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.fillStyle = "yellow"
    context.fill();
}

function nextTick() {

    intervalID = setTimeout(() => {
        drawMap(map);
        drawPlayer();
        movePlayer();
        nextTick();
    }, 10);
}

function clock() {

    setTimeout(() => {
        timerClock.innerHTML = startTime - changedTime;
        changedTime++;
        clock();
    }, 1000);
}

function isCollied() {

    let x = (playerX) / tileSize;
    let y = (playerY) / tileSize;

    if (up) {
        if ((map[Math.floor(y - 0.55)][Math.floor(x)] == 0)) {
            collusion = true;
        }
        else {
            collusion = false;
        }
    }
    else if (down) {
        if (map[Math.floor(y + 0.5)][Math.floor(x)] == 0) {
            collusion = true;
        }
        else {
            collusion = false;
        }
    }
    else if (right) {
        if (map[Math.floor(y)][Math.floor(x + 0.5)] == 0) {
            collusion = true;
        }
        else {
            collusion = false;
        }
    }
    else if (left) {
        if (map[Math.floor(y)][Math.floor(x - 0.55)] == 0) {
            collusion = true;
        }
        else {
            collusion = false;
        }
    }

}
