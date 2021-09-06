

// function testexpr(){
//     p = thisComp.layer("Shape Layer 1").content("Ellipse 1").transform.position;
//     src = thisComp.layer("Shape Layer 1").sourceRectAtTime(0, false);
//     toWorld([p[0]-src.width/3.6, p[1]+src.height/2.6])
// }

// comp = app.project.activeItem;

// src = comp.layer(1).sourceRectAtTime(comp.time,false);

// layer = comp.layer(1);

// contents = layer.property("Contents");

// x0 = contents.property(1).property("Transform").property("Position").value[0];

// p = layer.transform.position.value;

// globalP = p.toWorld();

// fp = p[1] - src.top;



// $.writeln(src.toSource())

// $.writeln(x0)

// $.writeln(p)

arr = [1,2,3,4,4,5,4,6,4,66];
i = 0;
total = 0;
idx = 0;

for(;++i<arr.length;) if(arr[i] == 4) (idx = i, total++)
$.writeln(total)
$.writeln(idx)
$.writeln(i)