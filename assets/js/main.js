// CANVAS
let des = document.getElementById('des').getContext('2d')

// SNAKE
let snake = new Head(60,60,30,30,'green')
let snakeTail = []
let snakeAlive = true

// ITEMS
let apple = new Apple(600,300,30,30,'red')
let points = 0
let snakePoints = document.getElementById('snakePoints')

// CARDS
let startMaster = document.getElementsByClassName('startMaster')
let playAgainMaster = document.getElementsByClassName('playAgainMaster')
let creditsMaster = document.getElementsByClassName('creditsMaster')
let definitionsMaster = document.getElementsByClassName('definitionsMaster')
let snakePointsDead = document.getElementById('snakePointsDead')
let gameTimeDead = document.getElementById('gameTimeDead')


// MUSIC


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

// TIMER
let gameTime = document.getElementById('gameTime')
let seconds = 0, minutes = 0, counting = 0

// MOVEMENT
let direction = null
let posicaox = null, posicaoy = null

// START SCREEN
let start = document.getElementsByClassName('start')


function play() {

    
    seconds =0
    minutes = 0

    startMaster[0].style.display = "none";

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

    document.addEventListener('click', () => {
        for (let i = 0; i < start.length; i++) {
            start[i].style.display = 'none';
        }
    })

    // Código para o funcionamento do cronômetro
    function updateTime() {
        
        if (counting === 0) {
            counting = setInterval(() => {
                seconds++
                if (seconds === 60) {
                    seconds = 0
                    minutes++
                }
                // Linha para gerar o timer com dois caracteres
                gameTime.innerText = `TEMPO: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            }, 1000)
        }
    }

    function checkColision(){
        if (snake.colision(apple)) {
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
        // Um loop lendo cada valor do array e desenhando individualmente
        for(i = snakeTail.length - 1 ; i >= 0; i--){
            snakeTail[i].drawBody()
            console.log(snakeTail)
        }
    }

    function refresh(){
        snake.refreshHead()
        // Esse algoritmo serve para desenhar a cauda da cobra com base no elemento anterior
        for (i = snakeTail.length -1 ; i >= 0; i--){
            console.log(i)
            if (i === 0) {
                snakeTail[i].x = posicaox
                snakeTail[i].y = posicaoy
            } else {
                snakeTail[i].x = snakeTail[i-1].x
                snakeTail[i].y = snakeTail[i-1].y
            }
        }
        checkColision()
        updateTime()
    }

    function main(){
        if (snakeAlive) {
            des.clearRect(0, 0, 810, 510)
            posicaox = snake.x
            posicaoy = snake.y
            draw()
            refresh()
        } else {
            seconds = -1
            minutes = 0
        }
    }
    apple.respawnApple()
    setInterval(main, 130)
}



// CARD FUNCTIONS

function definitions() {
    startMaster[0].style.display = "none";
    definitionsMaster[0].style.display = "block";
}

function credits() {
    startMaster[0].style.display = "none";
    creditsMaster[0].style.display = "block";
}

function closeDefinitions() {
    definitionsMaster[0].style.display = "none";
    startMaster[0].style.display = "block";
}

function closeCredits() {
    creditsMaster[0].style.display = "none";
    startMaster[0].style.display = "block";
}

function closePlayAgain() {
    playAgainMaster[0].style.display = "none";
    startMaster[0].style.display = "block";
}

// END CARD FUNCTIONS