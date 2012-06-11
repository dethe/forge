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

//lists what keys are pressed
var key = {
	w: false,
	w_: false,
	a: false,
	a_: false,
	s: false,
	s_: false,
	d: false,
	d_: false
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
	
	if(key.w){
		characterInfo.sy = 0;
		characterInfo.y -= characterInfo.speed;
	}else if(key.a){
		characterInfo.sy = 64;
		characterInfo.x -= characterInfo.speed;
	}else if(key.s){
		characterInfo.sy = 128;
		characterInfo.y += characterInfo.speed;
	}else if(key.d){
		characterInfo.sy = 192;
		characterInfo.x += characterInfo.speed;
	};
	
	if((frame % 5 === 0) && (key.w|| key.a || key.s || key.d)){
		characterInfo.sx += 64;
	};
	
	if (characterInfo.sx === 576){
	    characterInfo.sx = 64;
    };
	
	if(key.w === false && key.a === false && key.s === false && key.d === false){
		characterInfo.sx = 0;
	};
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
    		case 87: // Left
    		    key.s = key.d = key.a = false;
      			key.w = key.w_ = true;
    		break;

    		case 65: // Up
    		    key.d = key.w = key.s = false;
      			key.a = key.a_ = true;
    		break;

    		case 83: // Right
		        key.w = key.a = key.d = false;
      			key.s = key.s_ = true;
    		break;

    		case 68: // Down
		        key.a = key.w = key.s = false;
      			key.d = key.d_ = true;
    		break;
  		}
};

document.onkeyup = function(event) {
  		switch (event.keyCode) {
    		case 87: // Left
      			key.w = key.w_ = false;
  			    key.s = key.s_;
  			    key.d = key.d_;
  			    key.a = key.a_;
    		break;

    		case 65: // Up
      			key.a = key.a_ = false;
      			key.d = key.d_;
      			key.s = key.s_;
      			key.w = key.w_;
    		break;

    		case 83: // Right
      			key.s = key.s_ = false;
      			key.w = key.w_;
      			key.a = key.a_;
      			key.d = key.d_;
    		break;

    		case 68: // Down
      			key.d = key.d_ = false;
      			key.a = key.a_;
      			key.s = key.s_;
      			key.w = key.w_;
    		break;
  		}
};

init();