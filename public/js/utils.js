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
