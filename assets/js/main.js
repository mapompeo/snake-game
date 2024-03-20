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

// TIMER
let gameTime = document.getElementById('gameTime')
let seconds = 0, minutes = 0, counting = 0

// MOVEMENT
let direction = null
let positionX = null, positionY = null

// START SCREEN
let start = document.getElementsByClassName('start')

// MUSIC
const soundEffectElement = document.getElementById("rangeSoundEffects");
const volumeElement = document.getElementById("rangeVolume");
let bitingAppleAudio = new Audio("assets/sounds/biting-apple.mp3")
let loseAudio = new Audio("assets/sounds/lose.mp3")
let playingAudio = new Audio("assets/sounds/playing.mp3")
let startAudio = new Audio("assets/sounds/start-audio.mp3")
let menuTheme = document.getElementById('menuTheme') // esta variável da parte dos sons é diferente pois o usuário precisa interagir com a página antes de tocar um som, e para isso ela foi definida no html, pois é o único modo de fazer funcionar

// Valores padrão do volume dos sons do jogo (exemplo 0.7)
bitingAppleAudio.volume = 1
loseAudio.volume = 1
playingAudio.volume = 1
startAudio.volume = 1
menuTheme.volume = 1


function play() {

    startAudio.play()
    playingAudio.play()
    menuTheme.pause()

    startMaster[0].style.display = "none";
    seconds = 0
    minutes = 0

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

    document.addEventListener('click', () => {
        for (let i = 0; i < start.length; i++) {
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
        for(i = snakeTail.length -1; i >= 0; i--){
            if(snake.colision(snakeTail[i])){
                snake.killSnake()
            }
        }
        if (snake.colision(apple)) {
            points++
            snakePoints.innerHTML = `PONTOS: ${points}`
            apple.respawnApple()
            // Ao colidir com a maçã, o algoritmo adiciona um objeto da classe body no array, contendo as mesmas propriedades da cabeça da cobra
            snakeTail.push(new Body(snake.x, snake.y, snake.w, snake.h, snake.a))
        }
        
    }

    function draw(){
        snake.drawHead()
        apple.drawApple()
        // Um loop lendo cada valor do array e desenhando individualmente o tamanho da cobrinha
        positionX = snake.x
        positionY = snake.y
        for(i = snakeTail.length - 1; i >= 0; i--){
            snakeTail[i].drawBody()
        }
    }

    function refresh(){
        snake.refreshHead()
        // Esse algoritmo serve para desenhar a cauda da cobra com base no elemento anterior
        for (i = snakeTail.length -1; i >= 0; i--){
            if (i === 0) {
                snakeTail[i].x = positionX
                snakeTail[i].y = positionY
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
            draw()
            refresh()
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


// AUDIO

// Funções para salvar no navegador o volume que o usuário definir no input range
// function saveVolume() {
//     const volume = document.getElementById("rangeVolume").value;
//     localStorage.setItem("volume", volume);
//   }
  
//   window.onload = function() {
//     const volume = localStorage.getItem("volume");
//     if (volume) {
//       document.getElementById("rangeVolume").value = volume;
//     }
// }

// function saveVolume() {
//     const volume = document.getElementById("rangeSoundEffects").value;
//     localStorage.setItem("volume", volume);
//   }
  
//   window.onload = function() {
//     const volume = localStorage.getItem("volume");
//     if (volume) {
//       document.getElementById("rangeSoundEffects").value = volume;
//     }
// }











// CÓDIGO ANTIGO QUE NÃO ESTAVA FUNCIONANDO
// Funções para alterar o volume dos sons e músicas do jogo dependendo do valor do input range na aba de definições
// soundEffectElement.addEventListener("change", () => {
//     bitingAppleAudio.volume = soundEffectElement
//     loseAudio.volume = soundEffectElement
//     startAudio.volume = soundEffectElement
// })

// volumeElement.addEventListener("change", () => {
//     menuTheme.volume = volumeElement
//     playingAudio.volume = volumeElement
// })




// CÓDIGO AINDA NÃO FINALIZADO POIS ACABOU O TEMPO DE AULA
const soundEffectElementAudio = document.getElementById("rangeSoundEffects");
const volumeElementAudio = document.getElementById("rangeVolume");

// Função para atualizar o volume com base no valor do range
function updateVolume(element) {
  const volume = element.value / 100; // Normaliza o valor entre 0 e 1
  // Insira aqui o código para alterar o volume do áudio (substitua 'elementoAudio' pelo seu elemento de áudio)
  elementoAudio.volume = volume;
}

// Adiciona evento 'onchange' para cada range
soundEffectElement.addEventListener("change", () => updateVolume(soundEffectElementAudio));
volumeElement.addEventListener("change", () => updateVolume(volumeElementAudio));






// END AUDIO