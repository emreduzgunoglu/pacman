import * as main from "./index.js";

export class Monster {
   constructor(X, Y, color, speed, player) {
      this.X = X;
      this.Y = Y;
      this.color = color;
      this.speed = speed;
   }

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

   // Red Scatter Locations
   redScatterTop = {
      X: 17 * main.tileSize + main.midPoint,
      Y: 1 * main.tileSize + main.midPoint
   }
   redScatterBot = {
      X: 14 * main.tileSize + main.midPoint,
      Y: 5 * main.tileSize + main.midPoint
   }

   // Pink Scatter Locations
   pinkScatterTop = {
      X: 1 * main.tileSize + main.midPoint,
      Y: 1 * main.tileSize + main.midPoint
   }
   pinkScatterBot = {
      X: 4 * main.tileSize + main.midPoint,
      Y: 5 * main.tileSize + main.midPoint
   }

   // Orange Scatter Locations
   orangeScatterTop = {
      X: 8 * main.tileSize + main.midPoint,
      Y: 19 * main.tileSize + main.midPoint
   }
   orangeScatterBot = {
      X: 1 * main.tileSize + main.midPoint,
      Y: 17 * main.tileSize + main.midPoint
   }

   // Blue Scatter Locations
   blueScatterTop = {
      X: 17 * main.tileSize + main.midPoint,
      Y: 17 * main.tileSize + main.midPoint
   }
   blueScatterBot = {
      X: 10 * main.tileSize + main.midPoint,
      Y: 19 * main.tileSize + main.midPoint
   }

   scatterTop = false;
   scatterBot = true;

   scatterBlue(){
      if(this.X == (this.blueScatterTop.X) && this.Y == (this.blueScatterTop.Y)){
         this.scatterBot = true;
         this.scatterTop = false;
      }
      else if(this.X == (this.blueScatterBot.X) && this.Y == (this.blueScatterBot.Y)){
         this.scatterTop = true;
         this.scatterBot = false;
      }

      if(this.scatterTop){
         this.chase(this.blueScatterTop)
      }
      else if(this.scatterBot){
         this.chase(this.blueScatterBot)
      }
   }

   scatterPink(){
      if(this.X == (this.pinkScatterTop.X) && this.Y == (this.pinkScatterTop.Y)){
         this.scatterBot = true;
         this.scatterTop = false;
      }
      else if(this.X == (this.pinkScatterBot.X) && this.Y == (this.pinkScatterBot.Y)){
         this.scatterTop = true;
         this.scatterBot = false;
      }

      if(this.scatterTop){
         this.chase(this.pinkScatterTop)
      }
      else if(this.scatterBot){
         this.chase(this.pinkScatterBot)
      }
   }

   scatterOrange(){
      if(this.X == (this.orangeScatterTop.X) && this.Y == (this.orangeScatterTop.Y)){
         this.scatterBot = true;
         this.scatterTop = false;
      }
      else if(this.X == (this.orangeScatterBot.X) && this.Y == (this.orangeScatterBot.Y)){
         this.scatterTop = true;
         this.scatterBot = false;
      }

      if(this.scatterTop){
         this.chase(this.orangeScatterTop)
      }
      else if(this.scatterBot){
         this.chase(this.orangeScatterBot)
      }
   }

   scatterRed(){
      if(this.X == (this.redScatterTop.X) && this.Y == (this.redScatterTop.Y)){
         this.scatterBot = true;
         this.scatterTop = false;
      }
      else if(this.X == (this.redScatterBot.X) && this.Y == (this.redScatterBot.Y)){
         this.scatterTop = true;
         this.scatterBot = false;
      }

      if(this.scatterTop){
         this.chase(this.redScatterTop)
      }
      else if(this.scatterBot){
         this.chase(this.redScatterBot)
      }
   }

   availableDirections = [];
   targetDirections = [];
   commonDirections = [];

   selectDirections(target) {
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
      if (target.X > this.X) {
         this.targetDirections.push("right")
      }
      else if (target.X < this.X) {
         this.targetDirections.push("left")
      }

      if (target.Y > this.Y) {
         this.targetDirections.push("down")
      }
      else if (target.Y < this.Y) {
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

   chase(target) {

      if (this.trueSpot()) {

         if (this.commonDirections.length > 0) {
            this.selectDirections(target);
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
                        this.selectDirections(target);
                     }
                  }
               }
               else if (this.availableDirections.includes("left")) {
                  this.setDirection("left")
                  if (this.leftCollision) {
                     this.callAvailableDirections();
                     if (this.availableDirections.includes("down")) {
                        this.setDirection("down")
                        this.selectDirections(target);
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
                     this.selectDirections(target);
                  }
               }
               else if (this.availableDirections.includes("left")) {
                  this.setDirection("left")
                  this.callAvailableDirections();
                  if (this.availableDirections.includes("up")) {
                     this.setDirection("up")
                     this.selectDirections(target);
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
                     this.selectDirections(target);
                  }
               }
               else if (this.availableDirections.includes("down")) {
                  this.setDirection("down")
                  this.callAvailableDirections();
                  if (this.availableDirections.includes("right")) {
                     this.setDirection("right")
                     this.selectDirections(target);
                  }
               }
               else if (this.availableDirections.includes("left")) {
                  this.setDirection("left")
                  this.callAvailableDirections();
                  if (this.availableDirections.includes("up")) {
                     this.setDirection("up")
                     if (this.upCollision) {
                        this.selectDirections(target);
                     }
                  }
                  else if (this.availableDirections.includes("down")) {
                     this.setDirection("down")
                     if (this.downCollision) {
                        this.selectDirections(target);
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
                     this.selectDirections(target);
                  }
               }
               else if (this.availableDirections.includes("down")) {
                  this.setDirection("down")
                  this.callAvailableDirections();
                  if (this.availableDirections.includes("left")) {
                     this.setDirection("left")
                     this.selectDirections(target);
                  }
               }
               else if (this.availableDirections.includes("right")) {
                  this.setDirection("right")
                  this.callAvailableDirections();
                  if (this.availableDirections.includes("up")) {
                     this.setDirection("up")
                     if (this.upCollision) {
                        this.selectDirections(target);
                     }
                  }
                  else if (this.availableDirections.includes("down")) {
                     this.setDirection("down")
                     if (this.downCollision) {
                        this.selectDirections(target);
                     }
                  }
               }
            }
         }
      }
   }
}

