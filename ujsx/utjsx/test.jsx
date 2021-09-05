

function testexpr(){
    p = thisComp.layer("Shape Layer 1").content("Ellipse 1").transform.position;
    src = thisComp.layer("Shape Layer 1").sourceRectAtTime(0, false);
    toWorld([p[0]-src.width/3.6, p[1]+src.height/2.6])
}

src = comp.layer(1).sourceRectAtTime(comp.time,false);

layer = comp.layer(1).property("Contents");

refer = comp.layer(2).property("Transform").property("Position");

p = layer.property(1).property("Transform").property("Position").value;

// globalP = p.toWorld();

// fp = p[1] - src.top;

$.writeln(p)
