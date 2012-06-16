/////////////////////////////////////////
//
//           GLOBALS
//
/////////////////////////////////////////


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var frame = 0;
var keycode;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT;

/////////////////////////////////////////
//
//           UTILITIES
//
/////////////////////////////////////////

// Paul Irish's requestAnimationFrame polyfill
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// isArray function borrowed from the Underscore library
var isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
};

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


/////////////////////////////////////////
//
//           PLAYER CHARACTER
//
/////////////////////////////////////////

//loads images
var character = loadImage('male_walkcycle');
var pants = loadImage('male_pants');
var shirt = loadImage('male_shirt');
var bandana = loadImage('red_bandana');

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


/////////////////////////////////////////
//
//           MONSTERS
//
/////////////////////////////////////////


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
		if(distanceX < 10 && distanceX > -10){
			this.AIxy = 'y';
		}else if(distanceY < 10 && distanceY > -10){
			this.AIxy = 'x';
		};
		if(this.AIxy === 'x'){
			if(distanceX > 0){
				this.faceEast();
			}else{
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



/////////////////////////////////////////
//
//           START AND SWITCH SCENES
//
/////////////////////////////////////////

var gameLoop, menuLoop;

//starts the game
function initGame(){
	window.world = World();
}

// show the menu
function initMenu(){
    window.menu = Menu();
    // also init game, but don't start it yet
    initGame();
    showMenu();
}

function showGame(){
    // turn off menu loop and event handlers
    document.onclick = null;
    if (menuLoop) cancelAnimationFrame(menuLoop);
    // turn on game loop and event handlers
    document.onkeydown = gameKeydown;
    document.onkeyup = gameKeyup;
	gameLoop = requestAnimationFrame(drawGame);
}

function showMenu(){
    clear();
    // turn off game loop and event handlers
    document.onkeydown = null;
    document.onkeyup = null;
    if (gameLoop) cancelAnimationFrame(gameLoop);
    // turn on menu loop and event handlers
    document.onclick = menuClick;
    menuLoop = requestAnimationFrame(drawMenu);
}


/////////////////////////////////////////
//
//           MENU
//
/////////////////////////////////////////

function Menu(){
    var buttonWidth = 120;
    var buttonHeight = 40;
    return [
        UITitle('Welcome to the Forge game'),
        UIButton('Single Player', WIDTH/2 - (buttonWidth/2), HEIGHT/2 - (buttonHeight/2), buttonWidth, buttonHeight, showGame)
    ];
}

function UIElement(text, x, y, w, h, draw, trigger){
    this.text = text;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.draw = draw || function(){};
    this.trigger = trigger || function(){};
}

UIElement.prototype.containsPoint = function(x,y){
    if (x < this.x) return false;
    if (y < this.y) return false;
    if (x > this.x + this.w) return false;
    if (y > this.y + this.h) return false;
    return true;
}

function UIButton(text, x, y, w, h, trigger){
    function draw(ctx){
        ctx.fillStyle = 'blue';
        roundRect(ctx, x, y, w, h, 10, true, true);
        ctx.fillStyle = 'white';
        ctx.font = '20pt Helvetica';
        ctx.textAlign = 'center';
        ctx.fillText(text, x + w/2, y + 30, w - 20);
    }
    return new UIElement(text, x, y, w, h, draw, trigger);
}

function UITitle(text){
    function draw(ctx){
        ctx.fillStyle = 'black';
        ctx.font = '40pt Helvetica';
        ctx.textAlign = 'center'
        ctx.fillText(text, WIDTH/2, 80);
    }
    return new UIElement(text, 0, 0, WIDTH, 80, draw);
}

function drawMenu(time){
    for (var i = 0; i < menu.length; i++){
        menu[i].draw(ctx);
    }
    menuLoop = requestAnimationFrame(drawMenu);
}

function menuClick(evt){
    for (var i = 0; i < menu.length; i++){
        if (menu[i].containsPoint(evt.clientX, evt.clientY)){
            menu[i].trigger();
        }
    }
}

/**
 * Draws a rounded rectangle using the current state of the canvas. 
 * If you omit the last three params, it will draw a rectangle 
 * outline with a 5 pixel border radius 
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate 
 * @param {Number} width The width of the rectangle 
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 
 SOURCE: http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
 
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill){
      ctx.fill();
  }
}

/////////////////////////////////////////
//
//           BASIC DRAWING
//
/////////////////////////////////////////

//function to clear the canvas
function clear(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

//draws on the canvas every 60th of a second
function drawGame(){
	frame += 1;
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
	gameLoop = requestAnimationFrame(drawGame);
}


/////////////////////////////////////////
//
//           USER INTERACTION
//
/////////////////////////////////////////

var gameKeydown = function(event) {
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

var gameKeyup = function(event) {
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

// Start everything
window.onload = initMenu();
