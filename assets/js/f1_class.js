class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }

}

class Head extends Obj{
    drawHead(){
        des.beginPath()
        des.fillRect(this.x,this.y,this.w,this.h)
    }

    refreshHead() {
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

}

class Apple extends Obj{

}

