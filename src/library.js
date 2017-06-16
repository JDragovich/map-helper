/**
 * returns new map where callback ahs been applied to all entries
 */
function mapMap(map,callback){
    let newMapStart = [];
    let count = 0;

    for(let entry of map.entries()){
        newMapStart.push(callback(...entry,count));

        count++;
    }

    return new Map(newMapStart);
}

/**
 * returns a value after callback has been applied to all entries based on an intial value
 */
function reduceMap(map,callback,initial){
    let current = initial;
    let count = 0;

    for(let entry of map.entries()){
        current = callback(current,...entry,count);

        count++;
    }

    return current;
}

export {mapMap, reduceMap};
