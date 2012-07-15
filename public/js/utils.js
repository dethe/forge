function partition(array){
    // split a long array into an arrary of arrays, where where slices are of length size
    var partitioned = [];
    var size = Math.sqrt(array.length);
    for (var i = 0; i < size; i++){
        partitioned.push(array.slice(i*size, i*size + size));
    }
    return partitioned;
}

// opposite of partition
function flatten(arrayofarrays){
    var ret = [];
    arrayofarrays.forEach(function(arr){ ret = ret.concat(arr); }) // inefficient, but works
    return ret;
}

// Take any number of arrays as arguments, return a new array of arrays where
// the inner arrays are all the items from the original arrays at that index
// so zip([1,2,3],['a','b','c']['i','ii','iii']) would return 
// [[1,'a','i'],[2,'b','ii'],[3,'c','iii']]
function zip(){
    var args;
    if (arguments.length === 1){
        args = arguments[0]; // we passed in an array of arrays
    }else{
        args = Array.prototype.slice.call(arguments); // we passed individual arrays
    }
    var ret = [];
    for (var i = 0; i < args[0].length; i++){
        ret.push(args.map(function(arr){ return arr[i]; })) ;
    }
    return ret;
}

function initAsRect(x,y,w,h){
    // x,y are the centre point
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.left = x - w/2;
    this.right = this.left + w;
    this.top = y - h/2;
    this.bottom = this.top + h;
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
