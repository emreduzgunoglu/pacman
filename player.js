import * as main from "./index.js";

export default class Player {
    constructor(speed) {
        this.speed = speed;
    }

    X = main.tileSize * 9 + main.midPoint
    Y = main.tileSize * 9 + main.midPoint
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

let playerIntervalID;
let intervalDirection;
let mouthOpen = false;
var TO_RADIANS = Math.PI / 180;

// Pacman Image Change
let changeImg = 1;

export const pacmanOpen = document.createElement("img");
pacmanOpen.src = './img/player/ELDopen.png'
const pacmanClose = document.createElement("img");
pacmanClose.src = './img/player/ELDclose.png'

export function drawPlayer(player) {
    if (mouthOpen) {
        if (player.direction.UP) {
            rotateAndPaintImage(player, pacmanOpen, 270);
        }
        else if (player.direction.DOWN) {
            rotateAndPaintImage(player, pacmanOpen, 90);
        }
        else if (player.direction.RIGHT) {
            rotateAndPaintImage(player, pacmanOpen, 0);
        }
        else if (player.direction.LEFT) {
            rotateAndPaintImage(player, pacmanOpen, 180);
        }
        else if (player.direction.STAY) {
            rotateAndPaintImage(player, pacmanOpen, 0);
        }
    }
    else {
        if (player.direction.UP) {
            rotateAndPaintImage(player, pacmanClose, 270);
        }
        else if (player.direction.DOWN) {
            rotateAndPaintImage(player, pacmanClose, 90);
        }
        else if (player.direction.RIGHT) {
            rotateAndPaintImage(player, pacmanClose, 0);
        }
        else if (player.direction.LEFT) {
            rotateAndPaintImage(player, pacmanClose, 180);
        }
        else if (player.direction.STAY) {
            rotateAndPaintImage(player, pacmanClose, 0);
        }
    }
}

export function imageChanger() {
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

function rotateAndPaintImage(player, image, angleInRad) {
    main.context.translate(player.X, player.Y);
    main.context.rotate(angleInRad * TO_RADIANS);
    main.context.drawImage(image, -main.midPoint, -main.midPoint);
    main.context.rotate(-angleInRad * TO_RADIANS);
    main.context.translate(-player.X, -player.Y);
}

export function teleportRight(player) {
    if (player.X > main.gameHeight + main.midPoint) {
        player.X = 0 - main.midPoint;
    }
}

export function teleportLeft(player) {
    if (player.X + main.tileSize + main.midPoint < main.tileSize) {
        player.X = 20 * main.tileSize - main.midPoint
    }
}

export function predictDirection(player, tempDirection) {
    intervalDirection = setTimeout(() => {
        if ((player.X % main.tileSize == main.midPoint) && (player.Y % main.tileSize == main.midPoint)) {
            switch (tempDirection) {
                case "up":
                    if (!player.upCollision) {
                        setDirection(player, tempDirection)
                    }
                    break;
                case "down":
                    if (!player.downCollision) {
                        setDirection(player, tempDirection)
                    }
                    break;
                case "left":
                    if (!player.leftCollision) {
                        setDirection(player, tempDirection)
                    }
                    break;
                case "right":
                    if (!player.rightCollision) {
                        setDirection(player, tempDirection)
                    }
                    break;
            }
            clearTimeout();
        }
        else {
            predictDirection(player, tempDirection);
        }
    }, 10);
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
    else if (direction == "space") {
        entity.direction.UP = false;
        entity.direction.DOWN = false;
        entity.direction.RIGHT = false;
        entity.direction.LEFT = false;
        entity.direction.STAY = true;
    }
}

export function teleportPlayerToBase(player) {
    let baseCoordinateX = main.tileSize * 9 + main.midPoint;
    let baseCoordinateY = main.tileSize * 9 + main.midPoint;

    player.X = baseCoordinateX
    player.Y = baseCoordinateY
}
