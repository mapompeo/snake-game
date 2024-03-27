class Obj {
    constructor(x, y, w, h, a, radio, fixedAngle){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
        this.radio = radio
        this.fixedAngle = fixedAngle
        // this.finalAngle = finalAngle
    }
}

let finalAngle = 0
let overX = 0
let overY = 0
let rightEyeOverX = 0
let rightEyeOverY = 0
let leftEyeOverX = 0
let leftEyeOverY = 0
class Head extends Obj {
    drawHead() {
        des.beginPath()
        // Convertendo os ângulos para radianos
        let startAngle = this.fixedAngle * Math.PI / 180
        let endAngle = finalAngle * Math.PI / 180
    
        des.fillStyle = this.a
        des.arc(this.x - (overX), this.y - (overY), 15, startAngle, endAngle)
        des.closePath()
        des.fill()
  
// Olho direito
        des.beginPath()
        des.fillStyle = 'black'
        des.rect(this.x-rightEyeOverX, this.y-rightEyeOverY,4,4)
        des.closePath()
        des.stroke()
        des.fill()

// Olho esquerdo
        des.beginPath()
        des.fillStyle = 'black'
        des.rect(this.x-leftEyeOverX, this.y-leftEyeOverY,4,4)
        des.closePath()
        des.stroke()
        des.fill()
    }

    refreshHead() {
        switch (direction) {
            case ('left'):
                this.x -= 30  
                this.fixedAngle = 90
                finalAngle = 270
                overY = -15 
                overX = -30

                rightEyeOverX = -20
                rightEyeOverY = -22
                leftEyeOverX = -20
                leftEyeOverY = -4
                break
            case ('right'):
                this.x += 30
                this.fixedAngle = 270
                finalAngle = 90
                overY = -15 
                overX = 0

                leftEyeOverX = -5
                leftEyeOverY = -3
                rightEyeOverX = -5
                rightEyeOverY = -23
                break
            case ('up'):
                this.y -= 30
                this.fixedAngle = 180
                finalAngle = 0
                overX = -15 
                overY = -30
                
                leftEyeOverX = -4
                leftEyeOverY = -20
                rightEyeOverX = -23
                rightEyeOverY = -20
                break
            case ('down'):
                this.y += 30
                this.fixedAngle = 0
                finalAngle = 180
                overX = -15 
                overY = 0

                leftEyeOverX = -3
                leftEyeOverY = -5
                rightEyeOverX = -22
                rightEyeOverY = -5
                break
        }

        if (this.x < 0 || 
            this.x > 810 - this.w || 
            this.y < 0 || 
            this.y > 510 - this.h ) {
                snake.killSnake()
            }

           
            // Algoritmo onde a cobra bate na parede e não morre
            // Por favor pompeo (scrum master) não apague
        // if (this.x <= 0) {
        //         this.x = 0
        //     }
        // else if (this.x >= 810 - this.w) {
        //         this.x = 810 - this.w
        //     }

        // if (this.y <= 0) {
        //         this.y = 0
        //     }
        // else if (this.y >= 510 - this.h) {
        //         this.y = 510 - this.h
        //     }
    }

    killSnake(){
        snakeAlive = false
        playAgainMaster[0].style.display = "block";
        loseAudio.play()
        playingAudio.pause()
        menuTheme.play()
        clearInterval(counting)
        snakePointsDead.innerHTML = `PONTOS: ${points}`
        gameTimeDead.innerHTML = `TEMPO: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    colision(reference) {
        if ((this.x < reference.x + reference.w) && 
        (this.x + this.w > reference.x) && 
        (this.y < reference.y + reference.h) &&
        (this.y + this.h> reference.y)
        ) {
            return true
        }
        else {
            return false
        }
    }

    // nao apagar ainda pq n sei se isso é importante
    restartSnake(){
        startAudio.play()
        playingAudio.play()
        menuTheme.pause()
        playAgainMaster[0].style.display = "none"; 
        snake = new Head(60,60,30,30,'#4BAD00')
        points = 0
        direction = 'right'
        seconds = 0
        minutes = 0
        counting = 0
        apple.respawnApple()
        snakePoints.innerHTML = `PONTOS: ${points}`
        snakeTail = []
        snakeTail.push(new Body(snake.x-30, snake.y, snake.w, snake.h, snake.a))
        snakeAlive = true
        gameTime.innerText = `TEMPO: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
}

class Body extends Obj {
    drawBody(){
        des.fillStyle = this.a
        des.fillRect(this.x, this.y, this.w, this.h)
        
    }
}

class Apple extends Obj{
    drawApple(){
        let image = new Image()
        // Função para executar uma ação específica quando a imagem for totalmente carregada na página
        image.onload = () => {
            des.drawImage(image, this.x, this.y, this.w, this.h)
        }
        image.src = this.a
    }

    respawnApple(){
        // Algoritmo para arredondar os valores aleatórios em valores divisíveis por 30
        let randomNumber = null
        do {
            randomNumber = Math.floor(Math.random() * (((810 - this.w) - 30 + 1) + 30));
        } 
        while (randomNumber % 30 !== 0)
        this.x = randomNumber

        do {
            randomNumber = Math.floor(Math.random() * (((510 - this.h) - 30 + 1) + 30));
        } 
        while (randomNumber % 30 !== 0)
        this.y = randomNumber

        this.checkAppleRespawnPosition()
    }
    
    checkAppleRespawnPosition(){
        for(let i = snakeTail.length - 1; i >= 0; i--){
            if(this.x == snakeTail[i].x && this.y == snakeTail[i].y){
                this.respawnApple()
            }
        }
    }
}