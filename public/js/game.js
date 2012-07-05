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
var mouseX = 0;
var mouseY = 0;
var click = false;
var keydown = false;

var keys = {
	0: false,
	key1: false,
	2: false,
	3: false,
	4: false,
	5: false,
	6: false,
	7: false,
	8: false,
	9: false,
	a: false,
	b: false,
	c: false,
	d: false,
	e: false,
	f: false,
	g: false,
	h: false,
	i: false,
	j: false,
	k: false,
	l: false,
	m: false,
	n: false,
	o: false,
	p: false,
	q: false,
	r: false,
	s: false,
	t: false,
	u: false,
	v: false,
	w: false,
	x: false,
	y: false,
	z: false,
	shift: false,
	caps: false,
	delete: false,
	dash: false
}

var DEBUG = false;

document.onmousemove = function(evt){
	mouseX = evt.clientX;
	mouseY = evt.clientY
}

function resize(){
    // put this in loops because Chrome doesn't reliably support resize events
    window.WIDTH = window.innerWidth;
    window.HEIGHT = window.innerHeight;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
}

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

var terrain = loadImages('grass', 'reeds', 'sand', 'wheat', 'cement', 'dirt', 'dirt2', 'grassalt', 'hole', 'lava', 'lavarock', 'water', 'waterandgrass', 'farming_fishing', 'barrels', 'tileset01');
var UI = loadImages('button_default', 'input')

function Character(){
    // Attributes
    this.name = 'ForgeDev';
    this.speed = 3;
    this.clothes = ['robe_skirt', 'blonde_hair', 'leather_belt', 'leather_armour', 'brown_shoes', 'shoulder_armor'];
    this.animation = 'walk';
    
    // Mapping info and state
    this.position = {x: 320, y: 320};
    this.size = {w: 64, h: 64};
    this.spriteOffset = {x: 0, y: 128};
    
    // Load sprites
    this.walk_quiver = loadImage('character/walkcycle/BEHIND_quiver');
    this.walk_leather_belt = loadImage('character/walkcycle/BELT_leather');
    this.walk_rope_belt = loadImage('character/walkcycle/BELT_rope');
    this.walk_walkcycle = loadImage('character/walkcycle/BODY_male');
    this.walk_skeletonwalkcycle = loadImage('character/walkcycle/BODY_skeleton');
    this.walk_plate_shoes = loadImage('character/walkcycle/FEET_plate_armor_shoes');
    this.walk_brown_shoes = loadImage('character/walkcycle/FEET_shoes_brown');
    this.walk_plate_gloves = loadImage('character/walkcycle/HANDS_plate_armor_gloves');
    this.walk_helmet = loadImage('character/walkcycle/HEAD_chain_armor_helmet');
    this.walk_chain_hood = loadImage('character/walkcycle/HEAD_chain_armor_hood');
    this.walk_blonde_hair = loadImage('character/walkcycle/HEAD_hair_blonde');
    this.walk_leather_hat = loadImage('character/walkcycle/HEAD_leather_armor_hat');
    this.walk_plate_helmet = loadImage('character/walkcycle/HEAD_plate_armor_helmet');
    this.walk_robe_hood = loadImage('character/walkcycle/HEAD_robe_hood');
    this.walk_green_pants = loadImage('character/walkcycle/LEGS_pants_greenish');
    this.walk_plate_pants = loadImage('character/walkcycle/LEGS_plate_armor_pants');
    this.walk_robe_skirt = loadImage('character/walkcycle/LEGS_robe_skirt');
    this.walk_chain_jacket_purple = loadImage('character/walkcycle/TORSO_chain_armor_jacket_purple');
    this.walk_chain_armor = loadImage('character/walkcycle/TORSO_chain_armor_torso');
    this.walk_bracers = loadImage('character/walkcycle/TORSO_leather_armor_bracers');
    this.walk_white_shirt = loadImage('character/walkcycle/TORSO_leather_armor_shirt_white');
    this.walk_shoulder_armor = loadImage('character/walkcycle/TORSO_leather_armor_shoulders');
    this.walk_leather_armour = loadImage('character/walkcycle/TORSO_leather_armor_torso');
    this.walk_plate_shoulder_armor = loadImage('character/walkcycle/TORSO_plate_armor_arms_shoulders');
    this.walk_plate_armor = loadImage('character/walkcycle/TORSO_plate_armor_torso');
    this.walk_robe_shirt = loadImage('character/walkcycle/TORSO_robe_shirt_brown');
    this.walk_shield = loadImage('character/walkcycle/WEAPON_shield_cutout_body');
}

Character.prototype.centre = function(){
    return ({x: this.position.x + this.size.w / 2, y: this.position.y + this.size.h / 2});
}

Character.prototype.draw = function(ctx){
	ctx.drawImage(this[this.animation + '_' + 'skeletonwalkcycle'], this.spriteOffset.x, this.spriteOffset.y, this.size.w, this.size.h, WIDTH/2, HEIGHT/2, this.size.w, this.size.h);
	for(i=0; i < this.clothes.length; i++){
		ctx.drawImage(this[this.animation + '_' + this.clothes[i]], this.spriteOffset.x, this.spriteOffset.y, this.size.w, this.size.h, WIDTH/2, HEIGHT/2, this.size.w, this.size.h);
	}
	if (DEBUG){
	    var radius = 24;
	    ctx.beginPath();
	    ctx.strokeStyle = 'green';
	    ctx.arc(WIDTH/2 + this.size.w / 2, HEIGHT/2 + this.size.h / 2, radius, 0, Math.PI*2,true)
	    ctx.stroke();
        if(frame%30 === 0){
	        console.log('%s: %s, %s', this.name, this.position.x, this.position.y);
	    }
    }
    
    if(this.animation === 'walk'){
    	if(move.up){
			character.spriteOffset.y = 0; // face sprite up
    		if (!world.findCollision(10, -character.speed +32)){
    			character.position.y -= character.speed;
	    	}
		}else if(move.left){
	    	character.spriteOffset.y = 64; // face sprite left
	    	if (!world.findCollision(-character.speed +10, 44)){
		   		character.position.x -= character.speed;
			}
		}else if(move.down){
	    character.spriteOffset.y = 128; // face sprite down
	    	if (!world.findCollision(10, character.speed +45)){
		    	character.position.y += character.speed;
			}
		}else if(move.right){
			character.spriteOffset.y = 192;
	    	if(!world.findCollision(character.speed +20, 44)){
    			character.position.x += character.speed;
    		}
		}
	}
	// Move this animation state into the Character object
	if((frame % 5 === 0) && (move.up|| move.left || move.down || move.right)){
		character.spriteOffset.x += 64;
	}
	
	if (character.spriteOffset.x === 576){
		character.spriteOffset.x = 64;
	}
	
	if(! (move.up || move.left || move.down || move.right )){
		character.spriteOffset.x = 0;
	}
};

var character = new Character();


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

var NORTH = 0;
var EAST = 3;
var SOUTH = 2;
var WEST = 1;


/////////////////////////////////////////
//
//           MONSTERS
//
/////////////////////////////////////////


function Monster(sprite, x, y, direction){
	this.d = 1;
	this.x = x + character.position.x;
	this.y = y + character.position.y;
	this.w = 32;
	this.h = 32;
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
	var mc = this.centre();
	var cc = character.centre();
	var distanceToCharacter = Math.sqrt(Math.pow((cc.x -mc.x), 2) + Math.pow((cc.y - mc.y), 2)) - 40;
	this.x += dx * Math.min(distanceToCharacter, monsterInfo[this.name].speed);
	this.y += dy * Math.min(distanceToCharacter, monsterInfo[this.name].speed);
    if(DEBUG && frame%30 === 0){
                 console.log(distanceToCharacter);
                 console.log('%s: %s, %s', this.name, this.x, this.y);
    }
	if (distanceToCharacter < this.speed){
	    console.log('Collision with %s', this.name);
    }
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
		var distanceX = WIDTH/2 - (this.x - character.position.x);
		var distanceY = HEIGHT/2 - (this.y - character.position.y);
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
};

Monster.prototype.centre = function(){
    return {x: (this.x - character.position.x) + this.w / 2, y: (this.y - character.position.y) + this.h/2 };
};

Monster.prototype.draw = function(ctx){
	// drawImage(image, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
	ctx.drawImage(this.sprite, this.animate_idx * this.w, this.direction * this.h, this.w, this.h, this.x - character.position.x, this.y - character.position.y, this.w, this.h);
	if (DEBUG){
	    var radius = 24;
	    var mc = this.centre();
	    var cc = {x: WIDTH / 2, y: HEIGHT / 2}
	    ctx.beginPath();
	    ctx.strokeStyle = 'green';
	    ctx.arc(this.x - character.position.x + this.w / 2, this.y - character.position.y + this.h / 2, radius, 0, Math.PI*2,true)
	    ctx.stroke();
    }
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

var gameLoop, menuLoop, settingsLoop;

//starts the game
function initGame(){
	window.world = World();
}

// show the menu
function initMenu(){
    window.menu = Menu();
    window.settings = Settings();
    // also init game, but don't start it yet
    initGame();
    showMenu();
}
function showGame(){
    // turn off menu loop and event handlers
    document.onclick = null;
    document.onkeydown = null;
    document.onkeyup = null;
    if (menuLoop) cancelAnimationFrame(menuLoop);
    // turn on game loop and event handlers
    document.onkeydown = gameKeydown;
    document.onkeyup = gameKeyup;
	gameLoop = requestAnimationFrame(drawGame);
	return false;
}

function showMenu(){
    clear();
    // turn off game loop and event handlers
    document.onkeydown = null;
    document.onkeyup = null;
    if (gameLoop) cancelAnimationFrame(gameLoop);
    if (settingsLoop) cancelAnimationFrame(settingsLoop);
    // turn on menu loop and event handlers
    menuLoop = requestAnimationFrame(drawMenu);
    document.onclick = menuClick;
    document.onmousedown = function(){
    	click = true;
    }
    document.onmouseup = function(){
    	click = false;
    }
    document.onkeydown = function(evt){
    	keydown = true;
    	if(evt.keyCode > 48 && evt.keyCode < 57){
    		keys.key1 = true;
    	}else if(evt.keyCode > 65 && evt.keyCode < 90){
    		keys[evt.keycode-54] = true;
    	}else if(evt.keyCode === 16){
    		keys[37] = true;
    	}
    	keycode = evt.keyCode;
    	console.log(String.fromCharCode(keycode))
    }
    document.onkeyup = function(evt){
    	keydown = false;
    	keycode = 0;
    	lastkeycode = 0;
    }
}

function showSettings(){
	clear();
    // turn off game loop and event handlers
    if (gameLoop) cancelAnimationFrame(gameLoop);
    if (menuLoop) cancelAnimationFrame(menuLoop);
    // turn on menu loop and event handlers
    document.onclick = settingsClick;
    settingsLoop = requestAnimationFrame(drawSettings);
}

function chooseMap(){
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'application/json');
    input.addEventListener('change', applyMap, false);
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, false, false, false, false, 0, null);
    input.dispatchEvent(evt);
    return false;
}


function applyMap(evt){
    if (this.files.length){
        var file = this.files[0];
        try{
            var reader = new FileReader();
            reader.onload = function(evt){
                var mapdata = JSON.parse(evt.target.result);
                // mapdata from the editor comes as one array, but we want an array of arrays. Fortunately, map tiles are square
                parseWorld(mapdata);
                showGame();
            };
            reader.readAsText(file, 'utf8');
        }catch(e){
            alert('failed to parse map file');
        }
    }
}

/////////////////////////////////////////
//
//           SETTINGS
//
/////////////////////////////////////////

function Settings(){
    var buttonWidth = 288;
    var buttonHeight = 50;
    return [
        UITitle('SETTINGS', WIDTH/2, 270),
    	UITextbox('name', WIDTH/2, HEIGHT/2, 200, 40)
    ];
}

function drawSettings(time){
    resize();
    frame += 1;
    var grd = ctx.createRadialGradient(WIDTH/2,105,300,WIDTH/2,420,800);
    grd.addColorStop(0, "#500");
    grd.addColorStop(1, "#100");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    for (var i = 0; i < settings.length; i++){
        settings[i].draw(ctx);
    }
    settingsLoop = requestAnimationFrame(drawSettings);
}

/////////////////////////////////////////
//
//           MENU
//
/////////////////////////////////////////

function Menu(){
    var buttonWidth = 288;
    var buttonHeight = 50;
    return [
        UITitle('FORGE', WIDTH/2, 270),
        UIButton('Single Player', WIDTH/2 - (buttonWidth/2), 450 - (buttonHeight *2), buttonWidth, buttonHeight, showGame),
        UIButton('Multiplayer', WIDTH/2 - (buttonWidth/2), 450 - buttonHeight, buttonWidth, buttonHeight, showGame),
        UIButton('Settings', WIDTH/2 - (buttonWidth/2), 450, buttonWidth, buttonHeight, showSettings),
        UIButton('Choose Map', WIDTH/2 - (buttonWidth/2), 450 + buttonHeight, buttonWidth, buttonHeight, chooseMap),
        UIButton('Help', WIDTH/2 - (buttonWidth/2), 450 + (buttonHeight *2), buttonWidth, buttonHeight)
    ];
}


function drawMenu(time){
    resize();
    frame += 1;
    var grd = ctx.createRadialGradient(WIDTH/2,105,300,WIDTH/2,420,800);
    grd.addColorStop(0, "#500");
    grd.addColorStop(1, "#100");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    for (var i = 0; i < menu.length; i++){
        menu[i].draw(ctx);
    }
    menuLoop = requestAnimationFrame(drawMenu);
}

/////////////////////////////////////////
//
//           UI ELEMENTS (BUTTONS, SCROLLBARS, SLIDERS, TEXTBOXES ETC.)
//
/////////////////////////////////////////

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

function UITextbox(text, x, y, w, h){
	this.clicked = false;
	this.cursor = 0;
	this.cursoron = false;
	this.t = text;
	this.lastframe = 0;
	function draw(ctx){
		var key = 48;
		var lastkey = 16;
		var t2 = '';
		var pt = this.containsPoint(mouseX, mouseY);
		var sy = 0;
		if(pt){
			document.body.style.cursor = 'text';
		}else{
			document.body.style.cursor = 'auto';
		}
		if(pt && click){
			clicked = true;
			console.log(':)');
		}else if(!pt && click){
			clicked = false;
			console.log(':(');
		}
		if(clicked === true){
			sy = 20;
		}
		if(clicked){
			if(frame%30 === 0){
				if(cursoron){
					cursoron = false;
				}else{
					cursoron = true;
				}
			}
		}else{
			cursoron = false;
		}
		if(key === 16 && keydown || lastkey === 16 && keydown){
			shift = true;
		}
		
		if(keydown && clicked){
			if((frame - lastframe) > 30){
				lastframe = frame;
				t = t.split('');
				console.log(keydown)
				
				if(key >= 48 && key <= 90){
					key = String.fromCharCode(keycode);
					if(shift === false){
						key = key.toLowerCase();
					}
					t.splice(t.length-cursor, 0, key);
					
				}
			}
		}
		if(keydown === false && key === 0){
			shift = false;
		}
		if(!keydown && clicked){
			lastframe -= 30;
		}
		for(i = 0; i < t.length; i++){
			t2 = t2 + t[i]
		}
		t=t2;
		ctx.drawImage(UI.input, 32, sy, 32, 20, x+32, y, w-64, h);
		ctx.drawImage(UI.input, 0, sy, 32, 20, x, y, 32, h);
		ctx.drawImage(UI.input, 98, sy, 32, 20, x+(w-64+32), y, 32, h);
		
		ctx.fillStyle = 'black';
        ctx.font = '12pt "Press Start 2P"';
        ctx.textAlign='left';
        ctx.fillText(t2, x +10, y + 30, 99999999999);
        if(cursoron){
        	ctx.fillText('|', x + ((t2.length-cursor)*16), y + 30, w-20);
        }
	}
	return new UIElement(text, x, y, w, h, draw);
}

function UIButton(text, x, y, w, h, trigger){
    function draw(ctx){
    	var pt = this.containsPoint(mouseX, mouseY);
        drawbutton(ctx, x, y, w, h, pt);
        //we should put the text in the drawbutton function
        ctx.fillStyle = 'black';
        ctx.font = '14pt "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText(text, x + w/2, y + 35, w - 20);
    }
    return new UIElement(text, x, y, w, h, draw, trigger);
}

function UITitle(text, x, y){
    function draw(ctx){
        ctx.fillStyle = '#900';
        ctx.font = '100pt "Press Start 2P"';
        ctx.textAlign = 'center'
        ctx.fillText(text, x, y);
    }
    return new UIElement(text, 0, 0, WIDTH, 80, draw);
}


function menuClick(evt){
    for (var i = 0; i < menu.length; i++){
        if (menu[i].containsPoint(evt.clientX, evt.clientY)){
            menu[i].trigger();
        }
    }
}

function settingsClick(evt){
    for (var i = 0; i < menu.length; i++){
        if (settings[i].containsPoint(evt.clientX, evt.clientY)){
            settings[i].trigger();
        }
    }
}

function drawbutton(ctx, x, y, width, height, pt) {
	var sy = 0;
	if(pt && click){
		sy = 28;
	}else if(pt){
		sy = 56;
	}
	ctx.drawImage(UI.button_default, 40, sy, 32, 28, x+32, y, width -64, height);
	ctx.drawImage(UI.button_default, 7, sy, 32, 28, x, y, height, height);
	ctx.drawImage(UI.button_default, 104, sy, 32, 28, x+(width-32), y, height, height);
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
    resize();
	clear();
	world.draw();
	monsters.forEach(function(monster){
		monster.useAI();
		monster.draw(ctx);
	});
	character.draw(ctx);
	world.drawtop();
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
			
			case 27: // 'esc' key
			    showMenu();
			    break;
			
			//default: console.log(event.keyCode);
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
