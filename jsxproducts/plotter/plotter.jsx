
//@include "utils.jsx"
//@include "plotter-ui.js"

w = PlotterScript.getWindow();

// (function(h, s){
  
//   var plot = function plot(
//     /*CompItem*/c/*=app.project.activeItem*/
//     ,/*str*/func/*="x"*/
//     ,/*bool*/optimized/*=true*/
//     ,/*float*/xbasis/*=100*/
//     ,/*float*/ybasis/*=100*/
//     ,/*float*/start/*=-10*/
//     ,/*float*/end/*=10*/
//     ,/*int*/step/*20*/
//     ,/*float*/strokeWidth/*10*/
//     ,/*arr*/colorValue/*white*/
//   )
//   {
  
//     step = optimized?80:step;
    
//     var shapeLayer = c.layers.addShape(),
//         path = shapeLayer.content.addProperty(MATCH_NAMES.PATH);
  
//     var ln = Math.floor((((end-start)*xbasis)/step)+2),
//         k  = (100/step) * 3,
//         h  = 0.0000000001,
//         ax = 10000;
  
//     var vertices    = [],
  
//         inTangents  = [],
//         outTangents = [],
//         efunc       = new Function("x","return " + func + ";");
  
  
//     var x,y,xh,fh,f,y0;
  
  
//     vertMaker: for(var i =-1;++i<ln;)
//     {
//       x = ((step * i) + start * xbasis);
//       y = (-ybasis) * Math.round(ax*efunc(((step * i) + start* xbasis)/xbasis))/ax;
      
//       if(!optimized) vertices.push([x,y]); continue vertMaker;
      
//       xh = x + h * xbasis;
//       fh = (ybasis/k) * efunc((x/xbasis)+h);
//       f =  (ybasis/k) * efunc((x/xbasis));
//       y0 = 100*(fh-f)/(xh-x);
  
//       vertices.push([x,y])
//       inTangents.push([-100/k,y0]);
//       outTangents.push([100/k,-y0]);
//   }
  
//     path.path.setValue(new $Shape({
    
//       vertices   : vertices,
//       inTangents : inTangents,
//       outTangents: outTangents,
//       closed: false
    
//     }).shape());
    
//     shapeLayer.addStroke(strokeWidth);
//     shapeLayer.name = func;
  
//     return shapeLayer;
//   }

//   h[s] = plot;

// })(w, "Plotter");

w.show();