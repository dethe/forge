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

var CHUNK_SIZE = 640; // 32 * 20

function World(){
    
    //loads images

    var terrain = loadImages('grass', 'reeds', 'sandandwater', 'sand', 'wheat', 'cement','cement_stairs', 'kitchen', 'dirt', 'dirt2', 'grassalt', 'hole', 'lava', 'lavarock', 'water', 'waterandgrass', 'farming_fishing', 'barrels', 'tileset01', 'fence', 'castle_outside', 'castlewalls', 'castlefloors', 'castlefloors_outside', 'brickwalldark', 'dungeon', 'signs', 'house_tiles_exterior', 'house_tiles_interior', 'house_stairs_interior', 'cabinets', 'bridges', 'chests', 'buckets', 'wheelbarrow', 'misc', 'miscellaneous', 'fence_alt', 'rocks', 'wood_house_exterior', 'white_house_exterior', 'treetop', 'treetrunk', 'hole', 'furniture', 'furniture2', 'flowers', 'plowed_soil', 'signpost', 'plants', 'limestone_wall01');

    

	function WorldChunk(name, x, y, debug){
		this.name = name;
		this.x = x;
		this.y = y;
		this.w = CHUNK_SIZE;
		this.h = CHUNK_SIZE;
		this.left = x - this.w/2;
		this.top = y - this.h/2;
		this.right = this.left + this.w;
		this.bottom = this.top + this.h;
		this.debug = debug;
		if (debug){
		    console.log('%s: (%s,%s,%s,%s)', this.name, this.left, this.top, this.w, this.h);
		}
		this.init();
	}
	
	WorldChunk.allChunks = [];
	
	// global to all WorldChunks
	WorldChunk.chunkAt = function(x,y){
	    for (var i = 0; i < WorldChunk.allChunks.length; i++){
	        if (WorldChunk.allChunks[i].pixelIsInChunk(x,y)){
	            return WorldChunk.allChunks[i];
	        }
        }
        return null;
    };
    
    WorldChunk.prototype.locationAt = function(x,y){
        var row = Math.round((x - this.left) / 32);
        var col = Math.round((y - this.top) / 32);
        // console.log('accessing row %s, column %s', row, col);
        return this.rows[row][col];
    };

	WorldChunk.prototype.init = function(){
		var self = this;
		self.rows = [];
		var req = new XMLHttpRequest();
		req.addEventListener('load', function(evt){
			self.parseSpec(JSON.parse(req.responseText));
		});
		req.addEventListener('error', function(evt){
			console.log('Error loading map');
		});
		req.addEventListener('abort', function(evt){
			console.log('Loading map cancelled');
		});
		req.open('GET', 'maps/' + this.name + '.json', true);
		req.send();
		WorldChunk.allChunks.push(this);
	};
	
	WorldChunk.prototype.pixelIsInChunk = function(x,y){
	    if (x < this.left || x > this.right) return false;
	    if (y < this.top || y > this.bottom) return false;
	    return true;
    };
    
    
    WorldChunk.prototype.isVisible = function(){
        if (this.right < world.viewport.x || this.left > (world.viewport.x + world.viewport.w)) return false;
        if (this.bottom < world.viewport.y || this.top > (world.viewport.y + world.viewport.h)) return false;
        return true;
    };
    
    WorldChunk.prototype.drawCache = function(){
        this.cache = document.createElement('canvas');
        this.cache.setAttribute('width', this.w);
        this.cache.setAttribute('height', this.h);
        var ctx = this.cache.getContext('2d');
		this.topTiles = [];
		for(var i = 0; i < this.rows.length; i++){
			for(var e = 0; e < this.rows[i].length; e++){
				for (var t = 0; t < this.rows[i][e].length; t++){
					var tile = this.rows[i][e][t];
					if(tile.spec === 'Farming_Fishing AA'){
						this.topTiles.push(tile);
					}else{
						tile.draw(ctx);
					}
				}
			}
		}
    };
    
    WorldChunk.prototype.draw = function(ctx){
        if (!this.isVisible()) return;
        if (!this.cache){
            this.drawCache();
        }
        ctx.drawImage(this.cache, this.left, this.top, this.w, this.h);
    };
    
    WorldChunk.prototype.drawTop = function(ctx){
        if (!this.isVisible()) return;
        this.topTiles.forEach(function(tile){
            tile.draw(ctx);
        });
    };
    
	WorldChunk.prototype.parseSpec = function(chunkspec){
	    var self = this;
		for(var i = 0; i < chunkspec.length; i++){
			var row = [];
			this.rows.push(row);
			for(var e = 0; e < chunkspec[i].length; e++){
				var location = [];
				row.push(location);
				var spec = chunkspec[i][e];
				if (!spec || spec === '') continue;
				if (isArray(spec)){
					spec.forEach(function(subspec){
						if (subspec === 'collision'){
							location.collision = true;
						}else if (subspec !== ''){
							location.push(new Tile(subspec,e,i, self));
							if(subspec === 'Castle_outside LH'){
                                // console.log('collide');
								location.collision = true;
							}
						}
					});
				}else{
					location.push(new Tile(spec,e,i, self));
				}
			}
		}
	};

	
    new WorldChunk('grass', 640, 0);
    new WorldChunk('grass', 1280, 0);
    new WorldChunk('grass', 1920, 0);
    new WorldChunk('grass', 2560, 0);
    new WorldChunk('grass', 3200, 0);
    new WorldChunk('grass', 3840, 0);
    new WorldChunk('vertical_path', 0, 0);
    new WorldChunk('grass', -640, 0);
    new WorldChunk('grass', -1280, 0);
    new WorldChunk('grass', -1920, 0);
    new WorldChunk('grass', -2560, 0);
    new WorldChunk('grass', -3200, 0);
    new WorldChunk('grass', -3840, 0);
    new WorldChunk('castle_entrance_with_towers_and_windows', 0, 0);
    new WorldChunk('castlewall_with_windows', 640, 0);
    new WorldChunk('castlewall_with_windows', 1280, 0);
    new WorldChunk('castlewall_with_windows', 1920, 0);
    new WorldChunk('castlewall_with_windows', 2560, 0);
    new WorldChunk('castlewall_with_windows', 3200, 0);
    new WorldChunk('castlewall_with_windows', 3840, 0);
    new WorldChunk('castlewall_with_windows', -640,0);
    new WorldChunk('castlewall_with_windows', -1280, 0);
    new WorldChunk('castlewall_with_windows', -1920, 0);
    new WorldChunk('castlewall_with_windows', -2560, 0);
    new WorldChunk('castlewall_with_windows', -3200, 0);
    new WorldChunk('castlewall_with_windows', -3840, 0);
    new WorldChunk('grass', 640, 640);
    new WorldChunk('grass', 1280, 640);
    new WorldChunk('grass', 1920, 640);
    new WorldChunk('grass', 2560, 640);
    new WorldChunk('grass', 3200, 640);
    new WorldChunk('grass', 3200, 640);
    new WorldChunk('grass', 3840, 640);
    new WorldChunk('castle_path_to_entrance(unfinished)', 0, 640);
    new WorldChunk('grass', -640, 640);
    new WorldChunk('grass', -1280, 640);
    new WorldChunk('grass', -1920, 640);
    new WorldChunk('grass', -2560, 640);
    new WorldChunk('grass', -3200, 640);
    new WorldChunk('grass', -3200, 640);
    new WorldChunk('grass', -3840, 640);
    new WorldChunk('vertical_path', 0, 1280);
    new WorldChunk('path_and_bridge', 0, 1920);


	
	function findCollision(x, y){
		if (x === undefined){
		    x = character.x;
		    y = character.y;
		}
		var location = findLocationAt(x,y);
		if (location){
		    if (location.collision) return true;
		    if (location.length === 0) return true;
		    return false;
		}
		return true;
	}

	function findLocationAt(x,y){
		if (x === undefined){
		    x = character.x;
		    y = character.y;
		}
		var chunk = WorldChunk.chunkAt(x,y);
		if (chunk){
		    return chunk.locationAt(x,y);
		}
	}

	function Tile(spec, tx, ty, chunk){
        // console.log('creating tile %s, %s, %o', tx, ty, chunk);
	 var tile_offset = spec.split(' '),
		 tile = terrain[tile_offset[0].toLowerCase()],
		 offset = offsets[tile_offset[1]];
		 this.spec = spec;
		 this.g = tile;
		 this.sx = offset.x;
		 this.sy = offset.y;
		 this.w = 32;
		 this.h = 32;
		 this.x = tx * this.w;
		 this.y = ty * this.h;
	}
	
	Tile.prototype.draw = function(ctx, debug){
		ctx.drawImage(this.g, this.sx, this.sy, this.w, this.h, this.x, this.y, this.w, this.h);
		if (debug){
		    console.log('drawing tile at %s, %s, you are at %s, %s', this.x, this.y, character.x, character.y);
		    ctx.strokeStyle = 'blue';
		    ctx.strokeRect(this.x, this.y, this.w, this.h);
	    }
	};
	
	function drawworld(ctx){
	    WorldChunk.allChunks.forEach(function(chunk){
	        chunk.draw(ctx);
        });
	}
	
	function drawworldtop(ctx){
	    WorldChunk.allChunks.forEach(function(chunk){
	        chunk.drawTop(ctx);
        });
	}
	var world = {
	    viewport: {x: 0, y: 0, w: WIDTH, h: HEIGHT},
		draw: drawworld,
		drawtop: drawworldtop,
		findCollision: findCollision,
		chunks: WorldChunk.allChunks
	};
	return world;
}