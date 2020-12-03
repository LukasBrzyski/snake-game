const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//podstawowa jednostka w grze
const box = 32;

const foodImg = new Image();
foodImg.src = "img/food.png";

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 18 + 2) * box
}

let score = 0;

// sterowanie

let d;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if (event.keyCode == 38 && d != "DOWN") d = "UP";
    else if (event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if (event.keyCode == 40 && d != "UP") d = "DOWN";
}

// kolizje
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

// rysujemy w canvas
function draw() {
    ctx.fillStyle = "rgb(125, 150, 135)";
    ctx.fillRect(0, 0, 608, 704);
    ctx.fillStyle = "rgb(0, 15, 14)";
    ctx.fillRect(0, 0, 608, 64);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0, 15, 14)";
    ctx.strokeRect(0, 0, 608, 704);


    for (let i = 0; i < snake.length; i++) {
        // ciało węża
        ctx.fillStyle = "rgb(0, 15, 14)";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(125, 150, 135)";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);

        // wypełnienie głowy
        if (i == 0) {
            ctx.fillStyle = "rgb(125, 150, 135)";
            ctx.fillRect(snake[i].x + 5, snake[i].y + 5, box - 10, box - 10);
        }
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // pozycja bieżącej głowy
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // kierunki
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // wąż zjada owoce
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 18 + 2) * box
        }
    } else {
        // usuwamy ogon
        snake.pop();
    }

    // dodajemy nową głowę
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over
    if (snakeX < 0 || snakeX > 18 * box || snakeY < 2 * box || snakeY > 21 * box || collision(newHead, snake)) {
        clearInterval(game);
        document.location.reload();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "rgb(125, 150, 135)";
    ctx.font = "45px sans-serif";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 200);