let des = document.getElementById('des').getContext('2d')
let snake = new Head(0,0,30,30,'green')
let direction = null
let apple = new Apple(600,300,30,30,'red')

document.addEventListener('keydown', (click) => {
    console.log(click.key)
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

function draw(){
    snake.drawHead()
    apple.drawApple()
}

function refresh(){
    snake.refreshHead()
}

function main(){
    des.clearRect(0,0,1000,600)
    draw()
    refresh()  
}

setInterval(main,120)