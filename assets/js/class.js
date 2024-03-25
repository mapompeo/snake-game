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
        des.stroke()
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
                overY = 15 
                overX = 30

                rightEyeOverX = 45
                rightEyeOverY = -1
                leftEyeOverX = 45
                leftEyeOverY = 15
                break
            case ('right'):
                this.x += 30
                this.fixedAngle = 270
                finalAngle = 90
                overY = 15 
                overX = 0

                leftEyeOverX = -5
                leftEyeOverY = 15
                rightEyeOverX = -5
                rightEyeOverY = -1  
                break
            case ('up'):
                this.y -= 30
                this.fixedAngle = 180
                finalAngle = 0
                overX = 15 
                overY = 30
                
                leftEyeOverX = 12
                leftEyeOverY = 32
                rightEyeOverX = 28
                rightEyeOverY = 32
                break
            case ('down'):
                this.y += 30
                this.fixedAngle = 0
                finalAngle = 180
                overX = 15 
                overY = 0

                leftEyeOverX = 28
                leftEyeOverY = -17
                rightEyeOverX = 11
                rightEyeOverY = -17
                break
        }

        if (this.x < 0 || 
            this.x > 810 - this.w || 
            this.y < 0 || 
            this.y > 510 - this.h ) {
                snake.killSnake()
            }
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

    restartSnake(){
        startAudio.play()
        playingAudio.play()
        menuTheme.pause()
        playAgainMaster[0].style.display = "none";
        this.x = 60
        this.y = 60
        points = 0
        direction = ''
        seconds = 0
        minutes = 0
        counting = 0
        apple.respawnApple()
        snakePoints.innerHTML = `PONTOS: ${points}`
        snakeTail = []
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
            randomNumber = Math.floor(Math.random() * (((800 - this.w) - 30 + 1) + 30));
        } 
        while (randomNumber % 30 !== 0)
        this.x = randomNumber

        do {
            randomNumber = Math.floor(Math.random() * (((500 - this.h) - 30 + 1) + 30));
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

class Text{
    drawText(text, x, y, color, font){
        des.fillStyle = color
        des.lineWidth = '5'
        des.font = font
        des.fillText(text, x, y)
    }
}