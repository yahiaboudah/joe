
(function UTILS(){

    (function(){
        $.global._Shape = function _Shape(cfg)
        {
            var shape = new Shape();
            shape.vertices = cfg.vertices || [[0,0]];
            shape.inTangents = cfg.inTangents || [[0,0]];
            shape.outTangents = cfg.outTangents || [[0,0]];
            shape.closed   = (typeof cfg.closed == "undefined")? false: cfg.closed;
    
            return shape;
        }
    })();

    (function(){
        
        CompItem.prototype._addShape = function(cfg)
        {
            var slayer = this.layers.addShape();
            slayer.name = cfg.name || "Shape Layer";
            slayer.guideLayer = (typeof cfg.guideLayer == "undefined")? true: cfg.guideLayer;
    
            return slayer;
        }
    })();

})();


var MyShapeCreator = (function(){

    return {

        createShapes: function(num)
        {
            var shapes = [];
            while(num--) shapes.push(_Shape({vertices: [[100,100] * num, [500, 500] * num]}));
            return shapes;
        },

        createPaths: function(layer, paths)
        { 
            var shapeGroup, shapeGroups = [];

            var mainGroup = layer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
            mainGroup.name = "Shapes Group";
        
            var shapeInfo = {
                main: mainGroup,
                names: []
            }

            for(var i = 0; i < paths.length; i++)
            {
                // make a shape group inside the main group:
                shapeGroup = mainGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Group");
                shapeGroup.name = "Shape " + (i + 1);
                
                // add the path property, and set it:
                shapeGroup
                .property("ADBE Vectors Group")
                .addProperty("ADBE Vector Shape - Group")
                .property("ADBE Vector Shape")
                .setValue(paths[i]);
        
                // push the anchorPoint property:
                shapeInfo.names.push(shapeGroup.name);
            }

            return shapeInfo;
        },

        getProp: function(propName, info){

            var mainG = info.main, curr, myProps = [];

            for(var i=0; i< info.names.length; i++)
            {
                curr = mainG.property("Contents").property(info.names[i]);
                myProps.push(curr.property("Transform").property(propName))
            }

            return myProps;
        }
    }

})();


var numShapes = 50;

var shInfo = MyShapeCreator.createPaths(
    
    app.project.activeItem._addShape({name: "Shape Layer"}),
    MyShapeCreator.createShapes(numShapes)
)

var myProps = MyShapeCreator.getProp("Anchor Point", shInfo); 

try
{
    $.writeln([
    
        "Length of all anchPoint props: --> " + myProps.length,
        "All anchor point properties: ---> ",
        myProps,
    
    ].join("\n"))
}
catch(e)
{
    $.writeln("ERROR--> " + e.toString());
}