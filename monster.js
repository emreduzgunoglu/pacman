import * as main from "../index.js";

export class Monster {
   constructor(X, Y, color, speed) {
      this.X = X;
      this.Y = Y;
      this.color = color;
      this.speed = speed;
   }
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

   availableDirections = [];
   targetDirections = [];
   commonDirections = [];

   selectDirections(player) {

      this.availableDirections = [];
      this.targetDirections = [];

      // AVAILABLE DIRECTIONS
      if (!this.upCollision) {
         this.availableDirections.push("up");
      }

      if (!this.downCollision) {
         this.availableDirections.push("down");
      }

      if (!this.leftCollision) {
         this.availableDirections.push("left");
      }

      if (!this.rightCollision) {
         this.availableDirections.push("right");
      }

      // TO TARGET DIRECTIONS
      if (player.X > this.X) {
         this.targetDirections.push("right")
      }
      else if (player.X < this.X) {
         this.targetDirections.push("left")
      }

      if (player.Y > this.Y) {
         this.targetDirections.push("down")
      }
      else if (player.Y < this.Y) {
         this.targetDirections.push("up")
      }

      this.commonDirections = this.availableDirections.filter(value => this.targetDirections.includes(value));
   }

   setDirection(direction) {

      if (direction == "up") {
         this.direction.UP = true;
         this.direction.DOWN = false;
         this.direction.RIGHT = false;
         this.direction.LEFT = false;
         this.direction.STAY = false;
      }
      else if (direction == "down") {
         this.direction.UP = false;
         this.direction.DOWN = true;
         this.direction.RIGHT = false;
         this.direction.LEFT = false;
         this.direction.STAY = false;
      }
      else if (direction == "right") {
         this.direction.UP = false;
         this.direction.DOWN = false;
         this.direction.RIGHT = true;
         this.direction.LEFT = false;
         this.direction.STAY = false;
      }
      else if (direction == "left") {
         this.direction.UP = false;
         this.direction.DOWN = false;
         this.direction.RIGHT = false;
         this.direction.LEFT = true;
         this.direction.STAY = false;
      }
   }

   callAvailableDirections() {

      this.availableDirections = [];

      // AVAILABLE DIRECTIONS
      if (!this.upCollision) {
         this.availableDirections.push("up");
      }

      if (!this.downCollision) {
         this.availableDirections.push("down");
      }

      if (!this.leftCollision) {
         this.availableDirections.push("left");
      }

      if (!this.rightCollision) {
         this.availableDirections.push("right");
      }
   }

   trueSpot() {

      if ((this.X % main.tileSize == main.midPoint) && (this.Y % main.tileSize == main.midPoint)) {
         return true;
      }
      else
         return false;
   }

   monsterChaseDirection(player) {

      if (this.trueSpot()) {

         if (this.commonDirections.length > 0) {
            this.selectDirections(player);
            // Ortak gidilecek yön varsa => git!
            if (this.commonDirections.includes("up")) {
               this.setDirection("up")
            }
            else if (this.commonDirections.includes("down")) {
               this.setDirection("down")
            }
            else if (this.commonDirections.includes("right")) {
               this.setDirection("right")
            }
            else if (this.commonDirections.includes("left")) {
               this.setDirection("left")
            }
         }

         // Ortak gidilecek yön yoksa => | Yolda duvar varsa |
         if (this.commonDirections.length == 0) {

            // aşağı gitmem lazım ama duvara çarptıysam
            if (this.targetDirections.includes("down")) {
               if (this.availableDirections.includes("right")) {
                  this.setDirection("right")
                  if (this.rightCollision) {
                     this.callAvailableDirections();
                     if (this.availableDirections.includes("down")) {
                        this.setDirection("down")
                        this.selectDirections(player);
                     }
                  }
               }
               else if (this.availableDirections.includes("left")) {
                  this.setDirection("left")
                  if (this.leftCollision) {
                     this.callAvailableDirections();
                     if (this.availableDirections.includes("down")) {
                        this.setDirection("down")
                        this.selectDirections(player);
                     }
                  }
               }
            }

            // yukarı gitmem lazım ama duvara çarptıysam
            else if (this.targetDirections.includes("up")) {

               if (this.availableDirections.includes("right")) {
                  this.setDirection("right")
                  this.callAvailableDirections();
                  if (this.availableDirections.includes("up")) {
                     this.setDirection("up")
                     this.selectDirections(player);
                  }
               }
               else if (this.availableDirections.includes("left")) {
                  this.setDirection("left")
                  this.callAvailableDirections();
                  if (this.availableDirections.includes("up")) {
                     this.setDirection("up")
                     this.selectDirections(player);
                  }
               }
            }

            // sağa gitmem lazım ama duvara çarptıysam
            else if (this.targetDirections.includes("right")) {

               if (this.availableDirections.includes("up")) {
                  this.setDirection("up")
                  this.callAvailableDirections();
                  if (this.availableDirections.includes("right")) {
                     this.setDirection("right")
                     this.selectDirections(player);
                  }
               }
               else if (this.availableDirections.includes("down")) {
                  this.setDirection("down")
                  this.callAvailableDirections();
                  if (this.availableDirections.includes("right")) {
                     this.setDirection("right")
                     this.selectDirections(player);
                  }
               }
               else if (this.availableDirections.includes("left")) {
                  this.setDirection("left")
                  this.callAvailableDirections();
                  if (this.availableDirections.includes("up")) {
                     this.setDirection("up")
                     if (this.upCollision) {
                        this.selectDirections(player);
                     }
                  }
                  else if (this.availableDirections.includes("down")) {
                     this.setDirection("down")
                     if (this.downCollision) {
                        this.selectDirections(player);
                     }
                  }
               }
            }

            // sola gitmem lazım ama duvara çarptıysam
            else if (this.targetDirections.includes("left")) {

               if (this.availableDirections.includes("up")) {
                  this.setDirection("up")
                  this.callAvailableDirections();
                  if (this.availableDirections.includes("left")) {
                     this.setDirection("left")
                     this.selectDirections(player);
                  }
               }
               else if (this.availableDirections.includes("down")) {
                  this.setDirection("down")
                  this.callAvailableDirections();
                  if (this.availableDirections.includes("left")) {
                     this.setDirection("left")
                     this.selectDirections(player);
                  }
               }
               else if (this.availableDirections.includes("right")) {
                  this.setDirection("right")
                  this.callAvailableDirections();
                  if (this.availableDirections.includes("up")) {
                     this.setDirection("up")
                     if (this.upCollision) {
                        this.selectDirections(player);
                     }
                  }
                  else if (this.availableDirections.includes("down")) {
                     this.setDirection("down")
                     if (this.downCollision) {
                        this.selectDirections(player);
                     }
                  }
               }
            }
         }
      }
   }
}

