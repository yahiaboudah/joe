(function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
        if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
            throw new TypeError('Object.keys called on non-object');
        }

        var result = [], prop, i;

        for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
            }
        }

        if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                    result.push(dontEnums[i]);
                }
            }
        }
        return result;
    };
}())


function basicPropsAndMethods(oo)
{
    var pp = oo.reflect.properties, ppo = {}, propEmoji = "🅿️";
    var ff = oo.reflect.methods, ffo = {}, methEmoji = "Ⓜ️";

    for(var i=-1; ++i<pp.length;) ppo[pp[i]] = oo[pp[i]];
    for(var i=-1; ++i<ff.length;) ffo[ff[i]] = oo[ff[i]].apply(oo, []);

    return info = 
    {
        props: ppo,
        meths: ffo
    }
}