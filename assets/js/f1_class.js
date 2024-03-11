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
}

class Body extends Obj{

}

class Apple extends Obj{

}