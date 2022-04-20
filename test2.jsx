
//@include "src/xto.jsx"
xto.load("AFFX/ShapeLayer");
xto.load("AFFX/CompItem");
xto.load("AFFX/Layer");
xto.load("AFFX/LayerCollection")
xto.load("AFFX/PropertyGroup");
xto.load("PRIM/Object");
xto.load("$$$$/Debg");

// $.writeln(layr.numProp("Shape"));

// // layr.add("Contents:group", {name: "plot"})
// function plot(c, func, step)
// {
//   {
//     optimized = false;
//     xbasis = 100;
//     ybasis = 100;
//     start = -10;
//     end = 10;
//     step = step;
//     step = optimized?80:step;
//   }

//   var L = c.layers.$add("shape", {name: func, path: true}),
//       S = {V:[], I:[], O:[]}, P,
//       F = new Function("x","return {0};".re(func));

//   var len = Math.floor((((end-start)*xbasis)/step)+2),
//       k  = (100/step) * 3,
//       h  = 0.0000000001,
//       ax = 10000;

//   var x,y,xh,fh,f,y0, i=-1;
//   while(++i<len)
//   {
//     P = {
//       x: ((step * i) + start * xbasis),
//       y: (-ybasis) * Math.round(ax*F(((step * i) + start* xbasis)/xbasis))/ax
//     }

//     $.writeln("xy({2}): ({0},{1})".re(P.x,P.y,i));
//     if(!optimized) S.V.push([P.x,P.y]); continue;
    
//     xh = P.x + h * xbasis;
//     fh = (ybasis/k) * F((P.x/xbasis)+h);
//     f =  (ybasis/k) * F((P.x/xbasis));
//     y0 = 100*(fh-f)/(xh-P.x);

//     S.V.push([P.x,P.y]);
//     S.I.push([-100/k,y0]);
//     S.O.push([100/k,-y0]);
//   }

//   L.get("path").path.setValue(new Shape().xt({
//     vertices: S.v, inTangents: S.I, outTangents: S.O,
//     closed: false
//   }));
//   return L;
// }

// // var lc = comp.layers;
// plot(comp, "x*x", 100);
// // var shapeLayer = comp.layers.$add("shape", {name: "yoyo", path: "plot"});
// // $.writeln(shapeLayer)