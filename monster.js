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

/* export function monsterDirection(monster) {

    let rand = Math.floor(Math.random() * 4) + 1;

    switch (rand) {
        case 1:
            if (!monster.upCollision) {
                setDirection(monster, "up")
            }
            break;
        case 2:
            if (!monster.downCollision) {
                setDirection(monster, "down")
            }
            break;
        case 3:
            if (!monster.leftCollision) {
                setDirection(monster, "left")
            }
            break;
        case 4:
            if (!monster.rightCollision) {
                setDirection(monster, "right")
            }
            break;
    }
} */

export function monsterChaseDirection(monster, player) {

   // AVAILABLE DIRECTIONS
   const availableDirections = [];

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
   const targetDirections = [];

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

   const filteredArray = availableDirections.filter(value => targetDirections.includes(value));

   const arrayClone = filteredArray.map(function (arr) {
      return arr.slice();
   });

   if (arrayClone.length == 0) {
      // EKLE // YOU ARE HERE!
   }
   else {
      if ((monster.X % main.tileSize == main.midPoint) && (monster.Y % main.tileSize == main.midPoint)) {
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
      }
   }
   //console.log("up: " + monster.upCollision + "| down: " + monster.downCollision + "| right: " + monster.rightCollision + "| left : " + monster.leftCollision)
}