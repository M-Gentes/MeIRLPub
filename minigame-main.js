// adapted - see: https://medium.com/@benlee.thatsme/draw-move-and-bounce-7c41d801585d

const canvas = document.querySelector('canvas')
const moveButtonUp = document.querySelector('#mv-btn-up')
const moveButtonDown = document.querySelector('#mv-btn-down')
const moveButtonLeft = document.querySelector('#mv-btn-left')
const moveButtonRight = document.querySelector('#mv-btn-right')
const switchButton = document.querySelector('#sw-btn')
const c = canvas.getContext('2d')
var doAnimate = false;

const moveDelta = 5;

canvas.width = 300
canvas.height = 100

const side = new Element(5, 5, 5, 80, "#FFF067")
side.draw();

const topBar = new Element(5, 5, 80, 5, "black")
topBar.draw();

const button = new Element(20, 15, 30, 10, "black")
button.draw();

const button2 = new Element(20, 35, 45, 10, "black")
button2.draw();

timeline = new Element(20, 55, 2, 30, "black")
timeline.draw();


const elemList = [];
elemList.push(side);
elemList.push(topBar);
elemList.push(button);
// elemList.push(button2);
elemList.push(timeline);

var elemIdx = 0;
var current = elemList[elemIdx];

function Element(x, y, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.draw = () => {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.dx, this.dy);
    };
}

const bounceOffWalls = (square, dir) => {
    if (dir == "right" && square.x + square.dx + moveDelta >= canvas.width) {
        // console.log("bounce " + square.x)
        return true
    }
    if (dir == "left" && square.x - 1 * moveDelta <= 0) {
        // square.dx = -1 * square.dx * Math.sign(canvas.width-(square.x + square.dx));
        // square.dx = -square.dx;
        // console.log("bounce " + square.x)
        return true
    }
    if (dir == "down" && square.y + square.dy + 2.5 * moveDelta >= canvas.height) {
        return true
    }
    if (dir == "up" && square.y - 1 * moveDelta <= 0) {
        // square.dy = -square.dy;
        // console.log("bouncey " + square.y)
        return true
    }
    return false
};


function move(obj, dir) {
    if (!bounceOffWalls(obj, dir)) {
        switch (dir) {
            case "up":
                obj.y -= moveDelta;
                break;
            case "down":
                obj.y += moveDelta;
                break;
            case "left":
                obj.x -= moveDelta * 2;
                break;
            case "right":
                obj.x += moveDelta * 2;
        }
        obj.draw();
    }
}

const DIR = ["up", "down", "left", "right"];
let count = 0;

const animateAuto = () => {
    // clear the canvas with clearRect()
    c.clearRect(0, 0, canvas.width, canvas.height);
    // draw

    elemList.forEach(elem => {
        if((count++)%101==0)
            move(elem, DIR.at(Math.floor(Math.random()*4)));
        else
            elem.draw();
    })
    // loop our function like this
    if(!doAnimate)
    requestAnimationFrame(animateAuto);
};

const animate = () => {
    // clear the canvas with clearRect()
    c.clearRect(0, 0, canvas.width, canvas.height);
    // draw
    elemList.forEach(elem => {
        elem.draw();
        // bounceOffWalls(elem);
    })
    // loop our function like this
    requestAnimationFrame(animate);
};

animateAuto();

moveButtonUp.addEventListener('click', () => {
    if (!doAnimate)
        animate();
    doAnimate = true;
    move(current, "up");
})

moveButtonDown.addEventListener('click', () => {
    if (!doAnimate)
        animate();
    doAnimate = true;
    move(current, "down");
    current.draw();
})

moveButtonLeft.addEventListener('click', () => {
    if (!doAnimate)
        animate();
    doAnimate = true;
    move(current, "left");
    current.draw();
})

moveButtonRight.addEventListener('click', () => {
    if (!doAnimate)
        animate();
    doAnimate = true;
    move(current, "right");
    current.draw();
})

switchButton.addEventListener('click', () => {
    elemIdx = (elemIdx + 1) % elemList.length;
    current = elemList[elemIdx];
    let col = current.color;
    current.color = "blue";
    current.draw();
    setTimeout(() => {
        current.color = col;
        current.draw();
    }, 500)
})
