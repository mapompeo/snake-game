// CANVAS
let des = document.getElementById('des').getContext('2d')

// SNAKE
let snake = new Head(255, 404, 30, 30, '4BAD00')
let snakeTail = []
let snakeAlive = true

// ITEMS
let apple = new Apple(600, 300, 30, 30, '../assets/images/apple.svg',)
let points = 0
let snakePoints = document.getElementById('snakePoints')
let personalRecord = document.getElementById('personalRecord')
let gameInterval

// CARDS
let startMasterDOM = document.getElementsByClassName('startMasterDOM')
let startMaster = document.getElementsByClassName('startMaster')
let playAgainMaster = document.getElementsByClassName('playAgainMaster')
let creditsMaster = document.getElementsByClassName('creditsMaster')
let definitionsMaster = document.getElementsByClassName('definitionsMaster')
let snakePointsDead = document.getElementById('snakePointsDead')
let gameTimeDead = document.getElementById('gameTimeDead')
let swipeMaster = document.getElementsByClassName('swipeMaster')

// TIMER
let gameTime = document.getElementById('gameTime')
let seconds = 0, minutes = 0, counting = 0

// MOVEMENT
let direction = 'right'
let positionX = null, positionY = null

// MUSIC
let bitingAppleAudio = new Audio("assets/sounds/biting-apple.mp3")
let loseAudio = new Audio("assets/sounds/lose.mp3")
let playingAudio = new Audio("assets/sounds/playing.mp3")
let startAudio = new Audio("assets/sounds/start-audio.mp3")
let menuTheme = new Audio("assets/sounds/menu-theme.mp3")
const soundEffectElement = document.getElementById("rangeSoundEffects");
const volumeElement = document.getElementById("rangeVolume");
menuTheme.loop = true
playingAudio.loop = true

bitingAppleAudio.volume = 0.1
loseAudio.volume = 0.1
playingAudio.volume = 0.1
startAudio.volume = 0.1
menuTheme.volume = 0.1

// USER ORIENTATION
const portraitElementMaster = document.getElementsByClassName("portraitElementMaster");


function isMobile() {
    return navigator.userAgent.match(/Android|iPhone|iPad/i);
}



document.addEventListener('DOMContentLoaded', function () {
    // Código para aparecer os cards no modo dispositivo móvel
    if (isMobile()) {
        swipeMaster[0].style.display = "block"
        startMasterDOM[0].style.display = "none"
    }

    if (window.innerHeight > window.innerWidth) {
        startMasterDOM[0].style.display = "none"
        swipeMaster[0].style.display = "none"
        portraitElementMaster[0].style.display = "block"
    } else {
        startMasterDOM[0].style.display = "block"
        portraitElementMaster[0].style.display = "none"
    }



    // Código para funcionar o range input dos sons
    function updateSoundEffects(element) {
        const volume = element.value / 100 // Normaliza o valor entre 0 e 1
        bitingAppleAudio.volume = volume
        loseAudio.volume = volume
        startAudio.volume = volume
    }

    function updateVolume(element) {
        const volume = element.value / 100
        menuTheme.volume = volume
        playingAudio.volume = volume
    }
    soundEffectElement.addEventListener("change", () => updateSoundEffects(soundEffectElement));
    volumeElement.addEventListener("change", () => updateVolume(volumeElement));
})

// Função para recarregar a página
function reload() {
    location.reload();
}

// função para começar a funcionar os áudios e ir para o card principal do menu
function startHTML() {
    menuTheme.play()
    portraitElementMaster[0].style.display = "none"
    startMaster[0].style.display = "block"
    startMasterDOM[0].style.display = "none"
}

// Conjunto de funções para funcionar a parte principal do jogo
function play() {
    snake.restartSnake()
    startMaster[0].style.display = "none"

    // 
    document.addEventListener('keydown', (click) => {
        if (click.key === 'a' || click.key === 'A' || click.key === 'ArrowLeft') {
            direction = 'left'
        }
        else if (click.key === 'd' || click.key === 'D' || click.key === 'ArrowRight') {
            direction = 'right'
        }
        else if (click.key === 'w' || click.key === 'W' || click.key === 'ArrowUp') {
            direction = 'up'
        }
        else if (click.key === 's' || click.key === 'S' || click.key === 'ArrowDown') {
            direction = 'down'
        }
    })

    // Eventos de toque
    let touchStartX, touchStartY;
    document.addEventListener('touchstart', function (event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    });

    document.addEventListener('touchmove', function (event) {
        const touchEndX = event.touches[0].clientX;
        const touchEndY = event.touches[0].clientY;

        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                direction = 'right';
            } else {
                direction = 'left';
            }
        } else {
            if (dy > 0) {
                direction = 'down';
            } else {
                direction = 'up';
            }
        }
    });

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

    function checkColision() {
        for (i = snakeTail.length - 1; i >= 0; i--) {
            if (snake.colision(snakeTail[i])) {
                snake.killSnake()
            }
        }
        if (snake.colision(apple)) {
            points++
            snakePoints.innerHTML = `PONTOS: ${points}`
            apple.respawnApple()
            snakeTail.push(new Body(snake.x, snake.y, snake.w, snake.h, snake.a))
        }
    }

    function draw() {
        snake.drawHead()
        apple.drawApple()
        // Um loop lendo cada valor do array e desenhando individualmente o tamanho da cobrinha
        positionX = snake.x
        positionY = snake.y
    }

    function refresh() {
        snake.refreshHead()
        // Esse algoritmo serve para desenhar a cauda da cobra com base no elemento anterior
        for (i = snakeTail.length - 1; i >= 0; i--) {
            if (i === 0) {
                snakeTail[i].x = positionX
                snakeTail[i].y = positionY
            } else {
                snakeTail[i].x = snakeTail[i - 1].x
                snakeTail[i].y = snakeTail[i - 1].y
            }
            snakeTail[i].drawBody()
        }
        checkColision()
        updateTime()
    }

    function main() {
        if (snakeAlive) {
            des.clearRect(0, 0, 810, 510)
            refresh()
            draw()
        }
    }

    // Função parar cancelar o intervalo de jogo existente caso houver
    if (gameInterval) {
        clearInterval(gameInterval)
    }

    gameInterval = setInterval(main, 170)
    apple.respawnApple()
}

function stopGame() {
    snakeAlive = false
    seconds = 0
    minutes = 0
    counting = 0
    direction = null
    snakePoints.innerHTML = `PONTOS: ${points}`
    gameTime.innerText = `TEMPO: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    apple.respawnApple()
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
    menuTheme.play()
    playAgainMaster[0].style.display = "none";
    startMaster[0].style.display = "block";
}

function closeSwipe() {
    startMaster[0].style.display = "none"
    swipeMaster[0].style.display = "none";
    startMasterDOM[0].style.display = "block";
}
// END CARD FUNCTIONS



// RECORD
let recordPointsLoaded = null
window.onload = function () {
    recordPointsLoaded = localStorage.getItem('recordPointsStorage') || 0
    personalRecord.innerHTML = `RECORDE: ${recordPointsLoaded}`
}
// END RECORD