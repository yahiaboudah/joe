

function getPos(){
    
    var comp = app.project.activeItem;

    var posit = [];
    posit.push(comp.layer("Shape Layer").property("Contents").property("Shapes Group").property("Contents").property("Shape 1").property("Transform").property("Anchor Point"))
    posit.push(comp.layer("Shape Layer").property("Contents").property("Shapes Group").property("Contents").property("Shape 2").property("Transform").property("Anchor Point"))

    return posit;
}

poss = getPos();

$.writeln(poss[0]);