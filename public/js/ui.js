/////////////////////////////////////////
//
//           UI ELEMENTS (BUTTONS, SCROLLBARS, SLIDERS, TEXTBOXES ETC.)
//
/////////////////////////////////////////

var dialogY = 240;
var dialogdirectionY = 'down';
var dialogtext = '';
var futuredialogtext = "ALL THE RANDOM TEXT WILL GO HERE ONCE WE FIX THE TEXT WRAPPING";

var UI = loadImages('button_default', 'input', 'confirm_bg', 'bar_hp_mp', 'menu_xp');


function drawUI(ctx){
	if(dialogdirectionY === 'up'){
		if(dialogY < 240){
			dialogY += 5;
		}
	}else if(dialogdirectionY === 'down'){
		if(dialogY > -240){
			dialogY -= 5;
		}
	}
	if(dialogtext.length != futuredialogtext.length){
		var t = futuredialogtext.split('');
		dialogtext += t[(dialogtext.length)];
	}
	
	var ui = [
		UIBox(dialogtext, 5, HEIGHT - dialogY, WIDTH-10, 240),
		UIButton('next', WIDTH-300, HEIGHT - dialogY + 180, 180, 50, function(){dialogtext = '';}),
		UIBox('     ' + character.name, 200, 40, 300, 120)
	];
	for(var i = 0; i < ui.length; i++){
		ui[i].draw(ctx);
		if(ui[i].containsPoint(mouseX, mouseY) && click){
			ui[i].trigger();
		};
	};
	ctx.beginPath();
	ctx.arc(140, 140, 125, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fillStyle = 'rgba(0, 0, 0, 1)';
	ctx.fill();
	if(frame%60 === 0){
		if(character.hp[0] < character.hp[1]){
			character.hp[0] += 1;
		}
		if(character.mp[0] < character.mp[1]){
			character.mp[0] += 1;
		}
	}
	var bar_w = 200;
	ctx.drawImage(UI.bar_hp_mp, 0, 0, 24, 32, 280, 80, 24, 32);
	ctx.drawImage(UI.bar_hp_mp, 24, 0, 24, 32, 304, 80, bar_w-48, 32);
	ctx.drawImage(UI.bar_hp_mp, 82, 0, 24, 32, 256 + bar_w, 80, 24, 32);
	ctx.drawImage(UI.bar_hp_mp, 3, 34, Math.min(bar_w - ((((character.hp[1] - character.hp[0])/character.hp[1]))*bar_w), 24), 16, 282, 81, Math.min(bar_w - ((((character.hp[1] - character.hp[0])/character.hp[1]))*bar_w), 24), 16);
	ctx.drawImage(UI.bar_hp_mp, 27, 34, 24 - (((character.hp[1] - character.hp[0])/character.hp[1]))*24, 16, 306, 81, bar_w-48 - (((character.hp[1] - character.hp[0])/character.hp[1])*bar_w-24), 16);
	//ctx.drawImage(UI.bar_hp_mp, 3, 34, 100 - (((character.hp[1] - character.hp[0])/character.hp[1])*100), 16, 284, 81, 200 - (((character.hp[1] - character.hp[0])/character.hp[1])*200), 32);
	//ctx.drawImage(UI.bar_hp_mp, 3, 48, 100 - (((character.mp[1] - character.mp[0])/character.mp[1])*100), 16, 284, 107, 200 - (((character.mp[1] - character.mp[0])/character.mp[1])*200), 32);
	ctx.fillStyle = '#fff';
    ctx.font = '7pt PressStart2PRegular';
    ctx.textAlign = 'center'
	ctx.fillText('HP:'+ character.hp[0] +'/'+ character.hp[1], 384, 103);
	ctx.fillText('MP:'+ character.mp[0] +'/'+ character.mp[1], 384, 130);
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
        ctx.font = '12pt PressStart2PRegular';
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
        ctx.font = '14pt PressStart2PRegular';
        ctx.textAlign = 'center';
        ctx.fillText(text, x + w/2+10, y + 35, w - 20);
    }
    return new UIElement(text, x, y, w, h, draw, trigger);
}

function UIBox(text, x, y, w, h){
	function draw(ctx){
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
        ctx.font = '10pt PressStart2PRegular';
        ctx.textAlign = 'left'
        ctx.fillText(text, x+20, y+35, WIDTH-20);
	}
	return new UIElement(text, x, y, w, h, draw);
}

function UITitle(text, x, y){
    function draw(ctx){
        ctx.fillStyle = '#900';
        ctx.font = '100pt PressStart2PRegular';
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
