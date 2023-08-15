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

let availableDirections = [];
let targetDirections = [];
let commonDirections = [];

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

function callAvailableDirections(monster) {

   availableDirections = [];

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
}

export function selectDirections(monster, player) {

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

   commonDirections = availableDirections.filter(value => targetDirections.includes(value));
}

function trueSpot(monster) {

   if ((monster.X % main.tileSize == main.midPoint) && (monster.Y % main.tileSize == main.midPoint)) {
      return true;
   }
   else
      return false;
}

export function monsterChaseDirection(monster, player) {

   if (trueSpot(monster)) {

      if (commonDirections.length > 0) {
         selectDirections(monster, player);
         // Ortak gidilecek yön varsa => git!
         if (commonDirections.includes("up")) {
            setDirection(monster, "up")
         }
         else if (commonDirections.includes("down")) {
            setDirection(monster, "down")
         }
         else if (commonDirections.includes("right")) {
            setDirection(monster, "right")
         }
         else if (commonDirections.includes("left")) {
            setDirection(monster, "left")
         }
      }

      // Ortak gidilecek yön yoksa => | Yolda duvar varsa |
      if (commonDirections.length == 0) {

         // aşağı gitmem lazım ama duvara çarptıysam
         if (targetDirections.includes("down")) {
            if (availableDirections.includes("right")) {
               setDirection(monster, "right")
               if (monster.rightCollision) {
                  callAvailableDirections(monster);
                  if (availableDirections.includes("down")) {
                     setDirection(monster, "down")
                     selectDirections(monster, player);
                  }
               }
            }
            else if (availableDirections.includes("left")) {
               setDirection(monster, "left")
               if (monster.leftCollision) {
                  callAvailableDirections(monster);
                  if (availableDirections.includes("down")) {
                     setDirection(monster, "down")
                     selectDirections(monster, player);
                  }
               }
            }
         }

         // yukarı gitmem lazım ama duvara çarptıysam
         else if (targetDirections.includes("up")) {

            if (availableDirections.includes("right")) {
               setDirection(monster, "right")
               callAvailableDirections(monster);
               if (availableDirections.includes("up")) {
                  setDirection(monster, "up")
                  selectDirections(monster, player);
               }
            }
            else if (availableDirections.includes("left")) {
               setDirection(monster, "left")
               callAvailableDirections(monster);
               if (availableDirections.includes("up")) {
                  setDirection(monster, "up")
                  selectDirections(monster, player);
               }
            }
         }

         // sağa gitmem lazım ama duvara çarptıysam
         else if (targetDirections.includes("right")) {

            if (availableDirections.includes("up")) {
               setDirection(monster, "up")
               callAvailableDirections(monster);
               if (availableDirections.includes("right")) {
                  setDirection(monster, "right")
                  selectDirections(monster, player);
               }
            }
            else if (availableDirections.includes("down")) {
               setDirection(monster, "down")
               callAvailableDirections(monster);
               if (availableDirections.includes("right")) {
                  setDirection(monster, "right")
                  selectDirections(monster, player);
               }
            }
            else if (availableDirections.includes("left")) {
               setDirection(monster, "left")
               callAvailableDirections(monster);
               if (availableDirections.includes("up")) {
                  setDirection(monster, "up")
                  if (monster.upCollision) {
                     selectDirections(monster, player);
                  }
               }
               else if (availableDirections.includes("down")) {
                  setDirection(monster, "down")
                  if (monster.downCollision) {
                     selectDirections(monster, player);
                  }
               }
            }
         }

         // sola gitmem lazım ama duvara çarptıysam
         else if (targetDirections.includes("left")) {

            if (availableDirections.includes("up")) {
               setDirection(monster, "up")
               callAvailableDirections(monster);
               if (availableDirections.includes("left")) {
                  setDirection(monster, "left")
                  selectDirections(monster, player);
               }
            }
            else if (availableDirections.includes("down")) {
               setDirection(monster, "down")
               callAvailableDirections(monster);
               if (availableDirections.includes("left")) {
                  setDirection(monster, "left")
                  selectDirections(monster, player);
               }
            }
            else if (availableDirections.includes("right")) {
               setDirection(monster, "right")
               callAvailableDirections(monster);
               if (availableDirections.includes("up")) {
                  setDirection(monster, "up")
                  if (monster.upCollision) {
                     selectDirections(monster, player);
                  }
               }
               else if (availableDirections.includes("down")) {
                  setDirection(monster, "down")
                  if (monster.downCollision) {
                     selectDirections(monster, player);
                  }
               }
            }
         }
      }
   }
}