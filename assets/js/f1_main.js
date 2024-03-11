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