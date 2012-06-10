var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var keycode;

var character = new Image();
character.src = 'public/graphics/male_walkcycle.png';
var characterInfo = {
	name:"BOB",
	speed: 5,
	x:30,
	y:30,
	sx:0,
	sy:0,
	w:64,
	h:64,
}

function init(){
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	return setInterval(draw, 1000/60);
}

function clear(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw(event){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	clear();
	ctx.drawImage(character, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, characterInfo.x, characterInfo.y, characterInfo.w, characterInfo.h);
	document.onkeydown = function(event) {
  		switch (event.keyCode) {
    		case 37: // Left
      			characterInfo.x -= characterInfo.speed;
    		break;

    		case 38: // Up
      			characterInfo.y -= characterInfo.speed;
    		break;

    		case 39: // Right
      			characterInfo.x += characterInfo.speed;
    		break;

    		case 40: // Down
      			characterInfo.y += characterInfo.speed;
    		break;
  		}
	};
}

init();