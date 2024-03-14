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
            this.y > 510 - this.h) {
                snakeAlive = false
            }


            // Algoritmo onde a cobra bate na parede e não morre
        // if (this.x <= 0) {
        //         this.x = 0
        //     }
        // else if (this.x >= 800 - this.w) {
        //         this.x = 800 - this.w
        //     }

        // if (this.y <= 0) {
        //         this.y = 0
        //     }
        // else if (this.y >= 510 - this.h) {
        //         this.y = 510 - this.h
        //     }
    }

    colision(reference) {
        if ((this.x < reference.x + reference.w) && 
        (this.x + this.w > reference.x) && 
        (this.y < reference.y + reference.h) &&
        (this.y + this.h> reference.y)
        ){
            return true
        }
        else{
            return false
        }
    }

    restartSnake(){
        this.x = 60
        this.y = 60
        points = 0
        direction = ''
        apple.respawnApple()
        snakePoints.innerHTML = `PONTOS: ${points}`
        snakeTail = []
    }
}

class Body extends Obj {
    drawBody(){
        des.fillStyle = this.a
        des.fillRect(this.x, this.y, this.w, this.h)
    }
    
    refreshBody(){
        
    }
}

class Apple extends Obj{
    drawApple(){
        des.fillStyle = this.a
        des.fillRect(this.x, this.y, this.w, this.h)
    }

    respawnApple(){
        // Algoritmo para arredondar os valores aleatórios em valores divisíveis por 30
        let numeroAleatorio = null
        do {
            numeroAleatorio = Math.floor(Math.random() * (((800 - this.w) - 30 + 1) + 30));
        } 
        while (numeroAleatorio % 30 !== 0);
        this.x = numeroAleatorio

        do {
            numeroAleatorio = Math.floor(Math.random() * (((500 - this.h) - 30 + 1) + 30));
        } 
        while (numeroAleatorio % 30 !== 0);
        this.y = numeroAleatorio
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