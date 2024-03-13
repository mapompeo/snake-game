let des = document.getElementById('des').getContext('2d')
let snake = new Head(0,0,30,30,'green')
let direction = null
let apple = new Apple(600,300,30,30,'red')
let points = 0
let snakePoints = document.getElementById('snakePoints')

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
}

function main(){
    des.clearRect(0,0,990,600)
    draw()
    refresh()  
}

apple.respawnApple()
setInterval(main,120)
