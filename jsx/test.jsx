
var cc = app.project.activeItem;

for(var  i=1; i<= cc.numLayers; i++)
{
    var layer = cc.layer(i)
    $.write(layer.name + ": ")
    $.writeln(layer.constructor.name);
}