/**
 * returns new map where callback ahs been applied to all entries
 */
function mapMap(map,callback){
    let newMapStart = [];
    let count = 0;

    for(entry of map.entries()){
        newMapStart.push(callback(...entry,count));
    }

    return new Map(newMapStart);
}

/**
 * returns a value after callback has been applied to all entries based on an intial value
 */
function reduceMap(map,callback,initial){
    let current = initial;
    let count = 0;

    for(entry of map.entries()){
        current = callback(inital,...entry,count);
    }

    return current;
}

export {mapMap, reduceMap};
