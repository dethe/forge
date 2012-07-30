/////////////////////////////////////////
//
//           GLOBALS
//
/////////////////////////////////////////

var DEBUG = false;   
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
var pauseDisabled = false;


// DISABLED - we should not be using setInterval or setTimeout - just put hooks into the main event loop HOW DO WE DO THAT? it has to trigger every second!
setInterval(function(){
	FPS = frame - lf;
	lf = frame;
}, 1000);


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

function Clothes(){
    function loadClothes(name){
        return loadImage('character/walkcycle/' + name);
    }
	this.walk_quiver = loadClothes('BEHIND_quiver');
    this.walk_leather_belt = loadClothes('BELT_leather');
    this.walk_rope_belt = loadClothes('BELT_rope');
    this.walk_character = loadClothes('BODY_male');
    this.walk_skeletoncharacter = loadClothes('BODY_skeleton');
    this.walk_plate_shoes = loadClothes('FEET_plate_armor_shoes');
    this.walk_brown_shoes = loadClothes('FEET_shoes_brown');
    this.walk_plate_gloves = loadClothes('HANDS_plate_armor_gloves');
    this.walk_helmet = loadClothes('HEAD_chain_armor_helmet');
    this.walk_chain_hood = loadClothes('HEAD_chain_armor_hood');
    this.walk_blonde_hair = loadClothes('HEAD_hair_blonde');
    this.walk_leather_hat = loadClothes('HEAD_leather_armor_hat');
    this.walk_plate_helmet = loadClothes('HEAD_plate_armor_helmet');
    this.walk_robe_hood = loadClothes('HEAD_robe_hood');
    this.walk_green_pants = loadClothes('LEGS_pants_greenish');
    this.walk_plate_pants = loadClothes('LEGS_plate_armor_pants');
    this.walk_robe_skirt = loadClothes('LEGS_robe_skirt');
    this.walk_chain_jacket_purple = loadClothes('TORSO_chain_armor_jacket_purple');
    this.walk_chain_armor = loadClothes('TORSO_chain_armor_torso');
    this.walk_bracers = loadClothes('TORSO_leather_armor_bracers');
    this.walk_white_shirt = loadClothes('TORSO_leather_armor_shirt_white');
    this.walk_shoulder_armor = loadClothes('TORSO_leather_armor_shoulders');
    this.walk_leather_armor = loadClothes('TORSO_leather_armor_torso');
    this.walk_plate_shoulder_armor = loadClothes('TORSO_plate_armor_arms_shoulders');
    this.walk_plate_armor = loadClothes('TORSO_plate_armor_torso');
    this.walk_robe_shirt = loadClothes('TORSO_robe_shirt_brown');
    this.walk_shield = loadClothes('WEAPON_shield_cutout_body');
    
    function loadSlash(name){
        return loadImage('character/slash/' + name);
    }
    // Load slash animation for sprites
    this.slash_quiver = loadSlash('BEHIND_quiver');
    this.slash_leather_belt = loadSlash('BELT_leather');
    this.slash_rope_belt = loadSlash('BELT_rope');
    this.slash_character = loadSlash('BODY_male');
    this.slash_skeletoncharacter = loadSlash('BODY_skeleton');
    this.slash_plate_shoes = loadSlash('FEET_plate_armor_shoes');
    this.slash_brown_shoes = loadSlash('FEET_shoes_brown');
    this.slash_plate_gloves = loadSlash('HANDS_plate_armor_gloves');
    this.slash_helmet = loadSlash('HEAD_chain_armor_helmet');
    this.slash_chain_hood = loadSlash('HEAD_chain_armor_hood');
    this.slash_blonde_hair = loadSlash('HEAD_hair_blonde');
    this.slash_leather_hat = loadSlash('HEAD_leather_armor_hat');
    this.slash_plate_helmet = loadSlash('HEAD_plate_armor_helmet');
    this.slash_robe_hood = loadSlash('HEAD_robe_hood');
    this.slash_green_pants = loadSlash('LEGS_pants_greenish');
    this.slash_plate_pants = loadSlash('LEGS_plate_armor_pants');
    this.slash_robe_skirt = loadSlash('LEGS_robe_skirt');
    this.slash_chain_jacket_purple = loadSlash('TORSO_chain_armor_jacket_purple');
    this.slash_chain_armor = loadSlash('TORSO_chain_armor_torso');
    this.slash_bracers = loadSlash('TORSO_leather_armor_bracers');
    this.slash_white_shirt = loadSlash('TORSO_leather_armor_shirt_white');
    this.slash_shoulder_armor = loadSlash('TORSO_leather_armor_shoulders');
    this.slash_leather_armor = loadSlash('TORSO_leather_armor_torso');
    this.slash_plate_shoulder_armor = loadSlash('TORSO_plate_armor_arms_shoulders');
    this.slash_plate_armor = loadSlash('TORSO_plate_armor_torso');
    this.slash_robe_shirt = loadSlash('TORSO_robe_shirt_brown');
    this.slash_dagger = loadSlash('WEAPON_dagger');
    this.slash_shield = loadSlash('WEAPON_shield_cutout_body');
    
    function loadSpellcast(name){
        return loadImage('character/spellcast/' + name);
    }
    
    // Load spellcast animation for sprites
    this.spellcast_quiver = loadSpellcast('BEHIND_quiver');
    this.spellcast_leather_belt = loadSpellcast('BELT_leather');
    this.spellcast_rope_belt = loadSpellcast('BELT_rope');
    this.spellcast_character = loadSpellcast('BODY_male');
    this.spellcast_skeletoncharacter = loadSpellcast('BODY_skeleton');
    this.spellcast_plate_shoes = loadSpellcast('FEET_plate_armor_shoes');
    this.spellcast_brown_shoes = loadSpellcast('FEET_shoes_brown');
    this.spellcast_plate_gloves = loadSpellcast('HANDS_plate_armor_gloves');
    this.spellcast_helmet = loadSpellcast('HEAD_chain_armor_helmet');
    this.spellcast_chain_hood = loadSpellcast('HEAD_chain_armor_hood');
    this.spellcast_blonde_hair = loadSpellcast('HEAD_hair_blonde');
    this.spellcast_leather_hat = loadSpellcast('HEAD_leather_armor_hat');
    this.spellcast_plate_helmet = loadSpellcast('HEAD_plate_armor_helmet');
    this.spellcast_robe_hood = loadSpellcast('HEAD_robe_hood');
    this.spellcast_green_pants = loadSpellcast('LEGS_pants_greenish');
    this.spellcast_plate_pants = loadSpellcast('LEGS_plate_armor_pants');
    this.spellcast_robe_skirt = loadSpellcast('LEGS_robe_skirt');
    this.spellcast_chain_jacket_purple = loadSpellcast('TORSO_chain_armor_jacket_purple');
    this.spellcast_chain_armor = loadSpellcast('TORSO_chain_armor_torso');
    this.spellcast_bracers = loadSpellcast('TORSO_leather_armor_bracers');
    this.spellcast_white_shirt = loadSpellcast('TORSO_leather_armor_shirt_white');
    this.spellcast_shoulder_armor = loadSpellcast('TORSO_leather_armor_shoulders');
    this.spellcast_leather_armor = loadSpellcast('TORSO_leather_armor_torso');
    this.spellcast_plate_shoulder_armor = loadSpellcast('TORSO_plate_armor_arms_shoulders');
    this.spellcast_plate_armor = loadSpellcast('TORSO_plate_armor_torso');
    this.spellcast_robe_shirt = loadSpellcast('TORSO_robe_shirt_brown');
    this.spellcast_water_staff = loadSpellcast('WEAPON_blue_staff');
    this.spellcast_darkness_staff = loadSpellcast('WEAPON_dark_staff');
    this.spellcast_nature_staff = loadSpellcast('WEAPON_green_staff');
    this.spellcast_fire_staff = loadSpellcast('WEAPON_red_staff');
    this.spellcast_staff = loadSpellcast('WEAPON_regular_staff');
    this.spellcast_ice_staff = loadSpellcast('WEAPON_teal_staff');
    this.spellcast_air_staff = loadSpellcast('WEAPON_white_staff');
    this.spellcast_lightning_staff = loadSpellcast('WEAPON_white_staff');
    
    function loadBow(name){
        return loadImage('character/bow/' + name);
    }
    
    // Load bow animation for sprites
    this.shoot_leather_belt = loadBow('BELT_leather');
    this.shoot_rope_belt = loadBow('BELT_rope');
    this.shoot_character = loadBow('BODY_male');
    this.shoot_plate_shoes = loadBow('FEET_plate_armor_shoes');
    this.shoot_brown_shoes = loadBow('FEET_shoes_brown');
    this.shoot_plate_gloves = loadBow('HANDS_plate_armor_gloves');
    this.shoot_helmet = loadBow('HEAD_chain_armor_helmet');
    this.shoot_chain_hood = loadBow('HEAD_chain_armor_hood');
    this.shoot_blonde_hair = loadBow('HEAD_hair_blonde');
    this.shoot_leather_hat = loadBow('HEAD_leather_armor_hat');
    this.shoot_plate_helmet = loadBow('HEAD_plate_armor_helmet');
    this.shoot_robe_hood = loadBow('HEAD_robe_hood');
    this.shoot_green_pants = loadBow('LEGS_pants_greenish');
    this.shoot_plate_pants = loadBow('LEGS_plate_armor_pants');
    this.shoot_robe_skirt = loadBow('LEGS_robe_skirt');
    this.shoot_chain_jacket_purple = loadBow('TORSO_chain_armor_jacket_purple');
    this.shoot_chain_armor = loadBow('TORSO_chain_armor_torso');
    this.shoot_bracers = loadBow('TORSO_leather_armor_bracers');
    this.shoot_white_shirt = loadBow('TORSO_leather_armor_shirt_white');
    this.shoot_shoulder_armor = loadBow('TORSO_leather_armor_shoulders');
    this.shoot_leather_armor = loadBow('TORSO_leather_armor_torso');
    this.shoot_plate_shoulder_armor = loadBow('TORSO_plate_armor_arms_shoulders');
    this.shoot_plate_armor = loadBow('TORSO_plate_armor_torso');
    this.shoot_robe_shirt = loadBow('TORSO_robe_shirt_brown');
    this.shoot_arrow = loadBow('WEAPON_arrow');
    this.shoot_bow = loadBow('WEAPON_bow');
}
var Clothes = new Clothes(); // Make a single instance;


/////////////////////////////////////////
//
//           MONSTERS
//
/////////////////////////////////////////


function Monster(opts){
    this.name = opts.name;
	this.d = 1;
	this.initAsRect(opts.x, opts.y, 32, 32);
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
	this.reverse = 0; // ticks to move backwards, after a successful attack
};
Monster.prototype.move = function(dx, dy){
    if (world.paused) return;
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
		this.attack(character);
	}
};

Monster.prototype.attack = function(victim){
    victim.takeDamage(this.damage);
    this.reverse = 3; // how many ticks to move backwards
};

Monster.prototype.initAsRect = initAsRect;

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
	if (this.reverse){
	    // backing up
	    dx *= -2;
	    dy *= -2;
	    this.reverse -= 1;
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
};

Monster.prototype.takeDamage = function(damage){
    console.log('hit %s for %s damage', this.name, damage);
	this.HP -= damage;
	damagetext.push([this.x, this.y, this.w, this.h, damage, frame, 1]);
	this.reverse = 5;
	if(this.HP <= 0){
		monsters.splice(monsters.indexOf(this), 1);
	}
};

var monsters = [
	new Monster({
	    name: 'bat', 
	    x: 400,
	    y: 50,
	    direction: NORTH,
	    speed: 2.2,
	    HP: 7,
	    sensing: 20,
	    damage: 1,
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
	    damage: 1,
	    AI: 'normal'
	})
];

/////////////////////////////////////////
//
//           PLAYER CHARACTER
//
/////////////////////////////////////////

//THERE IS NOT REASON TO DISABLE THIS. IF THERE IS A WAY TO HOOK IT PROPERLY THEN TELL ME BUT IF YOU CAN'T DO THAT THEN STOP DISABLING THESE!!!
setInterval(function(){
	if(character.attacked === true){
		character.animation = character.attack;
		character.sx = 0;
	}
	if(character.animation === character.attack){
		character.attacked = false;
		if(move.up){
			character.sy = 0; // face sprite up
		}else if(move.left){
			character.sy = 64; // face sprite left
		}else if(move.down){
			character.sy = 128; // face sprite down
		}else if(move.right){
			character.sy = 192;
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
    this.damage = [2, 5];
    this.animation = 'walk';
    this.maxsx = 576;
    this.attacked = false;
    this.hp = [100, 100];
    this.mp = [100, 100];
    
    // Mapping info and state
    this.initAsRect(320, 320, 64, 64);
    // sprite offset
    this.sx = 0;
    this.sy = 128;    
}

Character.prototype.initAsRect = initAsRect;

Character.prototype.takeDamage = function(damage){
    this.hp[0] -= damage;
    if (this.hp[0] <= 0){
        this.hp[0] = 0;
        endGame();
    }
};

Character.prototype.draw = function(ctx){
    var x = this.x - this.w/2, // x and y are the centre point
        y = this.y - this.h/2,
        w = this.w,
        h = this.h,
        sx = this.sx,
        sy = this.sy;
	if(this.animation === 'spellcast' && this.sy === 0){
	    
	}else{
		ctx.drawImage(Clothes[this.animation + '_' + 'character'], sx, sy, w, h, x, y, w, h);
		for(i=0; i < this.clothes.length; i++){
			ctx.drawImage(Clothes[this.animation + '_' + this.clothes[i]], sx, sy, w, h, x, y, w, h);
		}
	}
    if(keys.space){
    	this.animation = this.attack;
    	if(this.animation === 'spellcast'){
    		this.maxsx = 448;
    	}else if(this.animation === 'slash'){
    		this.maxsx = 384;
    		var opponent = monsterInRange();
    		if (opponent){
    			if(sx === 320 && frame%5===0){
    				opponent.takeDamage(Math.floor(Math.random() * (this.damage[1] - this.damage[0] + 1)) + this.damage[0]);
    			}
    		}
    	}else if(this.animation === 'shoot'){
    		this.maxsx = 832;
    	}
    	if(this.attacked === false){
    		if(this.animation === 'spellcast'){
    			ctx.drawImage(Clothes[this.animation + '_' + this.weapon], sx, sy, w, h, x+2, y+7, w, h);
    		}else{
    		    try{
    			    ctx.drawImage(Clothes[this.animation + '_' + this.weapon], sx, sy, w, h, x, y, w, h);
    			}catch(e){
    			    console.log('Error while trying to draw the weapon at offset %s,%s', sx, sy);
			    }
    		}
    		if((frame % 5 === 0)){
				sx = this.sx += 64;
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
    	ctx.drawImage(this[Clothes.animation + '_' + 'character'], sx, sy, w, h, x, y, w, h);
		for(i=0; i < this.clothes.length; i++){
			ctx.drawImage(Clothes[this.animation + '_' + this.clothes[i]], sx, sy, w, h, x, y, w, h);
		}
    }
    if(this.animation === 'walk'){
    	if(move.up){
			this.sy = 0; // face sprite up
    		if (!world.findCollision(10, -this.speed +32)){
    			this.y -= this.speed;
	    	}
		}else if(move.left){
	    	this.sy = 64; // face sprite left
	    	if (!world.findCollision(-this.speed +10, 44)){
		   		this.x -= this.speed;
			}
		}else if(move.down){
	    	this.sy = 128; // face sprite down
	    	if (!world.findCollision(10, this.speed +45)){
		    	this.y += this.speed;
			}
		}else if(move.right){
			this.sy = 192;
	    	if(!world.findCollision(this.speed +20, 44)){
    			this.x += this.speed;
    		}
		}
		if((frame % 5 === 0) && (move.up|| move.left || move.down || move.right) && this.animation === 'walk'){
			this.sx += 64;
		}
		if(!(move.up || move.left || move.down || move.right)){
			this.sx = 0;
		}
	}
	if(this.sx >= this.maxsx){
		this.sx = 64;
		if(this.animation === this.attack){
			this.attacked = true;
		}
	}
};

var character = new Character();

function monsterInRange(){
    // implement me!
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
};


/////////////////////////////////////////
//
//           START AND SWITCH SCENES
//
/////////////////////////////////////////

var gameLoop, menuLoop, settingsLoop;

//starts the game
function initGame(){
	window.world = World();
	world.ui = [
    	UIBox('All the random text in the world goes here, and here it will stay until Arthur is once again king of all Britons.', 5, HEIGHT - 240, WIDTH-10, 240),
    	UIButton('next', WIDTH-300, HEIGHT - 240 + 180, 180, 50, function(){world.ui[0].text = '';}),
    	UIBox('     ' + character.name, 200, 40, 300, 120),
    	new CharacterInfo()
    ];
    world.ui[0].fades = true;
    world.ui[1].fades = true;
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

function gameOverClickHandler(evt){
    world.ui.forEach(function(ui){
        if (ui.containsPoint(evt.clientX, evt.clientY)){
            ui.trigger();
        }
    });
}

function endGame(){
    var w = 500, h = 300;
    pauseGame();
    document.onclick = gameOverClickHandler;
    world.ui = [
    	UIBox('', WIDTH/2 - w/2, HEIGHT/2 - h/2, w, h),
    	UIText('GameOver', WIDTH/2, HEIGHT/2 - h/2 + 50, 'center', 18),
    	UIButton('menu', WIDTH/2 - 90, HEIGHT/2 - h/2 + 70, 180, 50, function(){
    		location.reload();
    	})
    ];
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
    };
    document.onmouseup = function(){
    	click = false;
    };
    document.onkeydown = function(evt){
        // console.log(evt);
        // console.log('character: %s', String.fromCharCode(evt.keyCode));
        // console.log('keycode: %s', evt.keyCode);
    	keydown = true;
    	lastkeycode = keycode;
    	keycode = evt.keyCode; // To trap DELETE, use keyCode == 8 and return false;
    	return false;
    };
    document.onkeyup = function(evt){
    	keydown = false;
    	keycode = 0;
    	lastkeycode = 0;
    };
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
	if(frame%100 === 0){
		if(character.hp[0] < character.hp[1]){
			character.hp[0] += 1;
		}
		if(character.mp[0] < character.mp[1]){
			character.mp[0] += 1;
		}
	}
	ctx.save();
	var offsetX = Math.round(-character.x + WIDTH/2 - character.w/2);
	var offsetY = Math.round(-character.y + HEIGHT/2 - character.h/2);
	ctx.translate(offsetX, offsetY);
	var viewportOffsetX = Math.round(character.x - WIDTH/2 + character.w/2);
	var viewportOffsetY = Math.round(character.y - HEIGHT/2 + character.h/2);
	world.viewport = {x: viewportOffsetX, y: viewportOffsetY, w: WIDTH, h: HEIGHT};
	world.draw(ctx);
	monsters.forEach(function(monster){
		monster.useAI();
		monster.draw(ctx);
	});
    // NPCs.forEach(function(NPC){
    //  NPC.useAI();
    //  NPC.draw(ctx);
    // });
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
    drawUI(world.ui, ctx);
    if (!world.game_over){
	    gameLoop = requestAnimationFrame(drawGame);
	}
}

function dayfunction(){
	if(daydirection === 1){
		setTimeout(function(){
			daydirection = 1;
		}, 60000*3.5);
	}else if(daydirection === 0){
		setTimeout(function(){
			daydirection = 1;
		}, 60000*5);
	}
	daydirection = 3;
}

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

function pauseGame(){
    if (world.paused){
        document.onkeydown = gameKeydown;
        document.onkeyup = gameKeyup;
        document.onclick = null;
    }else{
        move.up = move.up_m = move.left = move.left_m = move.down = move.down_m = move.right = move.right_m = false;
        document.onkeydown = null;
        document.onkeyup = null;
    }
    world.paused = !world.paused;
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
			    
			case 80: // 'p' key
			    pauseGame();
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
