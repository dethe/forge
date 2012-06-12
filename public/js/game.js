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
var bat = new Image();
bat.src = 'public/graphics/bat.png';

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

var world = [
	["dirtNW", "dirtN", "dirtN", "dirtN", "dirtNE"],
	["dirtW", "dirt", "dirt", "dirt", "dirtE"],
	["dirtW", "dirt", "dirt", "dirt", "dirtE"],
	["dirtW", "dirt", "dirt", "dirt", "dirtE"],
	["dirtSW", "dirtS", "dirtS", "dirtS", "dirtSE"]
]

var worldorigin = [2, 2]

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
	for(var i = 0; i < world.length; i++){
		for(var e = 0; e < world[i].length; e++){
			var image = {
				g:dirt,
				sx:0,
				sy:0,
				w:32,
				h:32,
				x:  ((e - worldorigin[0])*32) + ((WIDTH/2) - characterInfo.x),
				y: ((i - worldorigin[1])*32) + ((HEIGHT/2) - characterInfo.y)
			}
			if(world[i][e] === "dirtNW"){
				image.g = dirt;
				image.sx = 0;
				image.sy = 64;
			}else if(world[i][e] === "dirtN"){
				image.g = dirt;
				image.sx = 32;
				image.sy = 64;
			}else if(world[i][e] === "dirtNE"){
				image.g = dirt;
				image.sx = 64;
				image.sy = 64;
			}else if(world[i][e] === "dirtE"){
				image.g = dirt;
				image.sx = 64;
				image.sy = 96;
			}else if(world[i][e] === "dirtSE"){
				image.g = dirt;
				image.sx = 64;
				image.sy = 128;
			}else if(world[i][e] === "dirtS"){
				image.g = dirt;
				image.sx = 32;
				image.sy = 128;
			}else if(world[i][e] === "dirtSW"){
				image.g = dirt;
				image.sx = 0;
				image.sy = 128;
			}else if(world[i][e] === "dirtW"){
				image.g = dirt;
				image.sx = 0;
				image.sy = 96;
			}else if(world[i][e] === "dirt"){
				image.g = dirt;
				image.sx = 64;
				image.sy = 160;
			}
			ctx.drawImage(image.g, image.sx, image.sy, image.w, image.h, image.x, image.y, image.w, image.h)
		};
	};
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