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
//           UI ELEMENTS (BUTTONS, SCROLLBARS, SLIDERS, TEXTBOXES ETC.)
//
/////////////////////////////////////////

var dialogOpacity = 1;
var dialogfading = 'out';
var UI = loadImages('button_default', 'input', 'confirm_bg', 'bar_hp_mp', 'menu_xp');


function drawUI(ui, ctx){
	if(dialogfading === 'in'){
		if(dialogOpacity < 1){
			dialogOpacity += 0.05;
		}
	}else if(dialogfading === 'out'){
		if(dialogOpacity > 0){
			dialogOpacity -= 0.05;
		}
	}
	if(dialogOpacity <= 0){
		dialogOpacity = 0;
	}else if(dialogOpacity >= 1){
		dialogOpacity = 1;
	}
	for(var i = 0; i < ui.length; i++){
		ui[i].draw(ctx);
		if(ui[i].containsPoint(mouseX, mouseY) && click){
			ui[i].trigger();
		};
	};
}

function CharacterInfo(){
}

CharacterInfo.prototype.draw = function(ctx){
	ctx.beginPath();
	ctx.arc(140, 140, 125, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fillStyle = 'rgba(0, 0, 0, 1)';
	ctx.fill();
	var bar_w = 200;
	ctx.drawImage(UI.bar_hp_mp, 0, 0, 24, 32, 280, 80, 24, 32);
	ctx.drawImage(UI.bar_hp_mp, 24, 0, 24, 32, 304, 80, bar_w-48, 32);
	ctx.drawImage(UI.bar_hp_mp, 82, 0, 24, 32, 256 + bar_w, 80, 24, 32);
	if (character.hp[0] > 0){
    	ctx.drawImage(UI.bar_hp_mp, 3, 34, Math.min(bar_w - ((((character.hp[1] - character.hp[0])/character.hp[1]))*bar_w), 24), 16, 282, 81, Math.min(bar_w - 48 - ((((character.hp[1] - character.hp[0])/character.hp[1]))*bar_w - 48), 24), 16);
    	ctx.drawImage(UI.bar_hp_mp, 27, 34, 24 - (((character.hp[1] - character.hp[0])/character.hp[1]))*24, 16, 306, 81, Math.max(bar_w-48 - (((character.hp[1] - character.hp[0])/character.hp[1])*bar_w-48)-32, 0), 16);
    }
	ctx.drawImage(UI.bar_hp_mp, 82, 34, 24, 16, 280 + bar_w - 24, 81, 24, 16);
	//ctx.drawImage(UI.bar_hp_mp, 3, 34, 100 - (((character.hp[1] - character.hp[0])/character.hp[1])*100), 16, 284, 81, 200 - (((character.hp[1] - character.hp[0])/character.hp[1])*200), 32);
	//ctx.drawImage(UI.bar_hp_mp, 3, 48, 100 - (((character.mp[1] - character.mp[0])/character.mp[1])*100), 16, 284, 107, 200 - (((character.mp[1] - character.mp[0])/character.mp[1])*200), 32);
	ctx.fillStyle = '#fff';
    ctx.font = '5pt PressStart2PRegular';
    ctx.textAlign = 'center';
	ctx.fillText('HP:'+ character.hp[0] +'/'+ character.hp[1], 384, 95);
	ctx.fillText('MP:'+ character.mp[0] +'/'+ character.mp[1], 384, 109);
};

CharacterInfo.prototype.containsPoint = function(x,y){
    return false;
};


function UIElement(text, x, y, w, h, draw, trigger){
    this.text = text;
    this.x = x;
    this.y = y;
    this.top = y;
    this.left = x;
    this.right = x + w;
    this.bottom = y + h;
    this.w = w;
    this.h = h;
    this.draw = draw || function(){};
    this.trigger = trigger || function(){};
}

UIElement.prototype.wrapText = function(ctx, padding){
    var w = this.w - padding*2;
    var t = this.text.split(' ').reverse();
    var orig_text = this.text;
    var prev = '';
    var line = '';
    this.text = [];
    ctx.save();
    ctx.font = this.font;
    while(t.length){
        var curr = t.pop();
        line = prev + ' ' + curr;
        if (ctx.measureText(line).width > w){
            this.text.push(prev);
            line = prev = '';
            t.push(curr);
        }else{
            prev = line;
        }
    }
    if (line.length){
        this.text.push(line);
    }
    ctx.restore();
    this.textWrapped = true;
};

UIElement.prototype.containsPoint = function(x,y){
    if (x < this.left) return false;
    if (y < this.top) return false;
    if (x > this.right) return false;
    if (y > this.bottom) return false;
    return true;
};

function UITextbox(text, x, y, w, h){
	function draw(ctx){
		if (this.text.length && !this.textWrapped){
		    this.wrapText(ctx, 20);
	    }
		var key = 48;
		var lastkey = 16;
		var pt = this.containsPoint(mouseX, mouseY);
		var sy = 0;
		if(pt){
			document.body.style.cursor = 'text';
		}else{
			document.body.style.cursor = 'auto';
		}
		if(pt && click){
			this.clicked = true;
			console.log(':)');
		}else{
			this.clicked = false;
			console.log(':(');
		}
		if(this.clicked === true){
			sy = 20;
		}
		if(this.clicked){
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
		
        // if(keydown && this.clicked){
        //  if((frame - lastframe) > 30){
        //      lastframe = frame;
        //      t = t.split('');
        //      console.log(keydown)
        //      
        //      if(key >= 48 && key <= 90){
        //          key = String.fromCharCode(keycode);
        //          if(shift === false){
        //              key = key.toLowerCase();
        //          }
        //          t.splice(t.length-cursor, 0, key);
        //          
        //      }
        //  }
        // }
		if(keydown === false && key === 0){
			shift = false;
		}
		if(!keydown && this.clicked){
			lastframe -= 30;
		}
        // for(i = 0; i < t.length; i++){
        //  t2 = t2 + t[i]
        // }
        // t=t2;
		ctx.drawImage(UI.input, 32, sy, 32, 20, x+32, y, w-64, h);
		ctx.drawImage(UI.input, 0, sy, 32, 20, x, y, 32, h);
		ctx.drawImage(UI.input, 98, sy, 32, 20, x+(w-64+32), y, 32, h);
		
		ctx.fillStyle = 'black';
        ctx.font = this.font;
        ctx.textAlign='left';
        for (var i = 0; i < this.text.length; i++){
            ctx.fillText(this.text[i], x +10, y + 30 + (16*i), 99999999999);
            if(cursoron){
            	ctx.fillText('|', x + ((t2.length-cursor)*16), y + 30 + (16+i), w-20);
            }
        }
	}
	var elem = new UIElement(text, x, y, w, h, draw);
	elem.clicked = false;
	elem.cursor = 0;
	elem.cursoron = false;
	elem.t = text;
	elem.lastframe = 0;
	elem.font = '12pt PressStart2PRegular';
    return elem;
}

function UIText(text, x, y, positioning, size){
	function draw(ctx){
		ctx.fillStyle = '#fff';
    	ctx.font = size + 'pt PressStart2PRegular';
    	ctx.textAlign = positioning;
    	ctx.fillText(text, x, y);
	}
	return new UIElement(text, x, y, 0, 0, draw);
}

function UIButton(text, x, y, w, h, trigger){
    function draw(ctx){
	    if (this.fades){
		    ctx.globalAlpha = dialogOpacity;
		}
    	var pt = this.containsPoint(mouseX, mouseY);
        drawbutton(ctx, x, y, w, h, pt);
        //we should put the text in the drawbutton function
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.font = '14pt PressStart2PRegular';
        ctx.textAlign = 'center';
        ctx.fillText(text, x + w/2, y + 35, w - 20);
        ctx.globalAlpha = 1;
    }
    return new UIElement(text, x, y, w, h, draw, trigger);
}

function UIBox(text, x, y, w, h){
	function draw(ctx){
	    if (this.fades){
		    ctx.globalAlpha = dialogOpacity;
		}
		if (this.text.length && !this.textWrapped){
		    this.wrapText(ctx, 20);
	    }
		ctx.drawImage(UI.confirm_bg, 0, 0, 32, 32, x, y, 32, 32);
		ctx.drawImage(UI.confirm_bg, 160, 0, 32, 32, x+w-32, y, 32, 32);
		ctx.drawImage(UI.confirm_bg, 32, 0, 32, 32, x+32, y, w-64, 32);
		ctx.drawImage(UI.confirm_bg, 0, 32, 32, 32, x, y+h-32, 32, 32);
		ctx.drawImage(UI.confirm_bg, 160, 32, 32, 32, x+w-32, y+h-32, 32, 32);
		ctx.drawImage(UI.confirm_bg, 32, 32, 32, 32, x+32, y+h-32, w-64, 32);
		ctx.drawImage(UI.confirm_bg, 0, 16, 32, 32, x, y+32, 32, h-64);
		ctx.drawImage(UI.confirm_bg, 160, 16, 32, 32, x+w-32, y+32, 32, h-64);
		ctx.drawImage(UI.confirm_bg, 32, 16, 32, 32, x+32, y+32, w-64, h-64);
		ctx.fillStyle = '#fff';
        ctx.font = this.font;
        ctx.textAlign = 'left';
        for (var i = 0; i < this.text.length; i++){
            ctx.fillText(this.text[i], this.x+20, this.y+35 + (20*i), WIDTH-20);
        }
        ctx.globalAlpha = 1;
	}
	var elem = new UIElement(text, x, y, w, h, draw);
	elem.font = '10pt PressStart2PRegular';
	elem.fades = false;
	return elem;
}

function UITitle(text, x, y){
    function draw(ctx){
        ctx.fillStyle = '#900';
        ctx.font = '100pt PressStart2PRegular';
        ctx.textAlign = 'center';
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
	ctx.drawImage(UI.button_default, 40, sy, 32, 28, x+height, y, width -(height*2), height);
	ctx.drawImage(UI.button_default, 7, sy, 32, 28, x, y, height, height);
	ctx.drawImage(UI.button_default, 104, sy, 32, 28, x+(width-height), y, height, height);
}
