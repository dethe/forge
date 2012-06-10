var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var keycode;

//loads the character image
var character = new Image();
character.src = 'public/graphics/male_walkcycle.png';

//all the character stats will go here
var characterInfo = {
	name:"ForgePlayer",
	speed: 3,
	x:30,
	y:30,
	sx:0,
	sy:0,
	w:64,
	h:64,
}

//lists what keys are pressed
var key = {
	w:false,
	a:false,
	s:false,
	d:false
}

//starts the game
function init(){
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	return setInterval(draw, 1000/60);
}

//function to clear the canvas
function clear(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

//draws on the canvas every 60th of a second
function draw(event){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	clear();
	ctx.drawImage(character, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, characterInfo.x, characterInfo.y, characterInfo.w, characterInfo.h);
	if(key.w == true){
		characterInfo.y -= characterInfo.speed;
	}else if(key.a == true){
		characterInfo.x -= characterInfo.speed;
	}else if(key.s == true){
		characterInfo.y += characterInfo.speed;
	}else if(key.d == true){
		characterInfo.x += characterInfo.speed;
	};
}

document.onkeydown = function(event) {
  		switch (event.keyCode) {
    		case 87: // Left
      			key.w = true;
    		break;

    		case 65: // Up
      			key.a = true;
    		break;

    		case 83: // Right
      			key.s = true;
    		break;

    		case 68: // Down
      			key.d = true;
    		break;
  		}
};

document.onkeyup = function(event) {
  		switch (event.keyCode) {
    		case 87: // Left
      			key.w = false;
    		break;

    		case 65: // Up
      			key.a = false;
    		break;

    		case 83: // Right
      			key.s = false;
    		break;

    		case 68: // Down
      			key.d = false;
    		break;
  		}
};

init();