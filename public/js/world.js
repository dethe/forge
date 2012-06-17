function World(){

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

	var worldspec = [
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], 'sand_NW', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_N', 'sand_NE', ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], ['collision', 'water_C'], 'sand_W', 'sand_C', 'sand_C', 'sand_C', ['sand_C', 'grass_NW'], ['sand_C', 'grass_N'], ['sand_C', 'grass_NE'], 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], 'sand_NW', 'sand_ISE', 'sand_C', 'sand_C', 'sand_C', ['sand_C', 'grass_W'], ['sand_C', 'grass_C'], ['sand_C', 'grass_E'], 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_C', ['sand_C', 'grass_SW'], ['sand_C', 'grass_S'], ['sand_C', 'grass_SE'], 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], 'sand_SW', 'sand_S', 'sand_INE', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], 'sand_SW', 'sand_INE', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], ['collision', 'water_C'], 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_C', 'sand_E', ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C','water_C' , ['collision', 'water_C'], 'sand_NW', 'sand_ISE', 'sand_C', 'sand_C', 'sand_INW', 'sand_S', 'sand_S', 'sand_S', 'sand_INE', 'sand_C', 'sand_C', 'sand_INW', 'sand_SE', ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], 'sand_W', 'sand_C', 'sand_C', 'sand_C', 'sand_E', 'water_C', 'water_C', 'water_C', 'sand_SW', 'sand_S', 'sand_S', 'sand_SE', 'water_C', ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], 'sand_SW', 'sand_S', 'sand_S', 'sand_S', 'sand_SE', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], ['collision', 'water_C'], 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C'],
		['water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C', 'water_C']
	];

	var world = [];

	var worldorigin = [0, 0];

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
	};

	var terrain = loadImages('grass', 'dirt', 'barrels', 'sand', 'water');

	function parseWorld(){
		for(var i = 0; i < worldspec.length; i++){
			var row = [];
			world.push(row);
			for(var e = 0; e < worldspec[i].length; e++){
				var location = [];
				row.push(location);
				var spec = worldspec[i][e];
				if (!spec) continue;
				if (isArray(spec)){
					spec.forEach(function(subspec){
						if(subspec !== 'collision'){
							location.push(Tile(subspec,e,i));
						}else{
						    location.collision = true;
					    }
					});
				}else{
					location.push(Tile(spec,e,i));
				}
			}
		}
	};

    function findCharTile(xOffset, yOffset, findCollision, xANDy){
    	var tile;
    	var cx = characterInfo.x;
    	var cy = characterInfo.y;
    	var tilesX, tilesY;
    	if(!!xANDy){
    		cx = xANDy.x;
    		cy = xANDy.y;
    		tilesY = Math.round((cy - yOffset - characterInfo.y) / 32);
    		tilesX = Math.round((cx - xOffset - characterInfo.x) / 32);
    		tile = world[tilesY][tilesX];
    	}else{
    		tilesY = Math.round((cy - yOffset) / 32);
    		tilesX = Math.round((cx - xOffset) / 32);
    		tile = world[tilesY][tilesX];
    	}
    	if (findCollision) return !tile.collision;
    	return tile;
    }

    function Tile(spec, tx, ty){
     var tile_offset = spec.split('_'),
         tile = terrain[tile_offset[0]],
         offset = offsets[tile_offset[1]];
     return {
         g:tile,
         sx:offset.x,
         sy:offset.y,
         w:32,
         h:32,
         x:  ((tx - worldorigin[0])*32) + ((WIDTH/2)),
         y: ((ty - worldorigin[1])*32) + ((HEIGHT/2))
     };
    }
    
    function drawworld(){
        for(var i = 0; i < world.length; i++){
            for(var e = 0; e < world[i].length; e++){
                for (var t = 0; t < world[i][e].length; t++){
                    var tile = world[i][e][t];
                    ctx.drawImage(tile.g, tile.sx, tile.sy, tile.w, tile.h, tile.x - characterInfo.x, tile.y - characterInfo.y, 32, 32);
                }
            }
        }
    }
    
    parseWorld();
    return {
        world: world,
        draw: drawworld,
        findCharTile: findCharTile
    };
}