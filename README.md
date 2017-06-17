# Map Helper
A Library for adding array-like functionality to Javascript Maps.

I love Javascript Maps, but they need some additional functionality to make them more useful. This library is an attempt to provide that functionality.

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

this.baz = mapHelper.reduceMap(this.foo, (current, key, value, index) => current + value , 0);

// result: 3
```
