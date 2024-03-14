let des = document.getElementById('des').getContext('2d')
let snake = new Head(0,0,30,30,'green')
let direction = null
let apple = new Apple(600,300,30,30,'red')
let points = 0
let snakePoints = document.getElementById('snakePoints')
let gameTime = document.getElementById('gameTime')
var seconds = 0;
var minutes = 0;
var counting = 0;

snakePoints.innerHTML = `PONTOS: ${points}`


document.addEventListener('keydown', (click) => {
    if (click.key === 'a' || click.key === 'ArrowLeft') {
        direction = 'left'
    }
    else if (click.key === 'd' || click.key === 'ArrowRight') {
        direction = 'right'
    }
    else if (click.key === 'w' || click.key === 'ArrowUp') {
        direction = 'up'
    }
    else if (click.key === 's' || click.key === 'ArrowDown') {
        direction = 'down'
    }
})

function updateTime() {
    if (counting === 0) {
        counting = setInterval(() => {
            seconds++
            if (seconds === 60) {
                seconds = 0
                minutes++
            }
            gameTime.innerText = `Tempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        }, 1000)
    }
}

function checkColision(){
    if(snake.colision(apple)){
        points++
        snakePoints.innerHTML = `PONTOS: ${points}`
        apple.respawnApple()
    }
}

function draw(){
    snake.drawHead()
    apple.drawApple()
}

function refresh(){
    snake.refreshHead()
    checkColision()
    updateTime()
}

function main(){
    des.clearRect(0,0,990,600)
    draw()
    refresh()  
}

apple.respawnApple()
setInterval(main, 120)
