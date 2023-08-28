import * as playerClass from "./player.js";
import Player from "./player.js";
import { Monster } from "./monster.js";

// Game Constants
const gameFrame = document.querySelector("#gameFrame")
export const context = gameFrame.getContext("2d");
const scoreText = document.querySelector("#scoreLabel")
const livesLabel = document.querySelector("#livesLabel")
const pacmanLabel = document.querySelector("#pacmanText") // not used
const restartButton = document.querySelector("#RestartButton")
restartButton.addEventListener("click", restartGame);
window.addEventListener("keydown", changeDirection)
window.addEventListener("keydown", function (e) {
   if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
   }
}, false);

// Game Frame
export const gameWidth = gameFrame.height; // 630px
export const gameHeight = gameFrame.width; // 570px  //21x19
export const tileSize = 30; // 30x30 px
export let midPoint = tileSize / 2; //15 

// Timer 
let timerClock = document.querySelector("#timer");
let startTime = 120;
let defaultTime = startTime;
let currentTime = startTime;
let changedTime = 0;

// Player 
let intervalID;
let timerIntervalID;

// Game State
let running = false;

// MAP
let map = [
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
   [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
   [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
   [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
   [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
   [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
   [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
   [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
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

// MAP UNCHANGED
let constMap = [
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
   [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
   [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
   [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
   [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
   [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
   [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
   [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
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

let monsterIntervalID;
let monsterImgChange = false;
let changeMonsterImg = 1;

function monsterImageChanger() {
   monsterIntervalID = setTimeout(() => {
      if (changeMonsterImg == 1) {
         monsterImgChange = true;
         changeMonsterImg = 2;
      } else if (changeMonsterImg == 2) {
         monsterImgChange = false;
         changeMonsterImg = 1;
      }
      monsterImageChanger();
   }, 150);
}

// All Images //
// Blue Monster
const Blue_Up = document.createElement("img");
Blue_Up.src = './img/monster/Blue_Up.png'
const Blue_Up2 = document.createElement("img");
Blue_Up2.src = './img/monster/Blue_Up2.png'

const Blue_Down = document.createElement("img");
Blue_Down.src = './img/monster/Blue_Down.png'
const Blue_Down2 = document.createElement("img");
Blue_Down2.src = './img/monster/Blue_Down2.png'

const Blue_Left = document.createElement("img");
Blue_Left.src = './img/monster/Blue_Left.png'
const Blue_Left2 = document.createElement("img");
Blue_Left2.src = './img/monster/Blue_Left2.png'

const Blue_Right = document.createElement("img");
Blue_Right.src = './img/monster/Blue_Right.png'
const Blue_Right2 = document.createElement("img");
Blue_Right2.src = './img/monster/Blue_Right2.png'

// Red Monster
const Red_Up = document.createElement("img");
Red_Up.src = './img/monster/Red_Up.png'
const Red_Up2 = document.createElement("img");
Red_Up2.src = './img/monster/Red_Up2.png'

const Red_Down = document.createElement("img");
Red_Down.src = './img/monster/Red_Down.png'
const Red_Down2 = document.createElement("img");
Red_Down2.src = './img/monster/Red_Down2.png'

const Red_Left = document.createElement("img");
Red_Left.src = './img/monster/Red_Left.png'
const Red_Left2 = document.createElement("img");
Red_Left2.src = './img/monster/Red_Left2.png'

const Red_Right = document.createElement("img");
Red_Right.src = './img/monster/Red_Right.png'
const Red_Right2 = document.createElement("img");
Red_Right2.src = './img/monster/Red_Right2.png'

// Orange Monster
const Orange_Up = document.createElement("img");
Orange_Up.src = './img/monster/Orange_Up.png'
const Orange_Up2 = document.createElement("img");
Orange_Up2.src = './img/monster/Orange_Up2.png'

const Orange_Down = document.createElement("img");
Orange_Down.src = './img/monster/Orange_Down.png'
const Orange_Down2 = document.createElement("img");
Orange_Down2.src = './img/monster/Orange_Down2.png'

const Orange_Left = document.createElement("img");
Orange_Left.src = './img/monster/Orange_Left.png'
const Orange_Left2 = document.createElement("img");
Orange_Left2.src = './img/monster/Orange_Left2.png'

const Orange_Right = document.createElement("img");
Orange_Right.src = './img/monster/Orange_Right.png'
const Orange_Right2 = document.createElement("img");
Orange_Right2.src = './img/monster/Orange_Right2.png'

// Pink Monster
const Pink_Up = document.createElement("img");
Pink_Up.src = './img/monster/Pink_Up.png'
const Pink_Up2 = document.createElement("img");
Pink_Up2.src = './img/monster/Pink_Up2.png'

const Pink_Down = document.createElement("img");
Pink_Down.src = './img/monster/Pink_Down.png'
const Pink_Down2 = document.createElement("img");
Pink_Down2.src = './img/monster/Pink_Down2.png'

const Pink_Left = document.createElement("img");
Pink_Left.src = './img/monster/Pink_Left.png'
const Pink_Left2 = document.createElement("img");
Pink_Left2.src = './img/monster/Pink_Left2.png'

const Pink_Right = document.createElement("img");
Pink_Right.src = './img/monster/Pink_Right.png'
const Pink_Right2 = document.createElement("img");
Pink_Right2.src = './img/monster/Pink_Right2.png'

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
const bait = document.createElement("img");
bait.src = './img/wall/bait.png'
const black = document.createElement("img");
black.src = './img/wall/black.png'

// Game Variables
let lives = 3;
let dies = 0;
let score = 953;
let maxScore = 9648;
let highScore = 0;

function entityMidPoint(Coordinate) {
   return ((Coordinate * tileSize) + midPoint)
}

let monsterRedBase = {
   X: entityMidPoint(9),
   Y: entityMidPoint(7)
}

let monsterBlueBase = {
   X: entityMidPoint(8),
   Y: entityMidPoint(9)
}

let monsterOrangeBase = {
   X: entityMidPoint(10),
   Y: entityMidPoint(9)
}

let monsterPinkBase = {
   X: entityMidPoint(9),
   Y: entityMidPoint(9)
}

let pinkScatterMode = false;
let blueScatterMode = false;
let orangeScatterMode = false;
let redScatterMode = true;

let pinkQuitBase = false;
let blueQuitBase = false;
let orangeQuitBase = false;

let midLeftLocation = {
   X: 6 * tileSize + midPoint,
   Y: 7 * tileSize + midPoint
}

let midRightLocation = {
   X: 12 * tileSize + midPoint,
   Y: 7 * tileSize + midPoint
}

//let animationInterval;
let animationCount = 0;

// Timer for quiting base
let quitTimer = 21;

// Initialize Entity's
let player = new Player(2)
let monsterRed = new Monster(monsterRedBase.X, monsterRedBase.Y, "red", 1.5);
let monsterBlue = new Monster(monsterBlueBase.X, monsterBlueBase.Y, "blue", 1.5);
let monsterOrange = new Monster(monsterOrangeBase.X, monsterOrangeBase.Y, "orange", 1.5);
let monsterPink = new Monster(monsterPinkBase.X, monsterPinkBase.Y, "pink", 1.5);

// Map Locations
let playerLocationX, playerLocationY, monsterRedLocationX, monsterRedLocationY, monsterBlueLocationX,
   monsterBlueLocationY, monsterOrangeLocationX, monsterOrangeLocationY, monsterPinkLocationX, monsterPinkLocationY;

// Initialize Game
displayGameStart();
monsterRed.selectDirections(player)
monsterPink.selectDirections(player)
monsterBlue.selectDirections(player)
monsterOrange.selectDirections(player)

function updateAllEntityLocations() {
   playerLocationX = Math.round((player.X - midPoint) / tileSize)
   playerLocationY = Math.round((player.Y - midPoint) / tileSize)

   monsterRedLocationX = Math.round((monsterRed.X - midPoint) / tileSize)
   monsterRedLocationY = Math.round((monsterRed.Y - midPoint) / tileSize)

   monsterBlueLocationX = Math.round((monsterBlue.X - midPoint) / tileSize)
   monsterBlueLocationY = Math.round((monsterBlue.Y - midPoint) / tileSize)

   monsterOrangeLocationX = Math.round((monsterOrange.X - midPoint) / tileSize)
   monsterOrangeLocationY = Math.round((monsterOrange.Y - midPoint) / tileSize)

   monsterPinkLocationX = Math.round((monsterPink.X - midPoint) / tileSize)
   monsterPinkLocationY = Math.round((monsterPink.Y - midPoint) / tileSize)
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

function setEntityStay(entity) {
   entity.direction.UP = false
   entity.direction.DOWN = false
   entity.direction.LEFT = false
   entity.direction.RIGHT = false
   entity.direction.STAY = true
}

function teleportMonstersToBase() {
   monsterRed.X = monsterRedBase.X;
   monsterRed.Y = monsterRedBase.Y;

   monsterBlue.X = monsterBlueBase.X;
   monsterBlue.Y = monsterBlueBase.Y;

   monsterOrange.X = monsterOrangeBase.X;
   monsterOrange.Y = monsterOrangeBase.Y;

   monsterPink.X = monsterPinkBase.X;
   monsterPink.Y = monsterPinkBase.Y;
}

function collisionAnimation(X, Y) {
   setTimeout(() => {
      setEntityStay(player);
      playerClass.teleportPlayerToBase(player);
      setEntityStay(monsterRed);
      setEntityStay(monsterBlue);
      setEntityStay(monsterOrange);
      setEntityStay(monsterPink);
      animationCount++;
      if (animationCount < 100) {
         //drawTile(playerClass.pacmanOpen, X, Y)
         collisionAnimation(X, Y);
      }
      else {
         teleportMonstersToBase();
         animationCount = 0;
      }
   }, 10);
}

function monsterToPlayerCollision() {
   if (lives >= 0) {
      if (((playerLocationX == monsterRedLocationX) && (playerLocationY == monsterRedLocationY)) ||
         ((playerLocationX == monsterBlueLocationX) && (playerLocationY == monsterBlueLocationY)) ||
         ((playerLocationX == monsterOrangeLocationX) && (playerLocationY == monsterOrangeLocationY)) ||
         ((playerLocationX == monsterPinkLocationX) && (playerLocationY == monsterPinkLocationY))) {

         playerClass.teleportPlayerToBase(player);
         collisionAnimation(playerLocationX, playerLocationY);

         if (lives >= 1) {
            quitTimer = 21;
         }
         resetMonsterValues();

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

   switch (monster.color) {
      case "blue":
         if (monsterImgChange) {
            if (monster.direction.UP) {
               context.drawImage(Blue_Up, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.DOWN) {
               context.drawImage(Blue_Down, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.RIGHT) {
               context.drawImage(Blue_Right, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.LEFT) {
               context.drawImage(Blue_Left, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.STAY) {
               context.drawImage(Blue_Right, monster.X - midPoint, monster.Y - midPoint)
            }
         }
         else {
            if (monster.direction.UP) {
               context.drawImage(Blue_Up2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.DOWN) {
               context.drawImage(Blue_Down2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.RIGHT) {
               context.drawImage(Blue_Right2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.LEFT) {
               context.drawImage(Blue_Left2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.STAY) {
               context.drawImage(Blue_Right2, monster.X - midPoint, monster.Y - midPoint)
            }
         }
         break;
      case "orange":
         if (monsterImgChange) {
            if (monster.direction.UP) {
               context.drawImage(Orange_Up, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.DOWN) {
               context.drawImage(Orange_Down, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.RIGHT) {
               context.drawImage(Orange_Right, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.LEFT) {
               context.drawImage(Orange_Left, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.STAY) {
               context.drawImage(Orange_Right, monster.X - midPoint, monster.Y - midPoint)
            }
         }
         else {
            if (monster.direction.UP) {
               context.drawImage(Orange_Up2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.DOWN) {
               context.drawImage(Orange_Down2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.RIGHT) {
               context.drawImage(Orange_Right2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.LEFT) {
               context.drawImage(Orange_Left2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.STAY) {
               context.drawImage(Orange_Right2, monster.X - midPoint, monster.Y - midPoint)
            }
         }
         break;
      case "pink":
         if (monsterImgChange) {
            if (monster.direction.UP) {
               context.drawImage(Pink_Up, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.DOWN) {
               context.drawImage(Pink_Down, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.RIGHT) {
               context.drawImage(Pink_Right, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.LEFT) {
               context.drawImage(Pink_Left, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.STAY) {
               context.drawImage(Pink_Right, monster.X - midPoint, monster.Y - midPoint)
            }
         }
         else {
            if (monster.direction.UP) {
               context.drawImage(Pink_Up2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.DOWN) {
               context.drawImage(Pink_Down2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.RIGHT) {
               context.drawImage(Pink_Right2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.LEFT) {
               context.drawImage(Pink_Left2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.STAY) {
               context.drawImage(Pink_Right2, monster.X - midPoint, monster.Y - midPoint)
            }
         }
         break;
      case "red":
         if (monsterImgChange) {
            if (monster.direction.UP) {
               context.drawImage(Red_Up, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.DOWN) {
               context.drawImage(Red_Down, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.RIGHT) {
               context.drawImage(Red_Right, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.LEFT) {
               context.drawImage(Red_Left, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.STAY) {
               context.drawImage(Red_Right, monster.X - midPoint, monster.Y - midPoint)
            }
         }
         else {
            if (monster.direction.UP) {
               context.drawImage(Red_Up2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.DOWN) {
               context.drawImage(Red_Down2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.RIGHT) {
               context.drawImage(Red_Right2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.LEFT) {
               context.drawImage(Red_Left2, monster.X - midPoint, monster.Y - midPoint)
            }
            else if (monster.direction.STAY) {
               context.drawImage(Red_Right2, monster.X - midPoint, monster.Y - midPoint)
            }
         }
         break;
   }
}

function displayGameOver() {
   running = false;
   clearTimeout(timerIntervalID)
   timerClock.innerHTML = " Game Over!"
   pacmanLabel.innerHTML = "High Score:" + highScore;

   setEntityStay(player);
   playerClass.teleportPlayerToBase(player);
   teleportMonstersToBase();
}

function displayGameStart() {
   //timerClock.innerHTML = "Press Enter to Start"

   if (!running) {
      setTimeout(() => {
         createMap();
         context.drawImage(playerClass.pacmanOpen, player.X - midPoint, player.Y - midPoint)
         context.drawImage(Red_Left, monsterRed.X - midPoint, monsterRed.Y - midPoint)
         context.drawImage(Blue_Left, monsterBlue.X - midPoint, monsterBlue.Y - midPoint)
         context.drawImage(Orange_Right, monsterOrange.X - midPoint, monsterOrange.Y - midPoint)
         context.drawImage(Pink_Right, monsterPink.X - midPoint, monsterPink.Y - midPoint)
         displayGameStart();
      }, 10);
   }
}

function collectScore() {
   let locationX = Math.round((player.X - midPoint) / tileSize)
   let locationY = Math.round((player.Y - midPoint) / tileSize)

   if (map[locationY][locationX] == 1) {
      map[locationY][locationX] = 2;

      score = score + 47;
      scoreText.innerHTML = "Score: " + score;
   }

   if (score >= highScore) {
      highScore = score;
   }

   if (score >= maxScore) {
      highScore = 10000;
      clearTimeout(timerIntervalID);
      displayGameWon();
   }
}

function displayGameWon() {
   running = false;
   clearTimeout(timerIntervalID);

   setEntityStay(player);
   teleportMonstersToBase();
   playerClass.teleportPlayerToBase(player);

   pacmanLabel.innerHTML = "High Score:" + highScore;
   timerClock.innerHTML = "You Won!";
}

function resetMonsterValues(){
   pinkScatterMode = false;
   blueScatterMode = false;
   orangeScatterMode = false;
   redScatterMode = true;

   pinkQuitBase = false;
   blueQuitBase = false;
   orangeQuitBase = false;

   monsterRed.count = 1;
   monsterBlue.count = 1;
   monsterOrange.count = 1;
   monsterPink.count = 1;
}

function restartGame() {
   //running = true;
   lives = 3;
   dies = 0;
   livesLabel.innerHTML = "Lives: ❤️❤️❤️"
   score = 953;
   quitTimer = 21;
   scoreText.innerHTML = "Score: " + score;
   pacmanLabel.innerHTML = "Pac-Man";

   resetMonsterValues();

   // Time Reset
   startTime = defaultTime;
   changedTime = 0;
   timerClock.innerHTML = startTime;

   map = constMap.map(function (arr) {
      return arr.slice();
   });

   clearTimeout(timerIntervalID);
   setTimeout(clock(), 10);
   setEntityStay(player);
   teleportMonstersToBase();
   playerClass.teleportPlayerToBase(player);
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
            // Can do something
         }
      }
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
            playerClass.predictDirection(player, "up");
         }
         else {
            playerClass.setDirection(player, "up");
         }
         break;
      case downNum:
         // sağa veya sola giderken aşağı basılırsa
         if ((player.direction.RIGHT && !player.collision) || (player.direction.LEFT && !player.collision)) {
            playerClass.predictDirection(player, "down");
         }
         else {
            playerClass.setDirection(player, "down");
         }
         break;
      case rightNum:
         // yukarı veya aşağı giderken sağa basılırsa
         if ((player.direction.UP && !player.collision) || (player.direction.DOWN && !player.collision)) {
            playerClass.predictDirection(player, "right");
         }
         else {
            playerClass.setDirection(player, "right");
         }
         break;
      case leftNum:
         // yukarı veya aşağı giderken sola basılırsa
         if ((player.direction.UP && !player.collision) || (player.direction.DOWN && !player.collision)) {
            playerClass.predictDirection(player, "left");
         }
         else {
            playerClass.setDirection(player, "left")
         }
         break;
      case space:
         playerClass.setDirection(player, "space");
         break;
      case enter:
         if (running == false) {
            running = true;
            timerClock.innerHTML = startTime;
            setEntityStay(player);
            nextTick();
            clock();
            playerClass.imageChanger();
            monsterImageChanger();
         }
         break;
   }
}

function moveEntity(entity) {

   isCollied(entity);

   if (entity.direction.UP && !entity.upCollision) {
      if (entity.X % tileSize == 15) {
         entity.Y = entity.Y - entity.speed;
      }
   }
   else if (entity.direction.DOWN && !entity.downCollision) {
      if (entity.X % tileSize == 15) {
         entity.Y = entity.Y + entity.speed;
      }
   }
   else if (entity.direction.RIGHT && !entity.rightCollision) {
      if (entity.Y % tileSize == 15) {
         entity.X = entity.X + entity.speed;
      }
      playerClass.teleportRight(player);
   }
   else if (entity.direction.LEFT && !entity.leftCollision) {
      if (entity.Y % tileSize == 15) {
         entity.X = entity.X - entity.speed;
      }
      playerClass.teleportLeft(player);
   }

}

function clearMap() {
   context.fillStyle = "black";
   context.fillRect(0, 0, gameHeight, gameWidth);
}

// If Need!
function monstersInBase() {
   if (monsterOrange.X > 210 && monsterOrange.X < 360) {
      if (monsterOrange.Y > 240 && monsterOrange.Y < 330) {
         map[8][9] = 1
      }
      else {
         map[8][9] = 0
      }
   }
}

function closeBaseDoor() {
   setTimeout(() => {
      map[8][9] = 0
   }, 1000);
}

function quitTimerTimeout() {
   if (quitTimer > 0) {
      quitTimer = quitTimer - 1;
   }
}

function quitBase() {
   if (quitTimer == 15) {
      map[8][9] = 2
      pinkQuitBase = true;
      closeBaseDoor();
   }
   else if (quitTimer == 10) {
      map[8][9] = 2
      blueQuitBase = true;
      closeBaseDoor();
   }
   else if (quitTimer == 5) {
      map[8][9] = 2
      orangeQuitBase = true;
      closeBaseDoor();
   }
}

function monsterRedMovements() {
   if (redScatterMode) {
      if (monsterRed.count > 3) {
         monsterRed.chase(player)
      }
      else {
         monsterRed.scatterRed();
      }
   }
   moveEntity(monsterRed);
}

function monsterPinkMovements() {

   if (pinkQuitBase) {
      monsterPink.chase(midLeftLocation);
      moveEntity(monsterPink)
   }
   else if (pinkScatterMode) {
      if (monsterPink.count > 3) {
         monsterPink.chase(player)
      }
      else {
         monsterPink.scatterPink();
      }
      moveEntity(monsterPink);
   }

   if (monsterPink.X == midLeftLocation.X && monsterPink.Y == midLeftLocation.Y) {
      pinkQuitBase = false;
      pinkScatterMode = true;
   }
}

function monsterBlueMovements() {
   if (blueQuitBase) {
      monsterBlue.chase(midRightLocation)
      moveEntity(monsterBlue);
   }
   else if (blueScatterMode) {
      if (monsterBlue.count > 7) {
         monsterBlue.chase(player)
      }
      else {
         monsterBlue.scatterBlue();
      }
      moveEntity(monsterBlue);
   }

   if (monsterBlue.X == midRightLocation.X && monsterBlue.Y == midRightLocation.Y) {
      blueQuitBase = false;
      blueScatterMode = true;
   }
}

function monsterOrangeMovements() {
   if (orangeQuitBase) {
      monsterOrange.chase(midLeftLocation)
      moveEntity(monsterOrange);
   }
   else if (orangeScatterMode) {
      if (monsterOrange.count > 5 && monsterOrange.count < 15) {
         monsterOrange.chase(player)
      }
      else {
         monsterOrange.scatterOrange();
      }
      moveEntity(monsterOrange);
   }

   if (monsterOrange.X == midLeftLocation.X && monsterOrange.Y == midLeftLocation.Y) {
      orangeQuitBase = false;
      orangeScatterMode = true;
   }
}

function nextTick() {
   intervalID = setTimeout(() => {
      // Game Essentials
      clearMap();
      createMap();
      updateAllEntityLocations();

      // Player Essentials
      moveEntity(player);
      playerClass.drawPlayer(player);
      collectScore();

      // Entity Essentials
      quitBase();
      monsterRedMovements();
      monsterPinkMovements();
      monsterBlueMovements();
      monsterOrangeMovements();

      // Draw Monsters
      drawMonster(monsterRed);
      drawMonster(monsterPink);
      drawMonster(monsterBlue);
      drawMonster(monsterOrange);

      // Game Essentials
      monsterToPlayerCollision();
      nextTick();
   }, 10);
}

function clock() {
   if (currentTime > 0) {
      timerIntervalID = setTimeout(() => {
         currentTime = startTime - changedTime
         timerClock.innerHTML = currentTime;
         changedTime++;
         quitTimerTimeout();
         clock();
      }, 1000);
   }
   else {
      lives = -1;
   }
}

function isCollied(entity) {

   let x = (entity.X) / tileSize;
   let y = (entity.Y) / tileSize;

   if ((map[Math.floor(y - 0.55)][Math.floor(x)] == 0)) {
      entity.upCollision = true;
   }
   else {
      entity.upCollision = false;
   }

   if (map[Math.floor(y + 0.5)][Math.floor(x)] == 0) {
      entity.downCollision = true;
   }
   else {
      entity.downCollision = false;
   }

   if (map[Math.floor(y)][Math.floor(x + 0.5)] == 0) {
      entity.rightCollision = true;
   }
   else {
      entity.rightCollision = false;
   }

   if (map[Math.floor(y)][Math.floor(x - 0.55)] == 0) {
      entity.leftCollision = true;
   }
   else {
      entity.leftCollision = false;
   }
}