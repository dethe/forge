// Forge Game - Web Standards Entry for Liberated Pixel Cup
// Copyright (C) 2012  Azlen Elza
//  
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//  
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//  
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


/////////////////////////////////////////
//
//           NPC's
//
/////////////////////////////////////////

function NPC(name, x, y, direction, speed, path, clothing, talk, talkObj){
	this.animation = 'walk';
	this.initAsRect(x,y,64,64);
    this.sx= 0;
    this.sy = 128;
	this.direction = direction;
	this.name = name;
	this.path = path;
	this.path_progress = 0;
	this.clothes = clothing;
	this.talk = talk;
	this.talkObj = talkObj;
	this.maxsx = 576;
	this.animating = true;
	this.AIxy = 'x';
	this.speed = speed;
};

NPC.prototype.draw = function(ctx){
    var sx = this.sx,
        sy = this.sy,
        x = this.x - this.w/2,
        y = this.y - this.h/2,
        w = this.w,
        h = this.h;
	ctx.drawImage(Clothes[this.animation + '_' + 'character'], sx, sy, w, h, x, y, w, h);
	for(i=0; i < this.clothes.length; i++){
		ctx.drawImage(Clothes[this.animation + '_' + this.clothes[i]], sx, sy, w, h, x, y, w, h);
	}
	ctx.fillStyle = '#000';
	ctx.font = '6pt PressStart2PRegular';
	ctx.textAlign = 'center';
	ctx.fillText(this.name, x + 32, y + 10);
};

NPC.prototype.initAsRect = initAsRect;

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
			this.sx += 64;
		}
		this.sy = this.direction*64;
		if((this.path[this.path_progress][0] - this.x) < 10 && (this.path[this.path_progress][0] - this.x) > -10 && (this.path[this.path_progress][1] - this.y) < 10 && (this.path[this.path_progress][1] - this.y) > -10){
			
		}
		this.x += dx*this.speed;
		this.y += dy*this.speed;
	}else{
		this.sx = 0;
	}
	if(this.sx >= this.maxsx){
		this.sx = 64;
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
								'text': 'Yes...'
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
		}
	}),
	new NPC('Soldier', 174, 100, 2, 2, [[500, 100], [500, 500], [100, 500], [100, 100]], ['plate_helmet', 'plate_armor', 'plate_pants', 'plate_shoes', 'plate_shoulder_armor', 'plate_gloves'], true, {}),
	new NPC('Soldier', 250, 100, 2, 2, [[500, 100], [500, 500], [100, 500], [100, 100]], ['plate_helmet', 'plate_armor', 'plate_pants', 'plate_shoes', 'plate_shoulder_armor', 'plate_gloves'], true, {}),
	new NPC('Captain', 324, 100, 2, 2, [[500, 100], [500, 500], [100, 500], [100, 100]], ['helmet', 'plate_armor', 'robe_skirt', 'plate_shoes'], true, {})
];
