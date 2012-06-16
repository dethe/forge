var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var frame = 0;
var keycode;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

// UTILITIES

// isArray function borrowed from the Underscore library
var isArray = Array.isArray || function(obj) {
	return Object.prototype.toString.call(obj) == '[object Array]';
  };

//loads images
var character = loadImage('male_walkcycle');
var pants = loadImage('male_pants');
var shirt = loadImage('male_shirt');
var bandana = loadImage('red_bandana');

function loadImage(name){
	var img = new Image();
	img.src = 'public/graphics/' + name + '.png';
	return img;
}

function loadImages(){
	var ret = {};
	// Every function has a list of arguments which is almost, but not quite, an array. This is how we turn it into an array:
	var args = Array.prototype.slice.call(arguments);
	args.forEach(function(name){
		ret[name] = loadImage(name);
	});
	return ret;
}



//all the character stats will go here
var characterInfo = {
	name:'ForgePlayer',
	speed: 3,
	x:640,
	y:320,
	sx:0,
	sy:128,
	w:64,
	h:64
};

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
};

function Monster(sprite, x, y, direction){
	this.d = 1;
	this.x = x + characterInfo.x;
	this.y = y + characterInfo.y;
	this.sprite = new Image();
	this.sprite.src = 'public/graphics/' + sprite + '.png';
	this.animate_idx = 0;
	this.direction = direction; // 0 = up, 1 = left, 2 = down, 3 = right
	this.name = sprite;
	this.HP = monsterInfo[sprite].HP;
	this.damage = monsterInfo[sprite].damage;
	this.sensing = monsterInfo[sprite].sensing;
	this.AI = monsterInfo[sprite].AI;
	this.AIxy = 'x';
};
Monster.prototype.move = function(dx, dy){
	if(this.animate_idx === 2){
		this.d = -1;
	}else if(this.animate_idx === 0){
		this.d = 1;
	}
	if(frame % 5 === 0){
		this.animate_idx = (this.animate_idx + this.d);
	}
	this.x += dx * monsterInfo[this.name].speed;
	this.y += dy * monsterInfo[this.name].speed;
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
};
Monster.prototype.useAI = function(){
	if(this.AI === 'normal'){
		var distanceX = WIDTH/2 - (this.x - characterInfo.x);
		var distanceY = HEIGHT/2 - (this.y - characterInfo.y);
		console.log('distanceX: %s, characterX: %s, %s.x: %s', distanceX, characterInfo.x, this.name, (this.x - characterInfo.x));
		if(distanceX < 10 && distanceX > -10){
			this.AIxy = 'y';
		}else if(distanceY < 10 && distanceY > -10){
			this.AIxy = 'x';
		};
		if(this.AIxy === 'x'){
			if(distanceX > 0){
				this.faceEast();
			}else{
				console.log('face west');
				this.faceWest();
			};
		}else{
			if(distanceY < 0){
				this.faceNorth();
			}else{
				this.faceSouth();
			};
		};
		this.walk();
	};
}
Monster.prototype.draw = function(ctx){
	// drawImage(image, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
	ctx.drawImage(this.sprite, this.animate_idx * 32, this.direction * 32, 32, 32, this.x - characterInfo.x, this.y - characterInfo.y, 32, 32);
};

var monsterInfo = {
	bat: {
		speed:2.2,
		HP:7,
		sensing:20,
		damage:3,
		AI:'normal'
	},
	slime: {
		speed:1.2,
		HP:12,
		sensing:10,
		damage:5,
		AI:'normal'
	}
};

var monsters = [
	new Monster('bat', 800,500, 0),
	new Monster('slime', 800,300,1)
];

//starts the game
function init(){
    console.log('init');
	window.world = World();
	return setInterval(draw, 1000/60);
}

//function to clear the canvas
function clear(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

//draws on the canvas every 60th of a second
function draw(){
	frame += 1;
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	clear();
	world.draw();
	monsters.forEach(function(monster){
		monster.useAI();
		monster.draw(ctx);
	});
	
	ctx.drawImage(character, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h);
	ctx.drawImage(pants, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h);
	ctx.drawImage(shirt, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h);
	ctx.drawImage(bandana, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h);
	
	if(move.up && world.findCharTile(0, characterInfo.speed, true)){
		characterInfo.sy = 0;
		characterInfo.y -= characterInfo.speed;
	}else if(move.up){
		characterInfo.sy = 0;
	}else if(move.left && world.findCharTile(characterInfo.speed + 5, 0, true)){
		characterInfo.sy = 64;
		characterInfo.x -= characterInfo.speed;
	}else if(move.left){
		characterInfo.sy = 64;
	}else if(move.down && world.findCharTile(0, -characterInfo.speed - 64, true)){
		characterInfo.sy = 128;
		characterInfo.y += characterInfo.speed;
	}else if(move.down){
		characterInfo.sy = 128;
	}else if(move.right && world.findCharTile(-characterInfo.speed - 40, 0, true)){
		characterInfo.sy = 192;
		characterInfo.x += characterInfo.speed;
	}else if(move.right){
		characterInfo.sy = 192;
	}
	
	if((frame % 5 === 0) && (move.up|| move.left || move.down || move.right)){
		characterInfo.sx += 64;
	}
	
	if (characterInfo.sx === 576){
		characterInfo.sx = 64;
	}
	
	if(move.up=== false && move.left === false && move.down === false && move.right === false){
		characterInfo.sx = 0;
	}
}




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


window.onload = init;