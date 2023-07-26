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

const gameWidth = gameFrame.height; // 630px
const gameHeight = gameFrame.width; // 570px  //21x19

const tileSize = 30; // 30x30 px
const speed = 2.5;

window.addEventListener("keydown", changeDirection)

//const playerImage = document.createElement("img");
//playerImage.src = './img/pacman3.png';

let player;
let midPoint = tileSize / 2; //15 
let playerStartPointX = tileSize * 9 + midPoint
let playerStartPointY = tileSize * 9 + midPoint
let playerX = playerStartPointX //4*tileSize + tileSize/2
let playerY = playerStartPointY //3*tileSize + tileSize/2
let intervalID;
let intervalDirection;

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


function predictDirection(tempDirection){

    intervalDirection = setTimeout(() => {

        if(playerX % tileSize == midPoint && playerY % tileSize == midPoint){
            directions(tempDirection)
            clearTimeout();
        }
        else{
            predictDirection(tempDirection);
        }   
    },10);

}

const allDirections = {
    UP : "up",
    DOWN : "down",
    LEFT : "left",
    RIGHT : "right"
}

function directions(direction){

    if(direction == allDirections.UP){
        up = true;
        down = false;
        right = false;
        left = false;
    }
    else if (direction == allDirections.DOWN){
        down = true;
        up = false;
        right = false;
        left = false;
    }
    else if (direction == allDirections.RIGHT){
        down = false;
        up = false;
        right = true;
        left = false;
    }
    else if (direction == allDirections.LEFT){
        down = false;
        up = false;
        right = false;
        left = true;
    }
    else if (direction == "space"){
        left = false;
        right = false;
        up = false;
        down = false;
    }
}

function changeDirection(event) {

    const keyPressed = event.keyCode;

    const upNum = 38;
    const downNum = 40;
    const rightNum = 39;
    const leftNum = 37;
    const space = 32;

    switch (keyPressed) {
        case upNum:
            // sağa veya sola giderken yukarı basılırsa:
            if((right && !collusion) || (left && !collusion)){
                predictDirection(allDirections.UP);
            }
            else {
                directions(allDirections.UP);
            }
            break;
        case downNum:
            // sağa veya sola giderken aşağı basılırsa
            if((right && !collusion) || (left && !collusion)){
                predictDirection(allDirections.DOWN);
            }
            else {
                directions(allDirections.DOWN);
            }
            break;
        case rightNum:
            // yukarı veya aşağı giderken sağa basılırsa
            if((up && !collusion) || (down && !collusion)){
                predictDirection(allDirections.RIGHT);
            }
            else {
                directions(allDirections.RIGHT);
            }
            break;
        case leftNum:
            // yukarı veya aşağı giderken sola basılırsa
            if((up && !collusion) || (down && !collusion)){
                predictDirection(allDirections.LEFT);
            }
            else {
                directions(allDirections.LEFT)
            }
            break;
        case space:
            directions("space");
            break;
    }
}

function teleportRight(){
    if (playerX > gameHeight + midPoint) {
        playerX = 0 - midPoint;
    }
}

function teleportLeft(){
    if (playerX + tileSize + midPoint < tileSize) {
        playerX = 20 * tileSize
    }
}

function movePlayer() {

    isCollied();

    if (!collusion) {
        if (up) {
            if(playerX % tileSize == 15){
                playerY = playerY - speed;
            }
        }
        else if (down) {
            if(playerX % tileSize == 15){ 
                playerY = playerY + speed;
            }
        }
        else if (right) {
            if(playerY % tileSize == 15){
                playerX = playerX + speed;
            }
            teleportRight();
        }
        else if (left) {
            if(playerY % tileSize == 15){
                playerX = playerX - speed;
            }
            teleportLeft();
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

    //context.drawImage(playerImage, playerX, playerY);

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
