
//@include "$array.jsx"

ShapeLayer.prototype.explode = function()
{
    var allProps = [];
    for(var i =1; i<this.content.numProperties+1; i++)
    {
        myProp = this.content.property(i);
        allProps.push(myProp)
    }

    allProps.forEach(function(prop){

    })

    return 0;
}

try
{    
    var layer = app.project.activeItem.layer(1);
    var ss = layer.explode();
}
catch(e)
{
    $.writeln(e);
}