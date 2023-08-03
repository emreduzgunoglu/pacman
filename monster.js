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
    else if (direction == "space") {
        entity.direction.UP = false;
        entity.direction.DOWN = false;
        entity.direction.RIGHT = false;
        entity.direction.LEFT = false;
        entity.direction.STAY = true;
    }
}

export function monsterDirection(monster) {

    let rand = Math.floor(Math.random() * 4) + 1;

    if (monster.collision) {
        switch (rand) {
            case 1:
                setDirection(monster, "up")
                break;
            case 2:
                setDirection(monster, "down")
                break;
            case 3:
                setDirection(monster, "left")
                break;
            case 4:
                setDirection(monster, "right")
                break;
        }
    }
}