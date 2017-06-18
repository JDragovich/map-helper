# Map Helper
A Library for adding array-like functionality to Javascript Maps.

I love Javascript Maps, but they need some additional functionality to make them more useful. This library is an attempt to provide that functionality.

## Install
install via npm

```
npm install --save map-helper
```

then in your application

```javascript
import * as mapHelper from 'map-helper';
```

## Methods

### mapMap
takes and a Map and provides a new Map after applying a callback.

**mapHelper.mapMap(map,callback)**

#### Arguments

map (Map)

callback (function) [Key, value, index]

#### Returns
(Map)

#### Example

```javascript
let foo = new Map([
    ["stuff",0],
    ["junk",1],
    ["gubbins",2]
]);

let bar = mapHelper.mapMap(foo, (key,value, index) => [key , value + 1]);

// result: Map(3) {"stuff" => 1, "junk" => 2, "gubbins" => 3}
```

### reduceMap
Reduces a map based on a callback and an initial value.

**mapHelper.mapMap(map,callback,inital)**

#### Arguments

map (Map)

callback (function) [Key, value, index]

initial (any)

#### Returns
(any)

#### Example

```javascript
let foo = new Map([
    ["stuff",0],
    ["junk",1],
    ["gubbins",2]
]);

let baz = mapHelper.reduceMap(foo, (current, key, value, index) => current + value , 0);

// result: 3
```

### mergeMap
Merges an array of maps, aggregating key collisions as default behavior. Accepts an optional callback to handle collisions

**mapHelper.mergeMap(maps,callback)**

#### Arguments

maps (Array<Map>)

callback (function) [Key, oldValue, newValue, numberOfCollisions]

#### Returns
(Map)

#### Example

```javascript
let foo = new Map([
    ["junk",1],
    ["gubbins",2]
]);

let anotherMap = new Map([
    ["mary", 1],
    ["gubbins", 4]
]);

let baz = mapHelper.reduceMap(foo, (current, key, value, index) => current + value , 0);

// result: Map(3) {"junk" => 1, "gubbins" => (2) [2, 4], "mary" => 1}

let mergedWithCallback = mapHelper.mergeMaps([foo, anotherMap], (key, oldVal, newVal, collisions) =>{
    return oldVal + newVal;
});

//result: Map(3) {"junk" => 1, "gubbins" => 6, "mary" => 1}
```

### invertMap
Inverts the keys and values of a map, aggregating values with key collisions as default behaviour. accepts an options callback to handle key collisions.

**mapHelper.invertMap(map,callback)**

#### Arguments

map (Map)

callback (function) [Key, oldValue, newValue, numberOfCollisions]

#### Returns
(Map)

#### Example

```javascript
let anotherMap = new Map([
    ["peter", 0],
    ["paul", 1],
    ["mary", 1],
    ["gubbins", 4]
]);

let invertedMap = mapHelper.invertMap(anotherMap);

// result: Map(3) {0 => "peter", 1 => (2) ["paul", "mary"], 4 => "gubbins"}
```

### mapFromObject
converts a plain object to a map, using only own properties.

**mapHelper.mapFromObject(object)**

#### Arguments

object (Object)

#### Returns
(Map)

#### Example

```javascript
let objectToConvert = {
    key1:"foo",
    key2:"bar",
    key3:"baz"
}

let convertedObject = mapHelper.mapFromObject(objectToConvert);

// result: Map(3) {"key1" => "foo", "key2" => "bar", "key3" => "baz"}
```
