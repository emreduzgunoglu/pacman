const gameFrame = document.querySelector("#gameFrame")
const context = gameFrame.getContext("2d");

const scoreText = document.querySelector("#scoreLabel")
const restartButton = document.querySelector("#RestartButton")

const gameWidth = gameFrame.height;
const gameHeight = gameFrame.width;

console.log(`Height: ${gameHeight}`);
console.log(`Width: ${gameWidth}`);

window.addEventListener("keydown", changeDirection)

//draw();

function changeDirection(event){

    const keyPressed = event.keyCode;

    const up = 38;
    const down = 40;
    const right = 39;
    const left = 37;

    switch(keyPressed){
        case up:
            console.log("up")
            break;
        case down:
            console.log("down")
            break;
        case right:
            console.log("right")
            break;
        case left:
            console.log("left")
            break; 
    }
}

function draw(){
    context.fillStyle = "red";
    context.fillRect(40,40,40,40)
}

