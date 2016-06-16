
//定义小球栈
var balls = [];
//存取颜色数组
var colors = ['#00FF00','#006EFF','#E66EFF','#FF6E00','#FFFF00','#C8F4FA','#9664FA','#FEC783'];
//创建定时器t1、t2
var t1,t2;

window.onload = function () {
	var canvas = document.getElementById('container');
	var context = canvas.getContext('2d');
	var button = document.getElementById('button');
	button.onclick = function () {
		if(button.innerHTML == '暂停') {
			clearInterval(t1);
			clearInterval(t2);
			button.innerHTML = '开始';
		} else if(button.innerHTML == '开始') {
			t1 = setInterval(function () {
				addball();
			},1000);
			t2 = setInterval(function () {
				draw(context);
				update();
			},50);
			button.innerHTML = '暂停';
		}
	}
}

function update () {
	for(var i in balls) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if(balls[i].y >= 670) {
			balls[i].vy = - balls[i].vy*balls[i].f;
		}
	}
}

function draw (ctx) {
	// var num = Math.floor(Math.random()*8);
	ctx.clearRect(0,0,1200,700);
	for (var i in balls) {
		ctx.beginPath();
		ctx.fillStyle = balls[i].color;
		ctx.arc(balls[i].x,balls[i].y,balls[i].r,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	}
}

//添加小球
function addball () {
	var ball = {
		x:0,
		y:100,
		r:15,
		vx:Math.floor(Math.random()*8)+1,
		vy:Math.floor(Math.random()*10)+1,
		g:2,
		f:0.75,
		color:colors[Math.floor(Math.random()*8)]
	}
	balls.push(ball);
}


