
//@include "xto/src/xto.jsx"

function replaceAll(x, R)
{    
    var S = x;
    for(x in R) if(x.in(R)) S = S.split(x).join(R[x])

    return S;
}

// var shapeLayer = app.project.activeItem.layer(1);

// ShapeLayer.prototype.$get = function(v)
// {
//     return "{0} is set".re(v);
// }

// var G = shapeLayer.$get("jabze");

// ShapeBank.shape("circle", {radius: 5});

// $.writeln(G)

// loop and replace