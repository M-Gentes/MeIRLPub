// adapted - see: https://medium.com/@benlee.thatsme/draw-move-and-bounce-7c41d801585d

const canvas = document.querySelector('canvas')
const moveButtonUp = document.querySelector('#mv-btn-up')
const moveButtonDown = document.querySelector('#mv-btn-down')
const moveButtonLeft = document.querySelector('#mv-btn-left')
const moveButtonRight = document.querySelector('#mv-btn-right')
const c = canvas.getContext('2d')
var doAnimate = false;

const moveDelta = 5;

canvas.width = 300
canvas.height = 100

const body = new Element(5, 5, 80, 5, "black")
body.draw();

const elemList = [];
elemList.push(body);

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
        console.log("bounce " + square.x)
        return true
    }
    if (dir == "left" && square.x - 1 * moveDelta <= 0) {
        // square.dx = -1 * square.dx * Math.sign(canvas.width-(square.x + square.dx));
        // square.dx = -square.dx;
        console.log("bounce " + square.x)
        return true
    }
    if (dir == "down" && square.y + square.dy + 2.5 * moveDelta >= canvas.height) {
        return true
    }
    if (dir == "up" && square.y - 1 * moveDelta <= 0) {
        // square.dy = -square.dy;
        console.log("bouncey " + square.y)
        return true
    }
    return false
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

moveButtonUp.addEventListener('click', () => {
    if (!doAnimate)
        animate();
    doAnimate = true;
    if (!bounceOffWalls(body, "up"))
        body.y -= moveDelta;
    body.draw();
})

moveButtonDown.addEventListener('click', () => {
    if (!doAnimate)
        animate();
    doAnimate = true;
    if (!bounceOffWalls(body, "down"))
        body.y += moveDelta;
    body.draw();
})

moveButtonLeft.addEventListener('click', () => {
    if (!doAnimate)
        animate();
    doAnimate = true;
    if (!bounceOffWalls(body, "left"))
        body.x -= moveDelta * 2;
    body.draw();
})

moveButtonRight.addEventListener('click', () => {
    if (!doAnimate)
        animate();
    doAnimate = true;
    if (!bounceOffWalls(body, "right"))
        body.x += moveDelta * 2;
    body.draw();
})


console.log("hi")