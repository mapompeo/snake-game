let des = document.getElementById('des').getContext('2d')

let snake = new Head(0,0,30,30,'green')
let direction = null

let apple = new Apple(600,300,30,30,'red')


function main(){
    des.clearRect(0,0,1000,600)
    draw()
    refresh()  
}

setInterval(main,120)