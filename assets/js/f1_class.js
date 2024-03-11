class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }
}

class Head extends Obj {
    drawHead(){
        des.beginPath()
        des.fillRect(this.x,this.y,this.w,this.h)
    }

    refreshHead() {
        switch (direction){
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

        if (this.x <= 0) {
                this.x = 0
            }
        else if (this.x >= 1000 - this.w) {
                this.x = 1000 - this.w
            }
            
        if (this.y <= 0) {
                this.y = 0
            }
        else if (this.y >= 600 - this.w) {
                this.y = 600 - this.w
            }
        }

        colision() {

        }
}

class Body extends Obj{
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
        this.x = Math.floor(Math.random() * ((1000 - 2 + 1) + 2))
        this.y = Math.floor(Math.random() * ((600 - 2 + 1) + 2))
    }
}