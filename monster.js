import * as main from "../index.js";

export class Monster {
   constructor(X, Y, color, speed) {
      this.X = X;
      this.Y = Y;
      this.color = color;
      this.speed = speed;
   }

   X = main.tileSize * 9 + main.midPoint;
   Y = main.tileSize * 15 + main.midPoint;
   collision = false;

   upCollision = false;
   downCollision = false;
   rightCollision = false;
   leftCollision = false;

   direction = {
      UP: false,
      DOWN: false,
      LEFT: false,
      RIGHT: false,
      STAY: true
   }
}

export function setDirection(entity, direction) {

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
}

let availableDirections = [];
let targetDirections = [];

export function selectDirections(monster, player){
   
   availableDirections = [];
   targetDirections = [];

   // AVAILABLE DIRECTIONS
   if (!monster.upCollision) {
      availableDirections.push("up");
   }

   if (!monster.downCollision) {
      availableDirections.push("down");
   }

   if (!monster.leftCollision) {
      availableDirections.push("left");
   }

   if (!monster.rightCollision) {
      availableDirections.push("right");
   }

   // TO TARGET DIRECTIONS
   if (player.X > monster.X) {
      targetDirections.push("right")
   }
   else if (player.X < monster.X) {
      targetDirections.push("left")
   }

   if (player.Y > monster.Y) {
      targetDirections.push("down")
   }
   else if (player.Y < monster.Y) {
      targetDirections.push("up")
   }
}

export function monsterChaseDirection(monster, player) {

   let filteredArray = availableDirections.filter(value => targetDirections.includes(value));

   let arrayClone = filteredArray.map(function (arr) {
      return arr.slice();
   });

   // Ortak Yön Yoksa
   if ((monster.X % main.tileSize == main.midPoint) && (monster.Y % main.tileSize == main.midPoint)) {
      if (arrayClone.length == 0) {
         
         // availableDirections sağ veya sol varsa aşağı boşluk bulana kadar git
         if (targetDirections.includes("down")) {
            if (availableDirections.includes("right")) {
               //setDirection(monster, "right")

               filteredArray = [];
               filteredArray.push("down")
               filteredArray.push("right")
            }
            else if (availableDirections.includes("left")) {
               //setDirection(monster, "left")

               filteredArray = [];
               filteredArray.push("down")
               filteredArray.push("left")
            }
         }

         if(targetDirections.includes("up")){
            if (availableDirections.includes("right")) {
               //setDirection(monster, "right")
               // sağ ve yukarı ekle

               filteredArray = [];
               filteredArray.push("up")
               filteredArray.push("right")
            }
            else if (availableDirections.includes("left")) {
               //setDirection(monster, "left")
               // sol ve yukarı ekle

               filteredArray = [];
               filteredArray.push("up")
               filteredArray.push("left")
            }
         }

         setDirection(monster, filteredArray.pop())
      }
      else {
         switch (arrayClone.pop()) {
            case "up":
               setDirection(monster, filteredArray.pop())
               break;
            case "down":
               setDirection(monster, filteredArray.pop())
               break;
            case "left":
               setDirection(monster, filteredArray.pop())
               break;
            case "right":
               setDirection(monster, filteredArray.pop())
               break;
         }
         selectDirections(monster, player);
      }
   }
   //console.log("up: " + monster.upCollision + "| down: " + monster.downCollision + "| right: " + monster.rightCollision + "| left : " + monster.leftCollision)
}