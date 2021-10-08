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
    EXTN = 
    {
        "$":
        [
            "$sleep"
        ],

        "$.global":
        [
            "strr"
        ],
        
        "Function.prototype":
        [
            "body",
            "bind",
            "time"
        ],

        "String.prototype":
        [
            "inspectFF", 
            "startsWith", "padding", ""
        ],

        "Math": 
        [
            "sum",
            "mult"
        ],

        "File.prototype":
        [
            "$open", "$write", "$read", "$close", "$clear",
            "$seek", "$create",
            "$execute",
            "$lines",
            
            "$listenForChange", "$listenForChar", "$listen",

            "getDuration", "getName", "getExtension", "getType"
        ],

        "Folder.prototype":
        [
            "$clearFolder", "$remove",
            "getFolders", "$getFiles"
        ],

        "CompItem.prototype": 
        [
            "setResolution", "getResolution",
            "getLayersWith", "numLayersWithName",
            "snap",
            "sel",
            "setTime"
        ],

        "ItemCollection.prototype":
        [
            "toArray", "grab"
        ],

        "LayerCollection.prototype":
        [
            "toArray", "grab"
        ],

        "ShapeLayer.prototype":
        [
            "addProp", "getProp", "removeProp",
            "alpha",
            "area", "areas",
            "distances",
            "moveFirstVertex",
            "grabProps"
        ],

        "PropertyGroup.prototype":
        [
            "is", "isnt",
            "containingComp",
            "properties",
            "moveFirstVertex", "mFirstIndex",
            "$nearestKeyIndex"
        ],

        ""

    }
})();