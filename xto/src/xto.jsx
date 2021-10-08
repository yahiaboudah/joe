/*******************************************************************************
		Name:           xto
		Desc:           A mini-framework for Extendscript in after effects.
        API :           ---
		Created:        2110 (YYMM)
		Modified:       2110 (YYMM)
*******************************************************************************/
/******************************************************************************/

(function xto()
{

    CSTR = 
    [
        "Table",
        "Path"
    ]

    EXTN = 
    {
        "$":
        [
            "$sleep"
        ],

        "$.global":
        [
            "-MATCH_NAMES",
            "-AECMD",
            "-ClipBoard",
            "-PYJSX",
            "-logger",
            "strr"
        ],
        
        "Function.prototype":
        [
            "body",
            "bind",
            "timeme"
        ],

        "Object":
        [
            "keys", "newKeys", "extend", "size",
            "dcKeys", "validate", "validateKeys",
            "modify", "getValue",
            "print", "write", 
            "typeof",
            "create",
            "getPrototypeOf", 
            "newObject", "fromEntries",
            "has", "inspect"
        ],

        "Array":
        [
            "range",
            "oneDimIndexFunc", "twoDimIndexFunc"
        ],

        "Array.prototype":
        [
            ["forEach", "forEvery"],
            ["indexOf", "remove", "includes"], 
            "rotate", 
            ["reduce", "map"], 
            ["fliter", "select"],

            ["max", "min", "sortedIndices", "math2D", "sum"],

            ["upIndex", "bottomIndex", "leftIndex", "rightIndex",
            "upperLeftIndex", "upperRightIndex", "bottomRightIndex", "bottomLeftIndex"],

            ["+", "-", "*", "/", "^"]
        ],

        "String.prototype":
        [
            ["inspectFF", "checkFF"],
            ["startsWith", "padding"],
            ["replaceSeq", "f", "fstr", "_replace"],
            ["title", "trim", "pushAt"],
            "*"
        ],

        "Math": 
        [
            "sum",
            "mult"
        ],

        "File.prototype":
        [
            "-isOpen"
            ["$open", "$write", "$read", "$close", "$clear"],
            ["$seek", "$create"],
            "$execute",
            "$lines",
            
            ["$listenForChange", "$listenForChar", "$listen"],

            ["getDuration", "getName", "getExtension", "getType"]
        ],

        "Folder.prototype":
        [
            ["$clearFolder", "$remove"],
            ["getFolders", "$getFiles"]
        ],

        "CompItem.prototype": 
        [
            ["setResolution", "getResolution"],
            ["getLayersWith", "numLayersWithName"],
            "snap",
            "sel",
            "setTime"
        ],

        "ItemCollection.prototype":
        [
            ["toArray", "grab"],
        ],

        "LayerCollection.prototype":
        [
            ["toArray", "grab"],
        ],

        "AVLayer.prototype":
        [
            ["addProp", "getProp", "removeProp"]
        ],

        "ShapeLayer.prototype":
        [
            ["addProp", "getProp", "removeProp"],
            "alpha",
            ["area", "areas"],
            "distances",
            "moveFirstVertex",
            "grabProps"
        ],

        "PropertyGroup.prototype":
        [
            ["is", "isnt"],
            "containingComp",
            "properties",
            ["moveFirstVertex", "mFirstIndex"],
            "$nearestKeyIndex"
        ],

        "Table":
        [
            "-fNamePatt",
            "process", 
            "removeAll"
        ],

        "Table.prototype":
        [
            "toString",
            "getMaxRowSizes", "maxColumnSizes",
            "format", "render",
            "write", "show"
        ],

        "ClipBoard":
        [
            ["get", "set", "clear"],
            "unload"
        ],

    }
})();