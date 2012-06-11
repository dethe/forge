var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var frame = 0;

var keycode;

//loads images
var character = new Image();
character.src = 'public/graphics/male_walkcycle.png';
var pants = new Image();
pants.src = 'public/graphics/male_pants.png';
var barrels = new Image();
barrels.src = 'public/graphics/barrels.png';
var grass = new Image();
grass.src = 'public/graphics/grass.png';
var dirt = new Image();
dirt.src = 'public/graphics/dirt.png';

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

//lists what direction we're moving ( _m is to remember previous keys still pressed )
var move = {
	up: false,
	up_m: false,
	left: false,
	left_m: false,
	down: false,
	down_m: false,
	right: false,
	right_m: false
}

//====================================\\
//ITEMS THAT CAN BE USED IN WORLD ARRAY
//====================================\\
//BARRELS: barrel, barrels1, barrels1
//BUCKETS
//DIRT: dirtNW, dirtN, dirtNE, dirtE, dirtSE, dirtS, dirtSW, dirtW, dirt1, dirt2, dirt3
//DIRT_ROCKS: dirtrocks1, dirtrocks2
//DARK_DIRT: ddirtNW, ddirtN, ddirtNE, ddirtE, ddirtSE, ddirtS, ddirtSW, ddirtW, ddirt1, ddirt2, ddirt3
//DARK_DIRT_ROCKS: ddirtrocks1, ddirtrocks2
//GRASS:
//GRASS_ALT:
//WATER:
//WATER_AND_GRASS

var world = [[], [], []]

//starts the game
function init(){
	return setInterval(draw, 1000/60);
}

//function to clear the canvas
function clear(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

//draws on the canvas every 60th of a second
function draw(event){
	frame += 1;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	clear();
	drawworld();
	ctx.drawImage(character, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h);
	ctx.drawImage(pants, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h);
	
	if(move.up=== true){
		characterInfo.sy = 0;
		characterInfo.y -= characterInfo.speed;
	}else if(move.left === true){
		characterInfo.sy = 64;
		characterInfo.x -= characterInfo.speed;
	}else if(move.down === true){
		characterInfo.sy = 128;
		characterInfo.y += characterInfo.speed;
	}else if(move.right === true){
		characterInfo.sy = 192;
		characterInfo.x += characterInfo.speed;
	}
	
	if((frame % 5 === 0) && (move.up|| move.left || move.down || move.right)){
		characterInfo.sx += 64;
	}
	
	if (characterInfo.sx === 576){
	    characterInfo.sx = 64;
    };
	
	if(move.up=== false && move.left === false && move.down === false && move.right === false){
		characterInfo.sx = 0;
	}
}

function drawworld(){
	ctx.drawImage(dirt, 64, 160, 32, 32, -characterInfo.x + (WIDTH/2)+64, -characterInfo.y + (HEIGHT/2)+32, 32, 32);
	ctx.drawImage(dirt, 64, 160, 32, 32, -characterInfo.x + (WIDTH/2)+32, -characterInfo.y + (HEIGHT/2)+32, 32, 32);
	ctx.drawImage(dirt, 64, 160, 32, 32, -characterInfo.x + (WIDTH/2), -characterInfo.y + (HEIGHT/2)+32, 32, 32);
	ctx.drawImage(dirt, 64, 96, 32, 32, -characterInfo.x + (WIDTH/2)+96, -characterInfo.y + (HEIGHT/2)+32, 32, 32);
	ctx.drawImage(dirt, 64, 128, 32, 32, -characterInfo.x + (WIDTH/2)+96, -characterInfo.y + (HEIGHT/2)+64, 32, 32);
	ctx.drawImage(dirt, 32, 128, 32, 32, -characterInfo.x + (WIDTH/2)+64, -characterInfo.y + (HEIGHT/2)+64, 32, 32);
	ctx.drawImage(dirt, 32, 128, 32, 32, -characterInfo.x + (WIDTH/2)+32, -characterInfo.y + (HEIGHT/2)+64, 32, 32);
	ctx.drawImage(dirt, 32, 128, 32, 32, -characterInfo.x + (WIDTH/2), -characterInfo.y + (HEIGHT/2)+64, 32, 32);
	ctx.drawImage(dirt, 0, 128, 32, 32, -characterInfo.x + (WIDTH/2)-32, -characterInfo.y + (HEIGHT/2)+64, 32, 32);
	ctx.drawImage(dirt, 0, 96, 32, 32, -characterInfo.x + (WIDTH/2)-32, -characterInfo.y + (HEIGHT/2)+32, 32, 32);
	ctx.drawImage(dirt, 0, 64, 32, 32, -characterInfo.x + (WIDTH/2)-32, -characterInfo.y + (HEIGHT/2), 32, 32);
	ctx.drawImage(dirt, 32, 64, 32, 32, -characterInfo.x + (WIDTH/2), -characterInfo.y + (HEIGHT/2), 32, 32);
	ctx.drawImage(dirt, 32, 64, 32, 32, -characterInfo.x + (WIDTH/2)+32, -characterInfo.y + (HEIGHT/2), 32, 32);
	ctx.drawImage(dirt, 32, 64, 32, 32, -characterInfo.x + (WIDTH/2)+64, -characterInfo.y + (HEIGHT/2), 32, 32);
	ctx.drawImage(dirt, 64, 64, 32, 32, -characterInfo.x + (WIDTH/2)+96, -characterInfo.y + (HEIGHT/2), 32, 32);
};

document.onkeydown = function(event) {
  		switch (event.keyCode) {
    		case 87: // 'w' key
    		case 38: // up arrow
    		    move.down = move.right = move.left = false;
      			move.up= move.up_m = true;
    		break;

    		case 65: // 'a' key
    		case 37: // left arrow
    		    move.right = move.up= move.down = false;
      			move.left = move.left_m = true;
    		break;

    		case 83: // 's' key
    		case 40: // down arrow
		        move.up= move.left = move.right = false;
      			move.down = move.down_m = true;
    		break;

    		case 68: // 'd' key
    	    case 39: // right arrow
		        move.left = move.up= move.down = false;
      			move.right = move.right_m = true;
    		break;
  		}
};

document.onkeyup = function(event) {
  		switch (event.keyCode) {
    		case 87: // 'w' key
    		case 38: // up arrow
      			move.up= move.up_m = false;
  			    move.down = move.down_m;
  			    move.right = move.right_m;
  			    move.left = move.left_m;
    		break;

    		case 65: // 'a' key
    		case 37: // left arrow
      			move.left = move.left_m = false;
      			move.right = move.right_m;
      			move.down = move.down_m;
      			move.up= move.up_m;
    		break;

    		case 83: // 's' key
    		case 40: // down arrow
      			move.down = move.down_m = false;
      			move.up= move.up_m;
      			move.left = move.left_m;
      			move.right = move.right_m;
    		break;

    		case 68: // 'd' key
    	    case 39: // right arrow
      			move.right = move.right_m = false;
      			move.left = move.left_m;
      			move.down = move.down_m;
      			move.up= move.up_m;
    		break;
  		}
};

init();