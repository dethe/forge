/////////////////////////////////////////
//
//           GLOBALS
//
/////////////////////////////////////////

var DEBUG = false   ;   
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
var timeofday = 0.1;
var daydirection = 0;
var damagetext = [];
var lf = 0;
var FPS = 0;

setInterval(function(){
	FPS = frame - lf;
	lf = frame;
}, 1000);

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
	'delete': false,
	dash: false,
	space: false
};

var DEBUG = false;

document.onmousemove = function(evt){
	mouseX = evt.clientX;
	mouseY = evt.clientY;
};

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

function loadClothes(){
	this.walk_quiver = loadImage('character/walkcycle/BEHIND_quiver');
    this.walk_leather_belt = loadImage('character/walkcycle/BELT_leather');
    this.walk_rope_belt = loadImage('character/walkcycle/BELT_rope');
    this.walk_character = loadImage('character/walkcycle/BODY_male');
    this.walk_skeletoncharacter = loadImage('character/walkcycle/BODY_skeleton');
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
    this.walk_leather_armor = loadImage('character/walkcycle/TORSO_leather_armor_torso');
    this.walk_plate_shoulder_armor = loadImage('character/walkcycle/TORSO_plate_armor_arms_shoulders');
    this.walk_plate_armor = loadImage('character/walkcycle/TORSO_plate_armor_torso');
    this.walk_robe_shirt = loadImage('character/walkcycle/TORSO_robe_shirt_brown');
    this.walk_shield = loadImage('character/walkcycle/WEAPON_shield_cutout_body');
    
    // Load slash animation for sprites
    this.slash_quiver = loadImage('character/slash/BEHIND_quiver');
    this.slash_leather_belt = loadImage('character/slash/BELT_leather');
    this.slash_rope_belt = loadImage('character/slash/BELT_rope');
    this.slash_character = loadImage('character/slash/BODY_male');
    this.slash_skeletoncharacter = loadImage('character/slash/BODY_skeleton');
    this.slash_plate_shoes = loadImage('character/slash/FEET_plate_armor_shoes');
    this.slash_brown_shoes = loadImage('character/slash/FEET_shoes_brown');
    this.slash_plate_gloves = loadImage('character/slash/HANDS_plate_armor_gloves');
    this.slash_helmet = loadImage('character/slash/HEAD_chain_armor_helmet');
    this.slash_chain_hood = loadImage('character/slash/HEAD_chain_armor_hood');
    this.slash_blonde_hair = loadImage('character/slash/HEAD_hair_blonde');
    this.slash_leather_hat = loadImage('character/slash/HEAD_leather_armor_hat');
    this.slash_plate_helmet = loadImage('character/slash/HEAD_plate_armor_helmet');
    this.slash_robe_hood = loadImage('character/slash/HEAD_robe_hood');
    this.slash_green_pants = loadImage('character/slash/LEGS_pants_greenish');
    this.slash_plate_pants = loadImage('character/slash/LEGS_plate_armor_pants');
    this.slash_robe_skirt = loadImage('character/slash/LEGS_robe_skirt');
    this.slash_chain_jacket_purple = loadImage('character/slash/TORSO_chain_armor_jacket_purple');
    this.slash_chain_armor = loadImage('character/slash/TORSO_chain_armor_torso');
    this.slash_bracers = loadImage('character/slash/TORSO_leather_armor_bracers');
    this.slash_white_shirt = loadImage('character/slash/TORSO_leather_armor_shirt_white');
    this.slash_shoulder_armor = loadImage('character/slash/TORSO_leather_armor_shoulders');
    this.slash_leather_armor = loadImage('character/slash/TORSO_leather_armor_torso');
    this.slash_plate_shoulder_armor = loadImage('character/slash/TORSO_plate_armor_arms_shoulders');
    this.slash_plate_armor = loadImage('character/slash/TORSO_plate_armor_torso');
    this.slash_robe_shirt = loadImage('character/slash/TORSO_robe_shirt_brown');
    this.slash_dagger = loadImage('character/slash/WEAPON_dagger');
    this.slash_shield = loadImage('character/slash/WEAPON_shield_cutout_body');
    
    // Load spellcast animation for sprites
    this.spellcast_quiver = loadImage('character/spellcast/BEHIND_quiver');
    this.spellcast_leather_belt = loadImage('character/spellcast/BELT_leather');
    this.spellcast_rope_belt = loadImage('character/spellcast/BELT_rope');
    this.spellcast_character = loadImage('character/spellcast/BODY_male');
    this.spellcast_skeletoncharacter = loadImage('character/spellcast/BODY_skeleton');
    this.spellcast_plate_shoes = loadImage('character/spellcast/FEET_plate_armor_shoes');
    this.spellcast_brown_shoes = loadImage('character/spellcast/FEET_shoes_brown');
    this.spellcast_plate_gloves = loadImage('character/spellcast/HANDS_plate_armor_gloves');
    this.spellcast_helmet = loadImage('character/spellcast/HEAD_chain_armor_helmet');
    this.spellcast_chain_hood = loadImage('character/spellcast/HEAD_chain_armor_hood');
    this.spellcast_blonde_hair = loadImage('character/spellcast/HEAD_hair_blonde');
    this.spellcast_leather_hat = loadImage('character/spellcast/HEAD_leather_armor_hat');
    this.spellcast_plate_helmet = loadImage('character/spellcast/HEAD_plate_armor_helmet');
    this.spellcast_robe_hood = loadImage('character/spellcast/HEAD_robe_hood');
    this.spellcast_green_pants = loadImage('character/spellcast/LEGS_pants_greenish');
    this.spellcast_plate_pants = loadImage('character/spellcast/LEGS_plate_armor_pants');
    this.spellcast_robe_skirt = loadImage('character/spellcast/LEGS_robe_skirt');
    this.spellcast_chain_jacket_purple = loadImage('character/spellcast/TORSO_chain_armor_jacket_purple');
    this.spellcast_chain_armor = loadImage('character/spellcast/TORSO_chain_armor_torso');
    this.spellcast_bracers = loadImage('character/spellcast/TORSO_leather_armor_bracers');
    this.spellcast_white_shirt = loadImage('character/spellcast/TORSO_leather_armor_shirt_white');
    this.spellcast_shoulder_armor = loadImage('character/spellcast/TORSO_leather_armor_shoulders');
    this.spellcast_leather_armor = loadImage('character/spellcast/TORSO_leather_armor_torso');
    this.spellcast_plate_shoulder_armor = loadImage('character/spellcast/TORSO_plate_armor_arms_shoulders');
    this.spellcast_plate_armor = loadImage('character/spellcast/TORSO_plate_armor_torso');
    this.spellcast_robe_shirt = loadImage('character/spellcast/TORSO_robe_shirt_brown');
    this.spellcast_water_staff = loadImage('character/spellcast/WEAPON_blue_staff');
    this.spellcast_darkness_staff = loadImage('character/spellcast/WEAPON_dark_staff');
    this.spellcast_nature_staff = loadImage('character/spellcast/WEAPON_green_staff');
    this.spellcast_fire_staff = loadImage('character/spellcast/WEAPON_red_staff');
    this.spellcast_staff = loadImage('character/spellcast/WEAPON_regular_staff');
    this.spellcast_ice_staff = loadImage('character/spellcast/WEAPON_teal_staff');
    this.spellcast_air_staff = loadImage('character/spellcast/WEAPON_white_staff');
    this.spellcast_lightning_staff = loadImage('character/spellcast/WEAPON_white_staff');
    
    // Load bow animation for sprites
    this.shoot_leather_belt = loadImage('character/bow/BELT_leather');
    this.shoot_rope_belt = loadImage('character/bow/BELT_rope');
    this.shoot_character = loadImage('character/bow/BODY_male');
    this.shoot_plate_shoes = loadImage('character/bow/FEET_plate_armor_shoes');
    this.shoot_brown_shoes = loadImage('character/bow/FEET_shoes_brown');
    this.shoot_plate_gloves = loadImage('character/bow/HANDS_plate_armor_gloves');
    this.shoot_helmet = loadImage('character/bow/HEAD_chain_armor_helmet');
    this.shoot_chain_hood = loadImage('character/bow/HEAD_chain_armor_hood');
    this.shoot_blonde_hair = loadImage('character/bow/HEAD_hair_blonde');
    this.shoot_leather_hat = loadImage('character/bow/HEAD_leather_armor_hat');
    this.shoot_plate_helmet = loadImage('character/bow/HEAD_plate_armor_helmet');
    this.shoot_robe_hood = loadImage('character/bow/HEAD_robe_hood');
    this.shoot_green_pants = loadImage('character/bow/LEGS_pants_greenish');
    this.shoot_plate_pants = loadImage('character/bow/LEGS_plate_armor_pants');
    this.shoot_robe_skirt = loadImage('character/bow/LEGS_robe_skirt');
    this.shoot_chain_jacket_purple = loadImage('character/bow/TORSO_chain_armor_jacket_purple');
    this.shoot_chain_armor = loadImage('character/bow/TORSO_chain_armor_torso');
    this.shoot_bracers = loadImage('character/bow/TORSO_leather_armor_bracers');
    this.shoot_white_shirt = loadImage('character/bow/TORSO_leather_armor_shirt_white');
    this.shoot_shoulder_armor = loadImage('character/bow/TORSO_leather_armor_shoulders');
    this.shoot_leather_armor = loadImage('character/bow/TORSO_leather_armor_torso');
    this.shoot_plate_shoulder_armor = loadImage('character/bow/TORSO_plate_armor_arms_shoulders');
    this.shoot_plate_armor = loadImage('character/bow/TORSO_plate_armor_torso');
    this.shoot_robe_shirt = loadImage('character/bow/TORSO_robe_shirt_brown');
    this.shoot_arrow = loadImage('character/bow/WEAPON_arrow');
    this.shoot_bow = loadImage('character/bow/WEAPON_bow');
}

//loads images

var terrain = loadImages('grass', 'reeds', 'sandandwater', 'sand', 'wheat', 'cement','cement_stairs', 'kitchen', 'dirt', 'dirt2', 'grassalt', 'hole', 'lava', 'lavarock', 'water', 'waterandgrass', 'farming_fishing', 'barrels', 'tileset01', 'fence', 'castle_outside', 'castlewalls', 'castlefloors', 'castlefloors_outside', 'brickwalldark', 'dungeon', 'signs', 'house_tiles_exterior', 'house_tiles_interior', 'house_stairs_interior', 'cabinets', 'bridges', 'chests', 'buckets', 'wheelbarrow', 'misc', 'miscellaneous', 'fence_alt', 'rocks', 'wood_house_exterior', 'white_house_exterior', 'treetop', 'treetrunk', 'hole', 'furniture', 'furniture2', 'flowers', 'plowed_soil', 'signpost', 'plants', 'limestone_wall01');
var UI = loadImages('button_default', 'input', 'confirm_bg', 'bar_hp_mp', 'menu_xp');



var NORTH = 0;
var EAST = 3;
var SOUTH = 2;
var WEST = 1;


/////////////////////////////////////////
//
//           MONSTERS
//
/////////////////////////////////////////


function Monster(opts){
    this.name = opts.name;
	this.d = 1;
	this.x = opts.x;
	this.y = opts.y;
	this.w = 32;
	this.h = 32;
	this.sprite = new Image();
	this.sprite.src = 'public/graphics/' + opts.name + '.png';
	this.animate_idx = 0;
	this.direction = opts.direction;
	this.speed = opts.speed;
	this.HP = opts.HP;
	this.damage = opts.damage;
	this.sensing = opts.sensing;
	this.AI = opts.AI;
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
	var distanceToCharacter = Math.sqrt(Math.pow((character.x - this.x), 2) + Math.pow((character.y + 16 - this.y), 2)) - 32;
	this.x += dx * Math.min(distanceToCharacter, this.speed);
	this.y += dy * Math.min(distanceToCharacter, this.speed);
	if(dx * Math.min(distanceToCharacter, this.speed) <= 1 && dx * Math.min(distanceToCharacter, this.speed) >= -1 && dy * Math.min(distanceToCharacter, this.speed) <= 1 && dy * Math.min(distanceToCharacter, this.speed) >= -1){
		character.collidingmonsters.push(this);
	}
    if(DEBUG && frame%30 === 0){
                 console.log(distanceToCharacter);
                 console.log('%s: %s, %s', this.name, this.x, this.y);
    }
};
Monster.prototype.faceEast = function(){
	this.direction = EAST;
};
Monster.prototype.faceWest = function(){
	this.direction = WEST;
};
Monster.prototype.faceNorth = function(){
	this.direction = NORTH;
};
Monster.prototype.faceSouth = function(){
	this.direction = SOUTH;
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
		var distanceX = character.x - this.x - 16;
		var distanceY = character.y - this.y - 16;
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

Monster.prototype.draw = function(ctx){
	// drawImage(image, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
	var x = this.x - this.w/2,
	    y = this.y - this.h/2,
	    w = this.w,
	    h = this.h,
	    sx = this.animate_idx * this.w,
	    sy = this.direction * this.h;
	ctx.drawImage(this.sprite, sx, sy, w, h, x, y, w, h);
	if (DEBUG){
	    var radius = 24;
	    ctx.beginPath();
	    ctx.strokeStyle = 'green';
	    ctx.arc(this.x, this.y, radius, 0, Math.PI*2,true)
	    ctx.stroke();
    }
};

Monster.prototype.hurt = function(damage){
	this.HP -= damage;
	damagetext.push([this.x, this.y, this.w, this.h, damage, frame, 1]);
	if(this.HP <= 0){
		monsters.splice(monsters.indexOf(this), 1)
	}
}

var monsters = [
	new Monster({
	    name: 'bat', 
	    x: 400,
	    y: 50,
	    direction: NORTH,
	    speed: 2.2,
	    HP: 7,
	    sensing: 20,
	    damage: 3,
	    AI: 'normal'
	}),
	new Monster({
	    name: 'slime', 
	    x: 50,
	    y: 300,
	    direction: WEST,
	    speed: 1.2,
	    HP: 12,
	    sensing: 10,
	    damage: 5,
	    AI: 'normal'
	})
];

/////////////////////////////////////////
//
//           PLAYER CHARACTER
//
/////////////////////////////////////////

setInterval(function(){
	if(character.attacked === true){
		character.animation = character.attack;
		character.spriteOffset.x = 0;
	}
	if(character.animation === character.attack){
		character.attacked = false;
		if(move.up){
			character.spriteOffset.y = 0; // face sprite up
		}else if(move.left){
	    	character.spriteOffset.y = 64; // face sprite left
		}else if(move.down){
	    	character.spriteOffset.y = 128; // face sprite down
		}else if(move.right){
			character.spriteOffset.y = 192;
		};
	}
}, 800);

function Character(){
    // Attributes
    this.name = 'Player_Name';
    this.speed = 3;
    this.clothes = ['robe_skirt', 'blonde_hair', 'white_shirt', 'leather_belt', 'leather_armor', 'brown_shoes'];
    this.weapon = 'dagger';
    this.attack = 'slash';
    this.damage = [150, 200]
    this.animation = 'walk';
    this.maxsx = 576;
    this.attacked = false;
    this.hp = [50, 200];
    this.mp = [10, 100];
    this.collidingmonsters = [];
    
    // Mapping info and state
    this.x = 320;
    this.y = 320;
    this.w = 64;
    this.h = 64;
    this.spriteOffset = {x: 0, y: 128};
    
    // Load sprites
    this.loadClothes();
}

Character.prototype.loadClothes = loadClothes;

Character.prototype.centre = function(){
    return ({x: this.x + this.w / 2, y: this.y + this.h / 2});
}

Character.prototype.draw = function(ctx){
    var x = this.x - this.w/2, // x and y are the centre point
        y = this.y - this.h/2,
        w = this.w,
        h = this.h,
        sx = this.spriteOffset.x,
        sy = this.spriteOffset.y;
	if(this.animation === 'spellcast' && this.spriteOffset.y === 0){}else
	{
		ctx.drawImage(this[this.animation + '_' + 'character'], sx, sy, w, h, x, y, w, h);
		for(i=0; i < this.clothes.length; i++){
			ctx.drawImage(this[this.animation + '_' + this.clothes[i]], sx, sy, w, h, x, y, w, h);
		}
	}
	if (DEBUG){
	    var radius = 24;
	    ctx.beginPath();
	    ctx.strokeStyle = 'green';
	    ctx.arc(this.x, this.y, radius, 0, Math.PI*2,true)
	    ctx.stroke();
        if(frame%30 === 0){
	        console.log('%s: %s, %s', this.name, this.x, this.y);
	    }
    }
    if(keys.space){
    	this.animation = this.attack;
    	if(this.animation === 'spellcast'){
    		this.maxsx = 448;
    	}else if(this.animation === 'slash'){
    		this.maxsx = 384;
    		for(var i = 0;i < this.collidingmonsters.length; i++){
    			if(sx === 320 && frame%5===0){
    				this.collidingmonsters[i].hurt(Math.floor(Math.random() * (this.damage[1] - this.damage[0] + 1)) + this.damage[0]);
    			}
    		}
    	}else if(this.animation === 'shoot'){
    		this.maxsx = 832;
    	}
    	if(this.attacked === false){
    		if(this.animation === 'spellcast'){
    			ctx.drawImage(this[this.animation + '_' + this.weapon], sx, sy, w, h, x+2, y+7, w, h);
    		}else{
    			ctx.drawImage(this[this.animation + '_' + this.weapon], sx, sy, w, h, x, y, w, h);
    		}
    		if((frame % 5 === 0)){
				sx = this.spriteOffset.x += 64;
			}
    	}else{
    		this.animation = 'walk';
    	}
    }else{
    	this.attacked = false;
    	this.animation = 'walk';
    	this.maxsx = 576;
    }
    if(this.animation === 'spellcast' && sy === 0){
    	ctx.drawImage(this[this.animation + '_' + 'character'], sx, sy, w, h, x, y, w, h);
		for(i=0; i < this.clothes.length; i++){
			ctx.drawImage(this[this.animation + '_' + this.clothes[i]], sx, sy, w, h, x, y, w, h);
		}
    }
    if(this.animation === 'walk'){
    	if(move.up){
			this.spriteOffset.y = 0; // face sprite up
    		if (!world.findCollision(10, -this.speed +32)){
    			this.y -= this.speed;
	    	}
		}else if(move.left){
	    	this.spriteOffset.y = 64; // face sprite left
	    	if (!world.findCollision(-this.speed +10, 44)){
		   		this.x -= this.speed;
			}
		}else if(move.down){
	    	this.spriteOffset.y = 128; // face sprite down
	    	if (!world.findCollision(10, this.speed +45)){
		    	this.y += this.speed;
			}
		}else if(move.right){
			this.spriteOffset.y = 192;
	    	if(!world.findCollision(this.speed +20, 44)){
    			this.x += this.speed;
    		}
		}
		if((frame % 5 === 0) && (move.up|| move.left || move.down || move.right) && this.animation === 'walk'){
			this.spriteOffset.x += 64;
		}
		if(!(move.up || move.left || move.down || move.right)){
			this.spriteOffset.x = 0;
		}
	}
	if(this.spriteOffset.x >= this.maxsx){
		this.spriteOffset.x = 64;
		if(this.animation === this.attack){
			this.attacked = true;
		}
	}
	this.collidingmonsters = [];
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

/////////////////////////////////////////
//
//           NPC's
//
/////////////////////////////////////////

function NPC(name, x, y, direction, speed, path, clothing, talk, talkObj){
	this.animation = 'walk';
	this.x = x;
	this.y = y;
    this.w = 64;
    this.h = 64;
    this.spriteOffset = {x: 0, y: 128};
	this.direction = direction;
	this.name = name;
	this.path = path;
	this.path_progress = 0;
	this.clothes = clothing;
	this.talk = talk;
	this.talkObj = talkObj;
	this.loadClothes();
	this.maxsx = 576;
	this.animating = true;
	this.AIxy = 'x';
	this.speed = speed;
};

NPC.prototype.loadClothes = loadClothes;

NPC.prototype.draw = function(ctx){
    var sx = this.spriteOffset.x,
        sy = this.spriteOffset.y,
        x = this.x - this.w/2,
        y = this.y - this.h/2,
        w = this.w,
        h = this.h;
	ctx.drawImage(this[this.animation + '_' + 'character'], sx, sy, w, h, x, y, w, h);
	for(i=0; i < this.clothes.length; i++){
		ctx.drawImage(this[this.animation + '_' + this.clothes[i]], sx, sy, w, h, x, y, w, h);
	}
	ctx.fillStyle = '#000';
	ctx.font = '6pt "press start 2p"';
	ctx.textAlign = 'center'
	ctx.fillText(this.name, x + 32, y + 10);
};

NPC.prototype.faceEast = function(){
	this.direction = EAST;
};
NPC.prototype.faceWest = function(){
	this.direction = WEST;
};
NPC.prototype.faceNorth = function(){
	this.direction = NORTH;
};
NPC.prototype.faceSouth = function(){
	this.direction = SOUTH;
};

NPC.prototype.useAI = function(){
	var distanceX = this.path[this.path_progress][0] - this.x;
	var distanceY = this.path[this.path_progress][1] - this.y;
	if(distanceX < 2 && distanceX > -2 && distanceY < 2 && distanceY > -2){
		this.path_progress += 1;
		if(this.path_progress > (this.path.length - 1)){
			this.path_progress = 0;
		}
	}else if(distanceX < 2 && distanceX > -2){
		this.AIxy = 'y';
	}else if(distanceY < 2 && distanceY > -2){
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

NPC.prototype.walk = function(){
	var dx, dy;
	if (this.direction % 2){
		dx = (this.direction - 2); // move one pixel left or right
		dy = 0;
	}else{
		dx = 0;
		dy = (this.direction - 1); // move one pixel up or down
	}
	this.move(dx, dy);
};

NPC.prototype.move = function(dx, dy){
	
	if(this.animating){
		if(frame%5 === 0){
			this.spriteOffset.x += 64;
		}
		this.spriteOffset.y = this.direction*64;
		if((this.path[this.path_progress][0] - this.x) < 10 && (this.path[this.path_progress][0] - this.x) > -10 && (this.path[this.path_progress][1] - this.y) < 10 && (this.path[this.path_progress][1] - this.y) > -10){
			
		}
		this.x += dx*this.speed;
		this.y += dy*this.speed;
	}else{
		this.spriteOffset.x = 0;
	}
	if(this.spriteOffset.x >= this.maxsx){
		this.spriteOffset.x = 64;
	}
};

var NPCs = [
	new NPC('Soldier', 100, 100, 2, 2, [[500, 100], [500, 500], [100, 500], [100, 100]], ['plate_helmet', 'plate_armor', 'plate_pants', 'plate_shoes', 'plate_shoulder_armor', 'plate_gloves'], true, {
		'text': 'Hello strange person who are you?',
		'question1': {
			'text': 'Where am I?',
			'answer': {
				'text': 'You are in the game FORGE',
				'question1': {
					'text': 'So if I am in the game FORGE, why am I here?',
					'answer': {
						'text': 'To play FORGE of course',
						'question1': {
							'text': 'Can I start the tutorial now then?',
							'answer': {
								'text': 'Yes...',
								//SOMETHING HAPPENS!!!
							}
						}
					}
				}
			}
		},
		'question1': {
			'text': 'Who am I?',
			'answer': {
				'text': "I don't know. Thats what I asked you!"
			}
		},
	}),
	new NPC('Soldier', 174, 100, 2, 2, [[500, 100], [500, 500], [100, 500], [100, 100]], ['plate_helmet', 'plate_armor', 'plate_pants', 'plate_shoes', 'plate_shoulder_armor', 'plate_gloves'], true, {}),
	new NPC('Soldier', 250, 100, 2, 2, [[500, 100], [500, 500], [100, 500], [100, 100]], ['plate_helmet', 'plate_armor', 'plate_pants', 'plate_shoes', 'plate_shoulder_armor', 'plate_gloves'], true, {}),
	new NPC('Captain', 324, 100, 2, 2, [[500, 100], [500, 500], [100, 500], [100, 100]], ['helmet', 'plate_armor', 'robe_skirt', 'plate_shoes'], true, {})
]

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
        // console.log(evt);
        // console.log('character: %s', String.fromCharCode(evt.keyCode));
        // console.log('keycode: %s', evt.keyCode);
    	keydown = true;
    	lastkeycode = keycode;
    	keycode = evt.keyCode; // To trap DELETE, use keyCode == 8 and return false;
    	return false;
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
        UIButton('Help', WIDTH/2 - (buttonWidth/2), 450 + buttonHeight, buttonWidth, buttonHeight)
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
	ctx.save();
	var offsetX = WIDTH/2 - character.w/2;
	var offsetY = HEIGHT/2 - character.h/2;
	ctx.translate(Math.round(-character.x + offsetX), Math.round(-character.y + offsetY));
	world.draw(ctx);
	monsters.forEach(function(monster){
		monster.useAI();
		monster.draw(ctx);
	});
	NPCs.forEach(function(NPC){
		NPC.useAI();
		NPC.draw(ctx);
	});
	character.draw(ctx);
	world.drawtop(ctx);
    ctx.restore();
    if(daydirection === 1){
    	if(timeofday >= 0.5){
    		dayfunction();
    	}else{
    		timeofday += 0.00005;
    	}
    }else if(daydirection === 0){
    	if(timeofday <= 0.01){
    		dayfunction();
    	}else{
    		timeofday -= 0.00005;
    	}
    }
    ctx.fillStyle = 'rgba(0, 0, 0, ' + timeofday + ')';
    ctx.fillRect(0, 0 , WIDTH, HEIGHT);
    ctx.fillStyle = '#fff';
    ctx.fillText('FPS: ' + FPS, WIDTH-50, 10);
    ctx.save();
    ctx.translate(Math.round(-character.x + offsetX), Math.round(-character.y + offsetY));
    for(var i = 0; i < damagetext.length; i++){
		damagetext[i][1] -= 1;
		damagetext[i][6] -= 0.05;
		ctx.fillStyle = 'rgba(255, 0, 0, ' + damagetext[i][6] + ')';
		ctx.strokeStyle = 'rgba(0, 0, 0, ' + damagetext[i][6] + ')';
		ctx.strokeWidth = 1;
		ctx.strokeText(damagetext[i][4], damagetext[i][0], damagetext[i][1] - (damagetext[i][3]/2));
    	ctx.fillText(damagetext[i][4], damagetext[i][0], damagetext[i][1] - (damagetext[i][3]/2));
    	if(damagetext[i][6] <= 0){
			damagetext.splice(i, 1);
		}
    }
    ctx.restore();
    drawUI(ctx);
	gameLoop = requestAnimationFrame(drawGame);
}

function dayfunction(){
	if(daydirection === 1){
		setTimeout(function(){
			daydirection = 1;
		}, 60000*3.5)
	}else if(daydirection === 0){
		setTimeout(function(){
			daydirection = 1;
		}, 60000*5)
	}
	daydirection = 3;
}

/////////////////////////////////////////
//
//           USER INTERACTION
//
/////////////////////////////////////////

var gameKeydown = function(event) {
		keydown = true;
    	if(event.keyCode > 48 && event.keyCode < 57){
    		keys.key1 = true;
    	}else if(event.keyCode > 65 && event.keyCode < 90){
    		keys[event.keycode-54] = true;
    	}else if(event.keyCode === 16){
    		keys[37] = true;
    	}else if(event.keyCode === 32){
    		keys.space = true;
    	}
    	keycode = event.keyCode;
    	
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
			
		}
};

var gameKeyup = function(event) {
		if(event.keyCode === 32){
    		keys.space = false;
    	}
		switch (event.keyCode) {
			case 87: // 'w' key
			case 38: // up arrow
				move.up = move.up_m = false;
				move.down = move.down_m;
				move.right = move.right_m;
				move.left = move.left_m;
			break;

			case 65: // 'a' key
			case 37: // left arrow
				move.left = move.left_m = false;
				move.right = move.right_m;
				move.down = move.down_m;
				move.up = move.up_m;
			break;

			case 83: // 's' key
			case 40: // down arrow
				move.down = move.down_m = false;
				move.up = move.up_m;
				move.left = move.left_m;
				move.right = move.right_m;
			break;

			case 68: // 'd' key
			case 39: // right arrow
				move.right = move.right_m = false;
				move.left = move.left_m;
				move.down = move.down_m;
				move.up = move.up_m;
			break;
		}
};

// Start everything
window.onload = initMenu();
