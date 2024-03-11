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