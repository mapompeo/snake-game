let des = document.getElementById('des').getContext('2d')
let snake = new Head(60,60,30,30,'green')
let direction = null
let apple = new Apple(600,300,30,30,'red')
let points = 0
let snakeTail = []
let snakeAlive = true
let snakePoints = document.getElementById('snakePoints')
let gameTime = document.getElementById('gameTime')
let seconds = 0
let minutes = 0
let counting = 0

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

        // Ao colidir com a maçã, o algoritmo adiciona um objeto da classe body no array, contendo as mesmas propriedades da cabeça da cobra
        snakeTail.push(new Body(snake.x,snake.y,snake.w,snake.h,snake.a))
        
    }
}

function draw(){
    snake.drawHead()
    apple.drawApple()
    
    // Aqui ele faz um loop lendo cada valor do array e desenhando individualmente
    for(i = snakeTail.length - 1 ; i >= 0; i--){
        snakeTail[i].drawBody()
        console.log(snakeTail)
    }
}

function refresh(){
    snake.refreshHead()


    // Esse algoritmo serve para desenhar a cauda da cobra com base no elemento anterior
    for(i = snakeTail.length -1 ; i >= 0; i--){
        console.log(i)
        if(i === 0){
            snakeTail[i].x = posicaox
            snakeTail[i].y = posicaoy
        }else{
            snakeTail[i].x = snakeTail[i-1].x
            snakeTail[i].y = snakeTail[i-1].y
        }

    }

    checkColision()
    updateTime()
}

let posicaox = null
let posicaoy = null

function main(){
    if(snakeAlive){
        des.clearRect(0,0,810,500)

        posicaox = snake.x
        posicaoy = snake.y

        draw()
        refresh()  

    }
    else{
        seconds = -1
        minutes = 0
        if(window.confirm('Você morreu, quer tentar novamente?')){
            snakeAlive = true
            snake.restartSnake()
        }else{

        }
    }
}

apple.respawnApple()
setInterval(main, 120)
