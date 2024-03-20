class Obj {
    constructor(x, y, w, h, a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }
}

class Head extends Obj {
    drawHead() {
        des.fillStyle = this.a
        des.fillRect(this.x, this.y, this.w, this.h)
    }

    refreshHead() {
        switch (direction) {
            case ('left'):
                this.x -= 30
                break
            case ('right'):
                this.x += 30
                break
            case ('up'):
                this.y -= 30
                break
            case ('down'):
                this.y += 30
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
        des.fillStyle = this.a
        des.fillRect(this.x, this.y, this.w, this.h)
    }

    respawnApple(){
        // Algoritmo para arredondar os valores aleatórios em valores divisíveis por 30
        let randomNumber = null
        do {
            randomNumber = Math.floor(Math.random() * (((800 - this.w) - 30 + 1) + 30));
        } 
        while (randomNumber % 30 !== 0);
        this.x = randomNumber

        do {
            randomNumber = Math.floor(Math.random() * (((500 - this.h) - 30 + 1) + 30));
        } 
        while (randomNumber % 30 !== 0);
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