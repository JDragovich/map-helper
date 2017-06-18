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


/**
 * default callback for handling key collisions during map operations
 */
function handleCollisions(key, oldValue, newValue, numCollisions){
    if(numCollisions > 1){
        oldValue.push(newValue);
        return oldValue
    }
    else{
        return [oldValue, newValue]
    }

}

/**
 * merges an array of maps, aggregating keys that cause collisions into an array
 * also accepts a custom callback to handle collisions
 */
function mergeMaps(maps, callback){
    let finalMap = new Map();

    // we need to keep track of collisions separately
    let collisionRef = new Map();

    // if there is no callback use the default behaviour
    if(typeof callback !== 'function'){
        callback = handleCollisions;
    }

    function addMapToFinal(map){
        for (let entry of map.entries()){

            if(finalMap.has(entry[0])){
                let newValue = callback(entry[0], finalMap.get(entry[0]), entry[1], collisionRef.get(entry[0]));

                finalMap.set(entry[0], newValue);
                collisionRef.set(entry[0], collisionRef.get(entry[0]) + 1);
            }
            else{
                finalMap.set(entry[0], entry[1]);
                collisionRef.set(entry[0], 1);
            }
        }
    }
    for (let map of maps){
        addMapToFinal(map);
    }

    return finalMap
}

/**
 * inverts the keys and values in a map, aggregating keys that cause collisions into an array
 */
function invertMap(map, callback){
    let finalMap = new Map();

    // we need to keep track of collisions separately
    let collisionRef = new Map();

    // if there is no callback use the default behaviour
    if(typeof callback !== 'function'){
        callback = handleCollisions;
    }

    for (let entry of map.entries()){

        if(finalMap.has(entry[1])){
            let newValue = callback(entry[1], finalMap.get(entry[1]), entry[0], collisionRef.get(entry[1]));

            finalMap.set(entry[1], newValue);
            collisionRef.set(entry[1], collisionRef.get(entry[1]) + 1);
        }
        else{
            finalMap.set(entry[1], entry[0]);
            collisionRef.set(entry[1], 1);
        }
    }

    return finalMap
}

/**
 * create a map from an object. Using only own properties
 * note that this is only a shallow conversion. any child obectes will nto be converted to a map.
 */
function mapFromObject(object){
    let newMap = [];

    for(let key in object){
        if(object.hasOwnProperty(key)){
            newMap.push([key, object[key]]);
        }
    }

    return new Map(newMap);
}



export { mapMap, reduceMap, mergeMaps, invertMap, mapFromObject };
