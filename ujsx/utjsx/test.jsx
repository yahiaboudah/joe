

comp = app.project.activeItem;

src = comp.layer(1).sourceRectAtTime(comp.time,false);

layer = comp.layer(1).property("Contents");

refer = comp.layer(2).property("Transform").property("Position");

p = layer.property(1).property("Transform").property("Position").value;

// globalP = p.toWorld();

// fp = p[1] - src.top;

$.writeln(p)
