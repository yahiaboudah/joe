
LayerCollection.prototype.$add = function(what, cfg)
{
    switch (what) {
        case "ShapeLayer":
            
            break;
    
        default:
            break;
    }
}



var comp = app.project.activeItem;

$.writeln(app.project.item(2).constructor.name);

$.writeln(comp.layer(1).source.constructor.name)
$.writeln(comp.layer(1).nullLayer)

// comp.layers.$add();