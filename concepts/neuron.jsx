function Neuron(ellipSize,name)
{

  this.size = ellipSize;
  var precompDimension = ellipSize+5;
  var comp = app.project.activeItem;
  var name = "neuron 1";

  //===========================================
  //============= NEURON ======================

  var neuron = comp.layers.add("shape", {
      name: name
  }, {
      
      stroke: {
          color: [1,1,1,1],
          width: 3
      }
      
      fill: {
          color: [1,1,1,1],
          opacity: new Expression(function(){
              comp($compName).layer($layerName).effect("NeuronControl")("Activation")
          }, {$compName: comp.name, $layerName: name})
      }
  });
  neuron.prop("pos").setValue([precompDimension/2,precompDimension/2]);
  neuron.add("ellipse", {value: {size: [ellipSize, ellipSize]}}).moveTo(0);
  //-----------------------------------------------
  
  //===============================================
  //================ TEXT =========================
  var txt = comp.layers.add("text", {

      name : name
      source: new Expression(function(){
            var N= thisComp.layer("$name").effect("NeuronControl"),
                k= N("Threshold").value * N("Activation").value; 
            
            k.toFixed(k>100?0:k>10?1:2)
      }),

      config: {
            fontSize: (75/200)*ellipSize,
            fillColor: [1,1,1],
            font: "LMRoman10-Regular",
            strokeOverFill: true,
            applyStroke: false,
            applyFill: true
      }
  }, {

      animators: [
          {
              name: "colorAnimator",
              props: {
                  fillColor: new Expression(function(){
                            var k =  Math.floor(thisComp.layer("$name").effect("NeuronControl")("Activation"));
                            (k<0.5)? [1,1,1,1]: [1,1,1,255]/255;
                    }) 
            }
          }
      ]
  });
  
  txt.centerAnchorPoint();
  txt.prop("pos").set(new Expression(function(){
      var k = thisComp.layer("$name").effect("NeuronControl")("Activation").value;
      (k == 1)? [112.5, 99.5]: [101.5, 99.5]
  }))
  //-------------------------------------------------------
  
  //====================================================
  //================== PRECOMP =========================
  var PR = comp.layers.precomp({
      indices: [1,2],
      name: name,
      moveAllAttributes: true,
      width: precompDimension,
      height: precompDimension
  })

  PR.collapseTransformation = PR.shy = true;
  PR.add("Effect:NeuronControl");
  //----------------------------------------------------

  return PR;
}