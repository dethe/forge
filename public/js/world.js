function World(){

	var worldspec = [
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], 'sand NW', 'sand N', 'sand N', 'sand N', 'sand N', 'sand N', 'sand N', 'sand N', 'sand N', 'sand N', 'sand N', 'sand N', 'sand N', 'sand NE', ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], 'sand W', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand E', ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], 'sand W', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand E', ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], ['collision', 'water C'], 'sand W', 'sand C', 'sand C', 'sand C', ['sand C', 'grass NW'], ['sand C', 'grass N'], ['sand C', 'grass NE'], 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand E', ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], 'sand NW', 'sand ISE', 'sand C', 'sand C', 'sand C', ['sand C', 'grass W'], ['sand C', 'grass C'], ['sand C', 'grass E'], 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand E', ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], 'sand W', 'sand C', 'sand C', 'sand C', 'sand C', ['sand C', 'grass SW'], ['sand C', 'grass S'], ['sand C', 'grass SE'], 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand E', ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], 'sand W', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand E', ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], 'sand SW', 'sand S', 'sand INE', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand E', ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], 'sand SW', 'sand INE', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand E', ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], ['collision', 'water C'], 'sand W', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand C', 'sand E', ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C','water C' , ['collision', 'water C'], 'sand NW', 'sand ISE', 'sand C', 'sand C', 'sand INW', 'sand S', 'sand S', 'sand S', 'sand INE', 'sand C', 'sand C', 'sand INW', 'sand SE', ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], 'sand W', 'sand C', 'sand C', 'sand C', 'sand E', 'water C', 'water C', 'water C', 'sand SW', 'sand S', 'sand S', 'sand SE', 'water C', ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], 'sand SW', 'sand S', 'sand S', 'sand S', 'sand SE', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], ['collision', 'water C'], 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C'],
		['water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C', 'water C']
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
		ISE: {x: 64, y: 32},
		AA: { x: 0, y: 0},
		BA: { x: 32, y: 0 },
		CA: { x: 64, y: 0 },
		AB: { x: 0, y: 32 },
		BB: { x: 32, y: 32 },
		CB: { x: 64, y: 32 },
		AC: { x: 0, y: 64 },
		BC: { x: 32, y: 64 },
		CC: { x: 64, y: 64 },
		AD: { x: 0, y: 96 },
		BD: { x: 32, y: 96 },
		CD: { x: 64, y: 96 },
		AE: { x: 0, y: 128 },
		BE: { x: 32, y: 128 },
		CE: { x: 64, y: 128 },
		AF: { x: 0, y: 160 },
		BF: { x: 32, y: 160 },
		CF: { x: 64, y: 160 },
		AG: { x: 0, y: 192 },
		BG: { x: 32, y: 192 },
		CG: { x: 64, y: 192 },
		AH: { x: 0, y: 224 },
		BH: { x: 32, y: 224 },
		CH: { x: 64, y: 224 },
		AI: { x: 0, y: 256 },
		BI: { x: 32, y: 256 },
		CI: { x: 64, y: 256 },
		AJ: { x: 0, y: 288 },
		BJ: { x: 32, y: 288 },
		CJ: { x: 64, y: 288 },
		AK: { x: 0, y: 320 },
		BK: { x: 32, y: 320 },
		CK: { x: 64, y: 320 }
	};

	var terrain = loadImages('grass', 'reeds', 'sand', 'wheat', 'cement', 'dirt', 'dirt2', 'grassalt', 'hole', 'lava', 'lavarock', 'water', 'waterandgrass');

	function parseWorld(worldspec){
	    world = [];
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
	window.parseWorld = parseWorld;

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
     var tile_offset = spec.split(' '),
         tile = terrain[tile_offset[0].toLowerCase()],
         offset = offsets[tile_offset[1]];
     return {
         g:tile,
         sx:offset.x,
         sy:offset.y,
         w:32,
         h:32,
         x: (tx - worldorigin[0]) * 32,
         y: (ty - worldorigin[1]) * 32
     };
    }
    
    function drawworld(){
        for(var i = 0; i < world.length; i++){
            for(var e = 0; e < world[i].length; e++){
                for (var t = 0; t < world[i][e].length; t++){
                    var tile = world[i][e][t];
                    ctx.drawImage(tile.g, tile.sx, tile.sy, tile.w, tile.h, tile.x + WIDTH/2 - characterInfo.x, tile.y + HEIGHT/2 - characterInfo.y, 32, 32);
                }
            }
        }
    }
    
    parseWorld(worldspec);
    return {
        world: world, 
        draw: drawworld,
        findCharTile: findCharTile
    };
}