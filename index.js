import * as playerClass from "../player.js";
import Player from "./player.js";
import { Monster } from "./monster.js";
import * as monsterClass from "../monster.js";

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
//const speed = 2.5;

export let midPoint = tileSize / 2; //15 

// Timer 
let timerClock = document.querySelector("#timer");
let startTime = 120;
let defaultTime = startTime;
let currentTime = startTime;
timerClock.innerHTML = currentTime
let changedTime = 0;

// Player 
let intervalID;
let timerIntervalID;

// Game State
let running = false;

let gameState = {
   Start: 0,
   Over: 0,
   Win: 0,
   Running: 0
}

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

// All Images //
const blueMonster = document.createElement("img");
blueMonster.src = './img/monster/Monster_Blue.png'
const redMonster = document.createElement("img");
redMonster.src = './img/monster/Monster_red2.png'

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

// Game Variables
let lives = 3;
let dies = 0;
let score = 1000;
let maxScore = 9648;

// First Run

let player = new Player(2)
//let player2 = new playerClass.Player(2.5);
let monster = new Monster(tileSize * 12 + midPoint, tileSize * 7 + midPoint, "red", 1.5);
let monster2 = new Monster(tileSize * 14 + midPoint, tileSize * 5 + midPoint, "blue", 1.5);
monster.direction.UP = true;
monster2.direction.UP = true;

// Map Locations
let playerLocationX;
let playerLocationY;

let monsterLocationX;
let monsterLocationY;

let monster2LocationX;
let monster2LocationY;

// Initialize Game
showMap();
displayGameStart();

function updateAllEntityLocations() {
   playerLocationX = Math.round((player.X - midPoint) / tileSize)
   playerLocationY = Math.round((player.Y - midPoint) / tileSize)

   monsterLocationX = Math.round((monster.X - midPoint) / tileSize)
   monsterLocationY = Math.round((monster.Y - midPoint) / tileSize)

   monster2LocationX = Math.round((monster2.X - midPoint) / tileSize)
   monster2LocationY = Math.round((monster2.Y - midPoint) / tileSize)
}

function showMap() {
   if (!running) {
      setTimeout(() => {
         createMap();
         context.drawImage(playerClass.pacmanOpen, player.X - midPoint, player.Y - midPoint)
         context.drawImage(redMonster, monster.X - midPoint, monster.Y - midPoint)
         context.drawImage(blueMonster, monster2.X - midPoint, monster2.Y - midPoint)
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

function setEntityStay(entity) {

   entity.direction.UP = false
   entity.direction.DOWN = false
   entity.direction.LEFT = false
   entity.direction.RIGHT = false
   entity.direction.STAY = true
}

function teleportMonstersToBase() {
   monster.X = tileSize * 12 + midPoint
   monster.Y = tileSize * 7 + midPoint

   monster2.X = tileSize * 6 + midPoint
   monster2.Y = tileSize * 7 + midPoint
}

function monsterToPlayerCollision() {
   if (lives >= 0) {
      if (((playerLocationX == monsterLocationX) && (playerLocationY == monsterLocationY)) ||
         ((playerLocationX == monster2LocationX) && (playerLocationY == monster2LocationY))) {
         setEntityStay(player);
         playerClass.teleportPlayerToBase(player);
         teleportMonstersToBase();

         context.drawImage(redMonster, monster.X - midPoint, monster.Y - midPoint)
         context.drawImage(blueMonster, monster2.X - midPoint, monster2.Y - midPoint)

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
         context.drawImage(blueMonster, monster.X - midPoint, monster.Y - midPoint)
         break;
      case "red":
         context.drawImage(redMonster, monster.X - midPoint, monster.Y - midPoint)
         break;
   }
}

function displayGameOver() {

   running = false;
   //clearTimeout(timerIntervalID);
   timerClock.innerHTML = " Game Over!"

   setEntityStay(player);
   playerClass.teleportPlayerToBase(player);
   teleportMonstersToBase();
}

function displayGameStart() {
   timerClock.innerHTML = "Press Enter to Start"
}

function collectScore() {
   let locationX = Math.round((player.X - midPoint) / tileSize)
   let locationY = Math.round((player.Y - midPoint) / tileSize)

   if (map[locationY][locationX] == 1) {
      map[locationY][locationX] = 2;

      score = score + 47;
      scoreText.innerHTML = "Score: " + score;

      if (score >= maxScore) {
         displayGameOver();
      }
   }
}

function restartGame() {
   running = true;
   lives = 3;
   dies = 0;
   livesLabel.innerHTML = "Lives: ❤️❤️❤️"
   score = 953;
   scoreText.innerHTML = "Score: " + score;

   // Time Reset
   startTime = defaultTime;
   currentTime = 60;
   changedTime = 0;
   timerClock.innerHTML = startTime

   map = constMap.map(function (arr) {
      return arr.slice();
   });

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
         else if (map[i][j] == 2) { // if Pacman eats bait
            //drawTile(black, j, i)
            /* context.fillStyle = "red"
            context.fillRect(player.X - midPoint, player.Y - midPoint, tileSize, tileSize); */
         }
      }
   }
}

// Main
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

let chaseBlueDotTop = {
   X: 17 * tileSize + midPoint,
   Y: 1 * tileSize + midPoint
}

let chaseBlueDotBottom = {
   X: 14 * tileSize + midPoint,
   Y: 5 * tileSize + midPoint
}

monster.selectDirections(player)
monster2.selectDirections(player)

let i = 2;

// Main
function nextTick() {

   intervalID = setTimeout(() => {
      clearMap();
      createMap();
      updateAllEntityLocations();

      moveEntity(player)
      playerClass.drawPlayer(player);
      collectScore();

      // Monster1
      monster.monsterChaseDirection(player);
      moveEntity(monster)
      drawMonster(monster);

      //Monster2

      if(monster2.X == (17 * tileSize + midPoint) && monster2.Y ==  (1 * tileSize + midPoint)){
         i = 2;
      }
      else if(monster2.X == (14 * tileSize + midPoint) && monster2.Y ==  (5 * tileSize + midPoint)){
         i = 1;
      }

      if(i == 1){
         monster2.monsterChaseDirection(chaseBlueDotTop);
      }
      else if(i == 2){
         monster2.monsterChaseDirection(chaseBlueDotBottom); 
      }

      
      moveEntity(monster2)
      drawMonster(monster2);

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
