// Game Constants
const gameFrame = document.querySelector("#gameFrame")
const context = gameFrame.getContext("2d");
const scoreText = document.querySelector("#scoreLabel")
const restartButton = document.querySelector("#RestartButton")
restartButton.addEventListener("click", closeGame);
window.addEventListener("keydown", changeDirection)

window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

// Timer 
let timerClock = document.querySelector("#timer");
let startTime = 60;
let currentTime = startTime;
timerClock.innerHTML = currentTime
let changedTime = 0;

// Game Frame
const gameWidth = gameFrame.height; // 630px
const gameHeight = gameFrame.width; // 570px  //21x19
const tileSize = 30; // 30x30 px
const speed = 2.5;
var TO_RADIANS = Math.PI / 180;
let midPoint = tileSize / 2; //15 

// Player 
class Player {
    X = tileSize * 9 + midPoint
    Y = tileSize * 9 + midPoint
    collision = false;

    direction = {
        UP: "up",
        DOWN: "down",
        LEFT: "left",
        RIGHT: "right"
    }
}

let intervalID;
let playerIntervalID;
let intervalDirection;

// Monster
class Monster {
    X = tileSize * 10 + midPoint
    Y = tileSize * 15 + midPoint
    collision = false;

    direction = {
        UP: "up",
        DOWN: "down",
        LEFT: "left",
        RIGHT: "right"
    }
}

// Directions
let up = false;
let down = true;
let right = false;
let left = false;

let running = true;

// MAP
const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
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

// First Run
let player = new Player();
let monster = new Monster();
clock();
nextTick();
imageChanger();

let gameOver = false;

// All Images
const mosnterImg = document.createElement("img");
mosnterImg.src = './img/monster/Monster_red.png'

const upWall = document.createElement("img");
upWall.src = './img/wall/up.png'
const downWall = document.createElement("img");
downWall.src = './img/wall/down.png'
const leftWall = document.createElement("img");
leftWall.src = './img/wall/left.png'
const rightWall = document.createElement("img");
rightWall.src = './img/wall/right.png'

const upLeftWall = document.createElement("img");
upLeftWall.src = './img/wall/up_left.png'
const upRightWall = document.createElement("img");
upRightWall.src = './img/wall/up_right.png'
const downLeftWall = document.createElement("img");
downLeftWall.src = './img/wall/down_left.png'
const downRightWall = document.createElement("img");
downRightWall.src = './img/wall/down_right.png'

const upDownWall = document.createElement("img");
upDownWall.src = './img/wall/up_down.png'
const rightLeftWall = document.createElement("img");
rightLeftWall.src = './img/wall/right_left.png'

const Xup = document.createElement("img");
Xup.src = './img/wall/Xup.png'
const Xdown = document.createElement("img");
Xdown.src = './img/wall/Xdown.png'
const Xleft = document.createElement("img");
Xleft.src = './img/wall/Xleft.png'
const Xright = document.createElement("img");
Xright.src = './img/wall/Xright.png'

const bait = document.createElement("img");
bait.src = './img/wall/bait.png'

const block = document.createElement("img");
block.src = './img/wall/block.png'

//const blockX = 9

const black = document.createElement("img");
black.src = './img/wall/black.png'

const pacmanOpen = document.createElement("img");
pacmanOpen.id = "pacman";
pacmanOpen.src = './img/player/pacmanOpen.png'

const pacmanClose = document.createElement("img");
pacmanClose.src = './img/player/pacmanClose.png'

let mouthOpen = false;
let changeImg = 1;

let point = 0;

function drawMonster(monster) {

    context.fillStyle = "red";
    context.drawImage(mosnterImg, monster.X - midPoint, monster.Y - midPoint)
    //monster.Y = monster.Y - speed;
}

function monsterDirection(monster){

    let rand = Math.floor(Math.random() * 4) + 1;

    switch (rand) {
        case 1:
            monster.direction.UP = true;
            break;
        case 2:
            monster.direction.DOWN = true;
            break;
        case 3:
            monster.direction.LEFT = true;
            break;
        case 4:
            monster.direction.RIGHT = true;
            break;
    }
}

// MAX SCORE = 1890
function displayGameOver() {

    if (score == 1890) {

    }

}

function collectScore() {
    let locationX = Math.round((player.X - midPoint) / tileSize)
    let locationY = Math.round((player.Y - midPoint) / tileSize)

    if (map[locationY][locationX] == 1) {
        map[locationY][locationX] = 2;

        point = point + 10;
        scoreText.innerHTML = "Score: " + point;
    }
}

function closeGame() {
    running = false;
    console.log(`Game Running: ${running}`)
}

function drawTile(tile, j, i) {
    context.drawImage(tile, j * tileSize, i * tileSize, tileSize, tileSize)
}

function createMap() {

    // Map[Y][X]
    for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 19; j++) {

            if (map[i][j] == 0) { // if wall

                let rightBool = false;
                let leftBool = false;
                let upBool = false;
                let downBool = false;
                let boolCount = 0;

                if (j - 1 < 19 && (map[i][j + 1] == 1 || map[i][j + 1] == 2)) { // Look Right
                    rightBool = true;
                    boolCount++;
                }

                if (j - 1 > 0 && (map[i][j - 1] == 1 || map[i][j - 1] == 2)) { // Look Left
                    leftBool = true;
                    boolCount++;
                }

                if (i + 1 < 21 && (map[i + 1][j] == 1 || map[i + 1][j] == 2)) { // Look Down
                    downBool = true;
                    boolCount++;
                }

                if (i - 1 > 0 && (map[i - 1][j] == 1 || map[i - 1][j] == 2)) { // Look Up
                    upBool = true;
                    boolCount++;
                }

                switch (boolCount) {
                    case 1:
                        if (rightBool) {
                            drawTile(rightWall, j, i)
                        }
                        else if (leftBool) {
                            drawTile(leftWall, j, i)
                        }
                        else if (upBool) {
                            drawTile(upWall, j, i)
                        }
                        else if (downBool) {
                            drawTile(downWall, j, i)
                        }
                        break;
                    case 2:
                        if (upBool && downBool) {
                            drawTile(upDownWall, j, i)
                        }
                        else if (rightBool && leftBool) {
                            drawTile(rightLeftWall, j, i)
                        }
                        else if (rightBool && upBool) {
                            drawTile(upRightWall, j, i)
                        }
                        else if (rightBool && downBool) {
                            drawTile(downRightWall, j, i)
                        }
                        else if (leftBool && upBool) {
                            drawTile(upLeftWall, j, i)
                        }
                        else if (leftBool && downBool) {
                            drawTile(downLeftWall, j, i)
                        }
                        break;
                    case 3:
                        if (!upBool) {
                            drawTile(Xdown, j, i)
                        }
                        else if (!downBool) {
                            drawTile(Xup, j, i)
                        }
                        else if (!rightBool) {
                            drawTile(Xleft, j, i)
                        }
                        else if (!leftBool) {
                            drawTile(Xright, j, i)
                        }
                        break;
                }
            }
            else if (map[i][j] == 1) { // If Walk Way
                drawTile(bait, j, i)
            }
            else if (map[i][j] == 2) {
                //drawTile(block, j, i)
                context.fillStyle = "black"
                context.fillRect(player.X - midPoint, player.Y - midPoint, tileSize, tileSize);
            }
        }
    }
}

function predictDirection(tempDirection) {

    intervalDirection = setTimeout(() => {

        if (player.X % tileSize == midPoint && player.Y % tileSize == midPoint) {
            directions(tempDirection)
            clearTimeout();
        }
        else {
            predictDirection(tempDirection);
        }
    }, 10);

}

const allDirections = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right"
}

function directions(direction) {

    if (direction == allDirections.UP) {
        up = true;
        down = false;
        right = false;
        left = false;
    }
    else if (direction == allDirections.DOWN) {
        down = true;
        up = false;
        right = false;
        left = false;
    }
    else if (direction == allDirections.RIGHT) {
        down = false;
        up = false;
        right = true;
        left = false;
    }
    else if (direction == allDirections.LEFT) {
        down = false;
        up = false;
        right = false;
        left = true;
    }
    else if (direction == "space") {
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
            if ((right && !player.collision) || (left && !player.collision)) {
                predictDirection(allDirections.UP);
            }
            else {
                directions(allDirections.UP);
            }
            break;
        case downNum:
            // sağa veya sola giderken aşağı basılırsa
            if ((right && !player.collision) || (left && !player.collision)) {
                predictDirection(allDirections.DOWN);
            }
            else {
                directions(allDirections.DOWN);
            }
            break;
        case rightNum:
            // yukarı veya aşağı giderken sağa basılırsa
            if ((up && !player.collision) || (down && !player.collision)) {
                predictDirection(allDirections.RIGHT);
            }
            else {
                directions(allDirections.RIGHT);
            }
            break;
        case leftNum:
            // yukarı veya aşağı giderken sola basılırsa
            if ((up && !player.collision) || (down && !player.collision)) {
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

function teleportRight() {
    if (player.X > gameHeight + midPoint) {
        player.X = 0 - midPoint;
    }
}

function teleportLeft() {
    if (player.X + tileSize + midPoint < tileSize) {
        player.X = 20 * tileSize
    }
}

function movePlayer(entity) {

    isCollied(entity);

    if (!entity.collision) {
        if (up) {
            if (entity.X % tileSize == 15) {
                entity.Y = entity.Y - speed;
            }
        }
        else if (down) {
            if (entity.X % tileSize == 15) {
                entity.Y = entity.Y + speed;
            }
        }
        else if (right) {
            if (entity.Y % tileSize == 15) {
                entity.X = entity.X + speed;
            }
            teleportRight();
        }
        else if (left) {
            if (entity.Y % tileSize == 15) {
                entity.X = entity.X - speed;
            }
            teleportLeft();
        }
    }
}

function imageChanger() {

    playerIntervalID = setTimeout(() => {
        if (changeImg == 1) {
            mouthOpen = true;
            changeImg = 2;
        } else if (changeImg == 2) {
            mouthOpen = false;
            changeImg = 1;
        }
        imageChanger();
    }, 200);
}

function rotateAndPaintImage(image, angleInRad) {
    context.translate(player.X, player.Y);
    context.rotate(angleInRad * TO_RADIANS);
    context.drawImage(image, -midPoint, -midPoint);
    context.rotate(-angleInRad * TO_RADIANS);
    context.translate(-player.X, -player.Y);
}

function drawPlayer() {

    if (mouthOpen) {
        if (up) {
            rotateAndPaintImage(pacmanOpen, 270);
        }
        else if (down) {
            rotateAndPaintImage(pacmanOpen, 90);
        }
        else if (right) {
            rotateAndPaintImage(pacmanOpen, 0);
        }
        else if (left) {
            rotateAndPaintImage(pacmanOpen, 180);
        }
    }
    else {
        if (up) {
            rotateAndPaintImage(pacmanClose, 270);
        }
        else if (down) {
            rotateAndPaintImage(pacmanClose, 90);
        }
        else if (right) {
            rotateAndPaintImage(pacmanClose, 0);
        }
        else if (left) {
            rotateAndPaintImage(pacmanClose, 180);
        }
    }
}

function clearMap() {
    context.fillStyle = "black";
    context.fillRect(0, 0, gameHeight, gameWidth);
}

function nextTick() {

    intervalID = setTimeout(() => {
        clearMap();
        createMap();
        movePlayer(player)
        drawPlayer();
        collectScore();
        drawMonster(monster);
        movePlayer(monster)
        nextTick();
    }, 10);
}

function clock() {

    if (currentTime > 0) {
        setTimeout(() => {
            currentTime = startTime - changedTime
            timerClock.innerHTML = currentTime;
            changedTime++;
            monsterDirection(monster);
            clock();
        }, 1000);
    }
    else {
        gameOver = true;
    }
}

function isCollied(entity) {

    let x = (entity.X) / tileSize;
    let y = (entity.Y) / tileSize;

    if (up) {
        if ((map[Math.floor(y - 0.55)][Math.floor(x)] == 0)) {
            entity.collision = true;
        }
        else {
            entity.collision = false;
        }
    }
    else if (down) {
        if (map[Math.floor(y + 0.5)][Math.floor(x)] == 0) {
            entity.collision = true;
        }
        else {
            entity.collision = false;
        }
    }
    else if (right) {
        if (map[Math.floor(y)][Math.floor(x + 0.5)] == 0) {
            entity.collision = true;
        }
        else {
            entity.collision = false;
        }
    }
    else if (left) {
        if (map[Math.floor(y)][Math.floor(x - 0.55)] == 0) {
            entity.collision = true;
        }
        else {
            entity.collision = false;
        }
    }

}
