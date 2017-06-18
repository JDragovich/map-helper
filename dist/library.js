'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * returns new map where callback ahs been applied to all entries
 */
function mapMap(map, callback) {
    var newMapStart = [];
    var count = 0;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = map.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var entry = _step.value;

            newMapStart.push(callback.apply(undefined, _toConsumableArray(entry).concat([count])));

            count++;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return new Map(newMapStart);
}

/**
 * returns a value after callback has been applied to all entries based on an intial value
 */
function reduceMap(map, callback, initial) {
    var current = initial;
    var count = 0;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = map.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var entry = _step2.value;

            current = callback.apply(undefined, [current].concat(_toConsumableArray(entry), [count]));

            count++;
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return current;
}

/**
 * default callback for handling key collisions during map operations
 */
function handleCollisions(key, oldValue, newValue, numCollisions) {
    if (numCollisions > 1) {
        oldValue.push(newValue);
        return oldValue;
    } else {
        return [oldValue, newValue];
    }
}

/**
 * merges an array of maps, aggregating keys that cause collisions into an array
 * also accepts a custom callback to handle collisions
 */
function mergeMaps(maps, callback) {
    var finalMap = new Map();

    // we need to keep track of collisions separately
    var collisionRef = new Map();

    // if there is no callback use the default behaviour
    if (typeof callback !== 'function') {
        callback = handleCollisions;
    }

    function addMapToFinal(map) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = map.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var entry = _step3.value;


                if (finalMap.has(entry[0])) {
                    var newValue = callback(entry[0], finalMap.get(entry[0]), entry[1], collisionRef.get(entry[0]));

                    finalMap.set(entry[0], newValue);
                    collisionRef.set(entry[0], collisionRef.get(entry[0]) + 1);
                } else {
                    finalMap.set(entry[0], entry[1]);
                    collisionRef.set(entry[0], 1);
                }
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    }
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = maps[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var map = _step4.value;

            addMapToFinal(map);
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    return finalMap;
}

/**
 * inverts the keys and values in a map, aggregating keys that cause collisions into an array
 */
function invertMap(map, callback) {
    var finalMap = new Map();

    // we need to keep track of collisions separately
    var collisionRef = new Map();

    // if there is no callback use the default behaviour
    if (typeof callback !== 'function') {
        callback = handleCollisions;
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
        for (var _iterator5 = map.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var entry = _step5.value;


            if (finalMap.has(entry[1])) {
                var newValue = callback(entry[1], finalMap.get(entry[1]), entry[0], collisionRef.get(entry[1]));

                finalMap.set(entry[1], newValue);
                collisionRef.set(entry[1], collisionRef.get(entry[1]) + 1);
            } else {
                finalMap.set(entry[1], entry[0]);
                collisionRef.set(entry[1], 1);
            }
        }
    } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
            }
        } finally {
            if (_didIteratorError5) {
                throw _iteratorError5;
            }
        }
    }

    return finalMap;
}

/**
 * create a map from an object. Using only own properties
 * note that this is only a shallow conversion. any child obectes will nto be converted to a map.
 */
function mapFromObject(object) {
    var newMap = [];

    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            newMap.push([key, object[key]]);
        }
    }

    return new Map(newMap);
}

exports.mapMap = mapMap;
exports.reduceMap = reduceMap;
exports.mergeMaps = mergeMaps;
exports.invertMap = invertMap;
exports.mapFromObject = mapFromObject;
//# sourceMappingURL=library.js.map
