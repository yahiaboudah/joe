

var comp = app.project.activeItem;

var layer = comp.layers.addSolid([0,0,0], "kaze", 1920, 1080, (16/9), comp.duration);
var nulll = comp.layers.addNull(comp.duration);

var biggest = Math.max(layer.reflect.properties.length, nulll.reflect.properties.length) 

for(var i=0; i < biggest; i++)
{
    $.writeln([
        layer.reflect.properties[i] || "nono",
        nulll.reflect.properties[i] || "nono"
    ].join("  :  "))
}

// $.writeln(layer.reflect.properties.join("\n"));

// $.writeln(comp.layer(1).constructor.name)
// $.writeln(comp.layer(1).nullLayer)

// comp.layers.$add();