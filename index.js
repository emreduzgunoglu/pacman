const gameFrame = document.querySelector("#gameFrame")
const context = gameFrame.getContext("2d");

const scoreText = document.querySelector("#scoreLabel")
const restartButton = document.querySelector("#RestartButton")
let timerClock = document.querySelector("#timer");
let startTime = 300;
let changedTime = 0;

restartButton.addEventListener("click", closeGame);

let collusion = false;

const gameWidth = gameFrame.height; // 630px
const gameHeight = gameFrame.width; // 570px  //21x19

const tileSize = 30; // 30x30 px
const speed = 2.5;
var TO_RADIANS = Math.PI / 180;

window.addEventListener("keydown", changeDirection)

let player;
let midPoint = tileSize / 2; //15 
let playerStartPointX = tileSize * 9 + midPoint
let playerStartPointY = tileSize * 9 + midPoint
let playerX = playerStartPointX //4*tileSize + tileSize/2
let playerY = playerStartPointY //3*tileSize + tileSize/2
let intervalID;
let playerIntervalID;
let intervalDirection;

let up = false;
let down = true;
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
    [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
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

clock();
nextTick();
imageChanger();

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

//const block = 8;
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

function collectScore() {

    let locationX = Math.round((playerX-midPoint)/tileSize)
    let locationY = Math.round((playerY-midPoint)/tileSize)

    if (map[locationY][locationX] == 1) {
        context.fillStyle = "red";
        context.fillRect(playerY / tileSize, playerX / tileSize, tileSize, tileSize)
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

                if (j - 1 < 19 && map[i][j + 1] == 1) { // Look Right
                    rightBool = true;
                    boolCount++;
                }

                if (j - 1 > 0 && map[i][j - 1] == 1) { // Look Left
                    leftBool = true;
                    boolCount++;
                }

                if (i + 1 < 21 && map[i + 1][j] == 1) { // Look Down
                    downBool = true;
                    boolCount++;
                }

                if (i - 1 > 0 && map[i - 1][j] == 1) { // Look Up
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
        }
    }
}

function predictDirection(tempDirection) {

    intervalDirection = setTimeout(() => {

        if (playerX % tileSize == midPoint && playerY % tileSize == midPoint) {
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
            if ((right && !collusion) || (left && !collusion)) {
                predictDirection(allDirections.UP);
            }
            else {
                directions(allDirections.UP);
            }
            break;
        case downNum:
            // sağa veya sola giderken aşağı basılırsa
            if ((right && !collusion) || (left && !collusion)) {
                predictDirection(allDirections.DOWN);
            }
            else {
                directions(allDirections.DOWN);
            }
            break;
        case rightNum:
            // yukarı veya aşağı giderken sağa basılırsa
            if ((up && !collusion) || (down && !collusion)) {
                predictDirection(allDirections.RIGHT);
            }
            else {
                directions(allDirections.RIGHT);
            }
            break;
        case leftNum:
            // yukarı veya aşağı giderken sola basılırsa
            if ((up && !collusion) || (down && !collusion)) {
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
    if (playerX > gameHeight + midPoint) {
        playerX = 0 - midPoint;
    }
}

function teleportLeft() {
    if (playerX + tileSize + midPoint < tileSize) {
        playerX = 20 * tileSize
    }
}

function movePlayer() {

    isCollied();

    if (!collusion) {
        if (up) {
            if (playerX % tileSize == 15) {
                playerY = playerY - speed;
            }
        }
        else if (down) {
            if (playerX % tileSize == 15) {
                playerY = playerY + speed;
            }
        }
        else if (right) {
            if (playerY % tileSize == 15) {
                playerX = playerX + speed;
            }
            teleportRight();
        }
        else if (left) {
            if (playerY % tileSize == 15) {
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
            //else if (map[i][j] == 0) {

            //context.fillStyle = "lightblue";
            //context.fillRect(j * tileSize, i * tileSize, tileSize, tileSize)
            //context.drawImage(wall, j * tileSize, i * tileSize, tileSize, tileSize);

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
    context.translate(playerX, playerY);
    context.rotate(angleInRad * TO_RADIANS);
    context.drawImage(image, -midPoint, -midPoint);
    context.rotate(-angleInRad * TO_RADIANS);
    context.translate(-playerX, -playerY);
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

function nextTick() {

    intervalID = setTimeout(() => {
        drawMap(map);
        createMap();
        drawPlayer();
        //collectScore();
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
