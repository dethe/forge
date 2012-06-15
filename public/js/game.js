var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var frame = 0;
var keycode;

// UTILITIES

// isArray function borrowed from the Underscore library
var isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
  };

//loads images
var character = loadImage('male_walkcycle');
var pants = loadImage('male_pants');
var shirt = loadImage('male_shirt')

function loadImage(name){
    var img = new Image();
    img.src = 'public/graphics/' + name + '.png';
    return img;
};

function loadImages(){
    var ret = {};
    // Every function has a list of arguments which is almost, but not quite, an array. This is how we turn it into an array:
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(name){
        ret[name] = loadImage(name);
    });
    return ret;
};

var terrain = loadImages('grass', 'dirt', 'barrels', 'sand', 'water');

//all the character stats will go here
var characterInfo = {
	name:'ForgePlayer',
	speed: 4,
	x:640,
	y:320,
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

function Monster(sprite, x, y, direction){
	this.d = 1;
    this.x = x;
    this.y = y;
    this.sprite = new Image();
    this.sprite.src = sprite;
    this.animate_idx = 0;
    this.direction = direction; // 0 = up, 1 = left, 2 = down, 3 = right
}
Monster.prototype.move = function(dx, dy){
	if(this.animate_idx === 2){
		this.d = -1;
	}else if(this.animate_idx === 0){
		this.d = 1;
	}
	if(frame % 5 === 0){
		this.animate_idx = (this.animate_idx + this.d);
	};
    this.x += dx;
    this.y += dy;
};
Monster.prototype.faceEast = function(){
    this.direction = 3;
};
Monster.prototype.faceWest = function(){
    this.direction = 1;
};
Monster.prototype.faceNorth = function(){
    this.direction = 0;
};
Monster.prototype.faceSouth = function(){
    this.direction = 2;
};
Monster.prototype.maybeTurn = function(){
    var roll = Math.round(Math.random() * 1000);
    if (roll < 200){
        this.direction = (this.direction + 3) % 4;
    }else if (roll > 800){
        this.direction = (this.direction + 1) % 4;
    }
};
Monster.prototype.walk = function(){
    var dx, dy;
    if (this.direction % 2){
        // if direction is odd we're going east - west
        dx = (this.direction - 2); // move one pixel left or right
        dy = 0;
    }else{
        // otherwise we're going north - south
        dx = 0;
        dy = (this.direction - 1); // move one pixel up or down
    }
    this.move(dx, dy);
    if (!(frame % 32)){
        this.maybeTurn();
    }
}
Monster.prototype.draw = function(ctx){
    // drawImage(image, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
    ctx.drawImage(this.sprite, this.animate_idx * 32, this.direction * 32, 32, 32, this.x - characterInfo.x, this.y - characterInfo.y, 32, 32);
}

var monsters = [
    new Monster('public/graphics/bat.png', 500,500, 0),
    new Monster('public/graphics/snake.png', 750,200,2),
    new Monster('public/graphics/slime.png', 300,600,1)
]


var world = [
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'sand_NW', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_NE', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'sand_W', 'sand_C', 'sand_C', ['sand_C', 'grass_NW'], ['sand_C', 'grass_N'], ['sand_C', 'grass_NE'], 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'sand_W', 'sand_C', 'sand_C', ['sand_C', 'grass_W'], ['sand_C', 'grass_C'], ['sand_C', 'grass_E'], 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'sand_W', 'sand_C', 'sand_C', ['sand_C', 'grass_SW'], ['sand_C', 'grass_S'], ['sand_C', 'grass_SE'], 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'sand_SW', 'sand_S', 'sand_S', 'sand_S', 'sand_S', 'sand_S', 'sand_S', 'sand_S', 'sand_S', 'sand_S', 'sand_S', 'sand_S', 'sand_SE', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
	['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C']
]

var worldorigin = [0, 0]

//starts the game
function init(){
	return setInterval(draw, 1000/60);
}

//function to clear the canvas
function clear(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

//draws on the canvas every 60th of a second
function draw(){
	frame += 1;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	clear();
	drawworld();
	monsters.forEach(function(monster){
	    monster.walk();
	    monster.draw(ctx);
    });
	ctx.drawImage(character, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h);
	ctx.drawImage(pants, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h);
	ctx.drawImage(shirt, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h)
	
	if(move.up && findCharTile(0, characterInfo.speed) !== 'water_C'){
		characterInfo.sy = 0;
		characterInfo.y -= characterInfo.speed;
	}else if(move.left && findCharTile(characterInfo.speed + 5, 0) !== 'water_C'){
		characterInfo.sy = 64;
		characterInfo.x -= characterInfo.speed;
	}else if(move.down && findCharTile(0, -characterInfo.speed - 64) !== 'water_C'){
		characterInfo.sy = 128;
		characterInfo.y += characterInfo.speed;
	}else if(move.right && findCharTile(-characterInfo.speed - 40, 0) !== 'water_C'){
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

function findCharTile(xOffset, yOffset, findCollision){
	var tile;
	var tilesY = Math.round((characterInfo.y - yOffset) / 32);
	var tilesX = Math.round((characterInfo.x - xOffset) / 32);
	tile = world[tilesY][tilesX];
	if(!!findCollision && isArray(world[tilesY][tilesX])){
		if(world[tilesY][tilesX][0] === 'water_C'){
			return true;
		}else{
			return false;
		}
	}else if(!!findCollision){
		return false;
	}else{
		return tile;
	}
}

var offsets = {
    NW: {x: 0, y: 64},
    N: {x: 32, y: 64},
    NE: {x: 64, y: 64},
    E: {x: 64, y: 96},
    SE: {x: 64, y: 128},
    S: {x: 32, y: 128},
    SW: {x: 0, y: 128},
    W: {x: 0, y: 96},
    C: {x: 32, y: 96},
    C2: {x: 64, y: 160},
    C3: {x: 32, y: 160},
    C4: {x: 0, y: 160},
    INW: {x: 32, y: 0},
    INE: {x: 64, y: 0},
    ISW: {x: 32, y: 32},
    ISE: {x: 64, y: 32}
}

function drawTile(spec, tx, ty){
    var tile_offset = spec.split('_'),
        tile = terrain[tile_offset[0]],
        offset = offsets[tile_offset[1]];
	var image = {
		g:tile,
		sx:offset.x,
		sy:offset.y,
		w:32,
		h:32,
		x:  ((tx - worldorigin[0])*32) + ((WIDTH/2) - characterInfo.x),
		y: ((ty - worldorigin[1])*32) + ((HEIGHT/2) - characterInfo.y)
	}
	ctx.drawImage(image.g, image.sx, image.sy, image.w, image.h, image.x, image.y, image.w, image.h)
}

function drawworld(){
	for(var i = 0; i < world.length; i++){
		for(var e = 0; e < world[i].length; e++){
		    var spec = world[i][e];
		    if (!spec) continue;
		    if (isArray(spec)){
		        spec.forEach(function(subspec){
		            drawTile(subspec,e,i);
	            });
	        }else{
	            drawTile(spec,e,i);
            }
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