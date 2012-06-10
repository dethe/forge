var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function init(){
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	return setInterval(draw, 1000/60)
}

function clear(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	clear();
	ctx.fillRect(10,10,10,10);
	
}

init();