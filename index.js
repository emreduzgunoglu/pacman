// Game Constants
const gameFrame = document.querySelector("#gameFrame")
const context = gameFrame.getContext("2d");
const scoreText = document.querySelector("#scoreLabel")
const livesLabel = document.querySelector("#livesLabel")
const pacmanLabel = document.querySelector("#pacmanText")
const restartButton = document.querySelector("#RestartButton")
restartButton.addEventListener("click", closeGame);
window.addEventListener("keydown", changeDirection)
window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

// Game Frame
const gameWidth = gameFrame.height; // 630px
const gameHeight = gameFrame.width; // 570px  //21x19
const tileSize = 30; // 30x30 px
const speed = 2.5;
var TO_RADIANS = Math.PI / 180;
let midPoint = tileSize / 2; //15 

// Timer 
let timerClock = document.querySelector("#timer");
let startTime = 60;
let currentTime = startTime;
timerClock.innerHTML = currentTime
let changedTime = 0;

// Player 
class Player {
    X = tileSize * 9 + midPoint
    Y = tileSize * 15 + midPoint
    collision = false;

    direction = {
        UP: false,
        DOWN: false,
        LEFT: false,
        RIGHT: false,
        STAY: true
    }
}

let intervalID;
let playerIntervalID;
let intervalDirection;

// Monster
class Monster {
    X = tileSize * 9 + midPoint
    Y = tileSize * 9 + midPoint
    collision = false;

    direction = {
        UP: true,
        DOWN: false,
        LEFT: false,
        RIGHT: false,
        STAY: false
    }
}

// Directions
let up = false;
let down = true;
let right = false;
let left = false;

// Game State
let running = false;

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

let gameOver = false;

// All Images
const mosnterImg = document.createElement("img");
mosnterImg.src = './img/monster/Monster_red2.png'

// 1-Way Wall
const upWall = document.createElement("img");
upWall.src = './img/wall/up.png'
const downWall = document.createElement("img");
downWall.src = './img/wall/down.png'
const leftWall = document.createElement("img");
leftWall.src = './img/wall/left.png'
const rightWall = document.createElement("img");
rightWall.src = './img/wall/right.png'

// 2-Way Wall
const upLeftWall = document.createElement("img");
upLeftWall.src = './img/wall/up_left.png'
const upRightWall = document.createElement("img");
upRightWall.src = './img/wall/up_right.png'
const downLeftWall = document.createElement("img");
downLeftWall.src = './img/wall/down_left.png'
const downRightWall = document.createElement("img");
downRightWall.src = './img/wall/down_right.png'

// 2-Way Parallel Wall
const upDownWall = document.createElement("img");
upDownWall.src = './img/wall/up_down.png'
const rightLeftWall = document.createElement("img");
rightLeftWall.src = './img/wall/right_left.png'

// 3-Way Wall
const Xup = document.createElement("img");
Xup.src = './img/wall/Xup.png'
const Xdown = document.createElement("img");
Xdown.src = './img/wall/Xdown.png'
const Xleft = document.createElement("img");
Xleft.src = './img/wall/Xleft.png'
const Xright = document.createElement("img");
Xright.src = './img/wall/Xright.png'

// Special PNG
const pacmanOpen = document.createElement("img");
pacmanOpen.src = './img/player/ELDopen.png'
const pacmanClose = document.createElement("img");
pacmanClose.src = './img/player/ELDclose.png'
const bait = document.createElement("img");
bait.src = './img/wall/bait.png'

// Pacman Image Change
let mouthOpen = false;
let changeImg = 1;

// Game Variables
let lives = 3;
let dies = 0;
let score = 953;
let maxScore = 9648;

// First Run
let player = new Player();
let monster = new Monster();
showMap();
timerClock.innerHTML = "Press Enter to Start"

function showMap() {
    if (!running) {
        setTimeout(() => {
            createMap();
            showMap();
        }, 10);
    }
}

function liveCounter() {
    let liveImage = ""

    for (let i = 1; i <= lives; i++) {
        liveImage = liveImage + "❤️"
    }

    for (let j = dies; j > 0; j--) {
        liveImage = liveImage + "🤍"
    }

    if (lives < 0) {
        liveImage = "🤍🤍🤍"
    }

    return liveImage;
}

function heartImages() {


    for (let i = 0; i < lives; i++) {
        liveImage = liveImage + "❤️"
    }

    if (lives >= 0) {
        for (let j = 0; j < dies; j++) {
            liveImage = liveImage + "❤"
        }
    }

    return liveImage;
}

function setEntityStay(entity) {

    entity.direction.UP = false
    entity.direction.DOWN = false
    entity.direction.LEFT = false
    entity.direction.RIGHT = false
    entity.direction.STAY = true
}

function setPlayerBaseCoordinates() {
    player.X = tileSize * 9 + midPoint
    player.Y = tileSize * 15 + midPoint
}

function monsterCollision() {

    if (lives >= 0) {
        let playerLocationX = Math.round((player.X - midPoint) / tileSize)
        let playerLocationY = Math.round((player.Y - midPoint) / tileSize)

        let monsterLocationX = Math.round((monster.X - midPoint) / tileSize)
        let monsterLocationY = Math.round((monster.Y - midPoint) / tileSize)

        if ((playerLocationX == monsterLocationX) && (playerLocationY == monsterLocationY)) {
            setEntityStay(player);
            setPlayerBaseCoordinates();

            lives--;
            dies++;
            livesLabel.innerHTML = "Lives: " + liveCounter();
        }
    }
    else {
        displayGameOver();
    }

}

function drawMonster(monster) {
    context.drawImage(mosnterImg, monster.X - midPoint, monster.Y - midPoint)
}

function monsterDirection(monster) {

    let rand = Math.floor(Math.random() * 4) + 1;

    if (monster.collision) {
        switch (rand) {
            case 1:
                directions(monster, "up")
                break;
            case 2:
                directions(monster, "down")
                break;
            case 3:
                directions(monster, "left")
                break;
            case 4:
                directions(monster, "right")
                break;
        }
    }
}

function displayGameOver() {
    timerClock.innerHTML = " Game Over!"
}

function displayGameStart() {

    timerClock.innerHTML = "Press Arrow Keys To Start"
}

function collectScore() {
    let locationX = Math.round((player.X - midPoint) / tileSize)
    let locationY = Math.round((player.Y - midPoint) / tileSize)

    if (map[locationY][locationX] == 1) {
        map[locationY][locationX] = 2;

        score = score + 47;
        scoreText.innerHTML = "Score: " + score;
        
        if (score == maxScore) {
            displayGameOver();
        }
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
            directions(player, tempDirection)
            clearTimeout();
        }
        else {
            predictDirection(tempDirection);
        }
    }, 10);

}

function directions(entity, direction) {

    if (direction == "up") {
        entity.direction.UP = true;
        entity.direction.DOWN = false;
        entity.direction.RIGHT = false;
        entity.direction.LEFT = false;
        entity.direction.STAY = false;
    }
    else if (direction == "down") {
        entity.direction.UP = false;
        entity.direction.DOWN = true;
        entity.direction.RIGHT = false;
        entity.direction.LEFT = false;
        entity.direction.STAY = false;
    }
    else if (direction == "right") {
        entity.direction.UP = false;
        entity.direction.DOWN = false;
        entity.direction.RIGHT = true;
        entity.direction.LEFT = false;
        entity.direction.STAY = false;
    }
    else if (direction == "left") {
        entity.direction.UP = false;
        entity.direction.DOWN = false;
        entity.direction.RIGHT = false;
        entity.direction.LEFT = true;
        entity.direction.STAY = false;
    }
    else if (direction == "space") {
        entity.direction.UP = false;
        entity.direction.DOWN = false;
        entity.direction.RIGHT = false;
        entity.direction.LEFT = false;
        entity.direction.STAY = true;
    }
}

function changeDirection(event) {
    const keyPressed = event.keyCode;

    const upNum = 38;
    const downNum = 40;
    const rightNum = 39;
    const leftNum = 37;
    const space = 32;
    const enter = 13;

    switch (keyPressed) {
        case upNum:
            // sağa veya sola giderken yukarı basılırsa:
            if ((player.direction.RIGHT && !player.collision) || (player.direction.LEFT && !player.collision)) {
                predictDirection("up");
            }
            else {
                directions(player, "up");
            }
            break;
        case downNum:
            // sağa veya sola giderken aşağı basılırsa
            if ((player.direction.RIGHT && !player.collision) || (player.direction.LEFT && !player.collision)) {
                predictDirection("down");
            }
            else {
                directions(player, "down");
            }
            break;
        case rightNum:
            // yukarı veya aşağı giderken sağa basılırsa
            if ((player.direction.UP && !player.collision) || (player.direction.DOWN && !player.collision)) {
                predictDirection("right");
            }
            else {
                directions(player, "right");
            }
            break;
        case leftNum:
            // yukarı veya aşağı giderken sola basılırsa
            if ((player.direction.UP && !player.collision) || (player.direction.DOWN && !player.collision)) {
                predictDirection("left");
            }
            else {
                directions(player, "left")
            }
            break;
        case space:
            directions(player, "space");
            break;
        case enter:
            if (!running) {
                running = true;
                timerClock.innerHTML = startTime;
                nextTick();
                clock();
                imageChanger();
            }
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
        if (entity.direction.UP) {
            if (entity.X % tileSize == 15) {
                entity.Y = entity.Y - speed;
            }
        }
        else if (entity.direction.DOWN) {
            if (entity.X % tileSize == 15) {
                entity.Y = entity.Y + speed;
            }
        }
        else if (entity.direction.RIGHT) {
            if (entity.Y % tileSize == 15) {
                entity.X = entity.X + speed;
            }
            teleportRight();
        }
        else if (entity.direction.LEFT) {
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
        if (player.direction.UP) {
            rotateAndPaintImage(pacmanOpen, 270);
        }
        else if (player.direction.DOWN) {
            rotateAndPaintImage(pacmanOpen, 90);
        }
        else if (player.direction.RIGHT) {
            rotateAndPaintImage(pacmanOpen, 0);
        }
        else if (player.direction.LEFT) {
            rotateAndPaintImage(pacmanOpen, 180);
        }
        else if (player.direction.STAY) {
            rotateAndPaintImage(pacmanOpen, 0);
        }
    }
    else {
        if (player.direction.UP) {
            rotateAndPaintImage(pacmanClose, 270);
        }
        else if (player.direction.DOWN) {
            rotateAndPaintImage(pacmanClose, 90);
        }
        else if (player.direction.RIGHT) {
            rotateAndPaintImage(pacmanClose, 0);
        }
        else if (player.direction.LEFT) {
            rotateAndPaintImage(pacmanClose, 180);
        }
        else if (player.direction.STAY) {
            rotateAndPaintImage(pacmanClose, 0);
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

        monsterDirection(monster)
        movePlayer(monster)
        drawMonster(monster);

        monsterCollision();
        nextTick();
    }, 10);
}

function clock() {

    if (currentTime > 0) {
        setTimeout(() => {
            currentTime = startTime - changedTime
            timerClock.innerHTML = currentTime;
            changedTime++;
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

    if (entity.direction.UP) {
        if ((map[Math.floor(y - 0.55)][Math.floor(x)] == 0)) {
            entity.collision = true;
        }
        else {
            entity.collision = false;
        }
    }
    else if (entity.direction.DOWN) {
        if (map[Math.floor(y + 0.5)][Math.floor(x)] == 0) {
            entity.collision = true;
        }
        else {
            entity.collision = false;
        }
    }
    else if (entity.direction.RIGHT) {
        if (map[Math.floor(y)][Math.floor(x + 0.5)] == 0) {
            entity.collision = true;
        }
        else {
            entity.collision = false;
        }
    }
    else if (entity.direction.LEFT) {
        if (map[Math.floor(y)][Math.floor(x - 0.55)] == 0) {
            entity.collision = true;
        }
        else {
            entity.collision = false;
        }
    }

}
