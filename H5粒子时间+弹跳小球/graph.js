//定义小球栈
var balls = [];
//存取颜色数组
var colors = ['#00FF00','#006EFF','#E66EFF','#FF6E00','#FFFF00','#C8F4FA','#9664FA','#FEC783'];
//需要展示的时间
var curShowTime = 0;

window.onload = function () {
	var canvas = document.getElementById("container");
	var context = canvas.getContext("2d");
    curShowTime = getCurShowTime();
    drawTime(context);
    // setInterval(function () {
    //     draw(context);
    //     update();
    // },50);
}

//获取当前要展示的时间
function getCurShowTime() {
    var dt = new Date();    
    var time = [dt.getHours(),dt.getMinutes(),dt.getSeconds()];
    for (var i = 0; i < time.length; i++) {
        if(time[i] < 10) {
            time[i] = '0' + time[i];
        }
        time[i] = "" + time[i];
    }
    return time;
}

//绘制
function drawTime(ctx) {

    var hours = parseInt(curShowTime[0]);
    var minutes = parseInt(curShowTime[1]);
    var seconds = parseInt(curShowTime[2]);
    renderDigit( 30 , 60 , parseInt(hours/10) , ctx )
    renderDigit( 30 + 15*(10) , 60 , parseInt(hours%10) , ctx )
    renderDigit( 30 + 30*(10) , 60 , 10 , ctx )
    renderDigit( 30 + 39*(10) , 60 , parseInt(minutes/10) , ctx);
    renderDigit( 30 + 54*(10) , 60 , parseInt(minutes%10) , ctx);
    renderDigit( 30 + 69*(10) , 60 , 10 , ctx);
    renderDigit( 30 + 78*(10) , 60 , parseInt(seconds/10) , ctx);
    renderDigit( 30 + 93*(10) , 60 , parseInt(seconds%10) , ctx);

}

function renderDigit( x , y , num , cxt ){

    cxt.fillStyle = "#FF0000";
    console.log(num);
    for( var i = 0 ; i < numbers[num].length ; i ++ )
        for(var j = 0 ; j < numbers[num][i].length ; j ++ )
            if( numbers[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(10)+10 , y+i*2*10+10, 10 , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}


//绘制小球
function draw (ctx) {
    ctx.clearRect(0,0,1200,700);
    for (var i in balls) {
        ctx.beginPath();
        ctx.fillStyle = balls[i].color;
        ctx.arc(balls[i].x,balls[i].y,balls[i].r,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fill();
    }
}


//更新时间
function updateTime(ctx) {
	var dt = new Date();
	var time = [dt.getHours(),dt.getMinutes(),dt.getSeconds()];
	var leftNum = [],rightNum = [];
	var nextNum = []; 
	for (var i = 0; i < time.length; i++) {
		if(time[i] < 10) {
			leftNum[i] = 0;
			rightNum[i] = time[i];
		} else {
			leftNum[i] = parseInt(time[i] / 10);
			rightNum[i] = time[i] % 10;
		}
		if(i == 0) {
			nextNum[i] = (leftNum[i] + 1) % 3;
		} else {
			nextNum[i*2] = (leftNum[i] + 1) % 10;
		}
		nextNum[i*2 + 1] = (rightNum[i] + 1) % 10;
		drawTime(i,leftNum[i],rightNum[i],ctx);
	}
	for (var i = 0;i < 2;i++) {
		drawDots(i,ctx);
	}	
}

//绘制冒号
function drawDots (leftbeigin,ctx) {
	for (var i = 0; i < numbers[10].length; i++) {
		for (var j = 0; j < numbers[10][0].length; j++) {
			if(numbers[10][i][j] == 1) {
				ctx.beginPath();
				ctx.fillStyle = "#FF0000";
				ctx.arc(346+leftbeigin*414+j*22,100+i*22,10,0,Math.PI*2,true);
				ctx.fill();
				// ctx.fillRect(100 + j*20,100 + i*20,20,20);
				ctx.closePath();
			}
		}
	}
}

//添加小球
function addball (x,y) {
    var ball = {
        x:x,
        y:y,
        r:15,
        vx:Math.floor(Math.random()*8)+1,
        vy:Math.floor(Math.random()*10)+1,
        g:2,
        f:0.75,
        color:colors[Math.floor(Math.random()*8)]
    }
    balls.push(ball);
}

//更新数据
function updateballs () {
    for(var i in balls) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if(balls[i].y >= 670) {
            balls[i].vy = - balls[i].vy*balls[i].f;
        }
    }
}


//存取数据数组
var numbers = [
    [
        [0,0,1,1,1,0,0],
        [0,1,1,0,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,0,1,1,0],
        [0,0,1,1,1,0,0]
    ],//0
    [
        [0,0,0,1,1,0,0],
        [0,1,1,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [1,1,1,1,1,1,1]
    ],//1
    [
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,0,0],
        [0,0,1,1,0,0,0],
        [0,1,1,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,1,1],
        [1,1,1,1,1,1,1]
    ],//2
    [
        [1,1,1,1,1,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,0,0],
        [0,0,1,1,1,0,0],
        [0,0,0,0,1,1,0],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0]
    ],//3
    [
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,1,0],
        [0,0,1,1,1,1,0],
        [0,1,1,0,1,1,0],
        [1,1,0,0,1,1,0],
        [1,1,1,1,1,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,0,1,1,0],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,1,1]
    ],//4
    [
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,1,1,1,1,0],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0]
    ],//5
    [
        [0,0,0,1,1,1,0],
        [0,0,1,1,0,0,0],
        [0,1,1,0,0,0,0],
        [1,1,0,0,0,0,0],
        [1,1,0,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0]
    ],//6
    [
        [1,1,1,1,1,1,1],
        [1,1,0,0,0,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0],
        [0,0,1,1,0,0,0],
        [0,0,1,1,0,0,0],
        [0,0,1,1,0,0,0],
        [0,0,1,1,0,0,0]
    ],//7
    [
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,1,1,0]
    ],//8
    [
        [0,1,1,1,1,1,0],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [1,1,0,0,0,1,1],
        [0,1,1,1,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,0,1,1],
        [0,0,0,0,1,1,0],
        [0,0,0,1,1,0,0],
        [0,1,1,0,0,0,0]
    ],//9
    [
        [0,0,0,0],
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0],
        [0,0,0,0]
    ]//:
];