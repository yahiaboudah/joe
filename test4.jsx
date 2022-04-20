#include "big-ol-pile-of-functions.jsx";
#target aftereffects
#targetengine weightsLocked

weightsLocked = false;
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

function maskExpression(n){

  return new Expression(function(){
    
      var L = thisComp.layer($name);
      var R  = (L.sourceRectAtTime(time, true).width/2) * L.transform.scale[0]/100;
      var S = R/1.81066; //stretch

      var x = L.position[0]-1060,
          y = L.position[1]-640;

      createPath(
        points = [[x-R,y],[x,y+R],[x+R,y],[x,y-R]],
        inTangents = [[0,-S],[-S,0],[0,S],[S,0]],
        outTangents =  [[0,S],[S,0],[0,-S],[-S,0]], 
        is_closed = true)
      )
  }, {$name: n.name})
}

function Connec(n,m)
{
  var k = new DynamicLine([m,0],[m,1],[n,0],[n,1]);
  k.centerAnchorPoint();
  k.shy = true;

  var mm = k.masks([
    {
      path: maskExpression(n),
      mode: '-',
    },
    {
      path: maskExpression(m),
      mode: '-'
    }
  ])

  mm[0].locked = mm[1].locked = true;
  return k;
  
  // // Adding masks
  // var m1 = k.Masks.addProperty("Mask"),
  //     m2 = k.Masks.addProperty("Mask");

  // m1.maskMode = MaskMode.SUBTRACT;
  // m1.property("Mask Path").expression = maskExpression(n);
  // m2.maskMode = MaskMode.SUBTRACT;
  // m2.property("Mask Path").expression = maskExpression(m);
  
  // m1.locked = m2.locked = true;
}

function net(nn)
{
  
    var C = 
    {
      netArray: nn,
      depth: C.netArray.length,
      maxHeight: Math.max.apply(undefined, C.netArray),

      neuronSize: 200,
      hGap: 200,
      vGap: 100,
    }

    var A = [];
    var i, j, k; i = j = k = -1;
    while(++i<nn.length)
    {
      A[i] = [];
      while(++j<nn[i])
      {
        A[i][j] = new Neuron(C.neuronSize, "Neuron {0}{1}".re(i, j));
        if(!i) continue;

        while(++k<nn[i-1]) (new Connec(A[i][j], A[i-1][k])).name = "{0}{1}<->{2}{3}".re(i, j, i-1, k);
        k = -1;
      }
      j = -1;
    }
    i = j = k = -1;

    var x = 0.5 * (comp.width  - (C.neuronSize + C.hGap) * (C.depth    -1));
    var y = 0.5 * (comp.height - (C.neuronSize + C.vGap) * (C.maxHeight-1));
    var y0;

    while(++i<C.depth) while(++j<nn[i])
    {
      if(nn[i] == C.maxHeight)
      {
        A[i][j].transform.position.setValue(
          [x+i*(C.hGap + C.neuronSize),y+(C.vGap + C.neuronSize)*j]
        );
        continue;
      }

      y0 = y + (C.maxHeight - nn[i]) * (C.neuronSize + C.vGap)/2

      A[i][j].transform.position.setValue(
        [x+i*(C.hGap + C.neuronSize), y0+(C.vGap + C.neuronSize)*j]
      );
    }
}

//========================================================
//========================================================
//========================================================

function formCombosGivenCoord(coords){
  var combos = [];
  var reverseFire = false;
  var comp = app.project.activeItem;
  var netArray = comp.netArray;
  if(typeof netArray == 'undefined'){
    alert("Select a neural net comp");
  }
  var vcord0 = coords[0];
  var vcord1 = coords[1];
  var cord0 = coords[0].length;
  var cord1 = coords[1].length;
  if(cord0 == 2 && cord1 == 2){
    if(eval(vcord0[0]) > eval(vcord1[0])){
      reverseFire = true;
      combos[combos.length] = vcord0+vcord1;
    }else{
      reverseFire = false;
      combos[combos.length] = vcord1+vcord0;
    }
  }else if ((cord0 == 2 && cord1 == 1)||(cord0 == 1 && cord1 == 2)) {
    if(eval(vcord0[0]) > eval(vcord1[0])){
      reverseFire = true;
      if(cord0 == 2 && cord1 == 1){
        vcord1 = eval(vcord1);
        for(var i=0;i<netArray[vcord1];i++){
          combos[combos.length] = vcord0+""+vcord1+""+i;
        }
      }else{
        vcord0 = eval(vcord0);
        for(var i=0;i<netArray[vcord0];i++){
          combos[combos.length] = vcord0+""+i+""+vcord1;
        }
      }
    }else{ // forward
      reverseFire = false;
      if(cord0 == 2 && cord1 == 1){
        vcord1 = eval(vcord1);
        for(var i=0;i<netArray[vcord1];i++){
          combos[combos.length] = vcord1+""+i+""+vcord0;
        }
      }else{
        vcord0 = eval(vcord0);
        for(var i=0;i<netArray[vcord0];i++){
          combos[combos.length] = vcord1+""+vcord0+""+i;
        }
      }
    }
  }else if (cord0 == 1 && cord1 == 1) {
    vcord0 = eval(vcord0);
    vcord1 = eval(vcord1);
    if(vcord0 > vcord1){
      reverseFire = true;
      for(var i=0;i<netArray[vcord0];i++){
        for(var j=0;j<netArray[vcord1];j++){
          combos[combos.length] = vcord0+""+i+""+vcord1+""+j;
        }
      }
    }else{
      reverseFire = false;
      for(var i=0;i<netArray[vcord1];i++){
        for(var j=0;j<netArray[vcord0];j++){
          combos[combos.length] = vcord1+""+i+""+vcord0+""+j;
        }
      }
    }
  }
  return [combos,reverseFire];
}

//========================================================
//========================================================
//========================================================

function select(fireup,reversed,coord){
if(typeof reversed == 'undefined'){
  reversed = false;
}
var comp = app.project.activeItem;
var selectedLayers = comp.selectedLayers;
if(fireup){
if(typeof coord == 'undefined'){
  alert("please enter some coords");
}
var combos = coord;
}else{
var combos = formCombos(selectedLayers);
}
for(var i=0;i<selectedLayers.length;i++){
  selectedLayers[i].selected = false;
}
for(var i=1;i<comp.layers.length+1;i++){
  var comment = comp.layer(i).comment;
  if(reversed){
  var comboChecked = 0;
  if(comment.length == 4){
  for(var j=0;j<combos.length;j++){
    if(comment != combos[j]){
      comboChecked++;
    }
  }
}
if(comboChecked == combos.length){
  comp.layer(i).selected = true;
}
}else{
  if(comment.length == 4){
    for(var j=0;j<combos.length;j++){
      if(comment == combos[j]){
        comp.layer(i).selected = true;
      }
    }
  }
}
}
}

function formCombos(array){
  var combos = [];
  for(var i=0;i<array.length;i++){
    for(var j=i+1;j<array.length;j++){
      if(eval(array[i].comment[0]) == (eval(array[j].comment[0])+1)){
        combos[combos.length] = array[i].comment+array[j].comment;
      }
    }
  }
  return combos;
}

function fire(flashTime,firingColor,reverseCheckVar){
app.beginUndoGroup("Fire");
if(typeof flashTime == 'undefined'){
  flashTime = 1.201201201201;
}
var easeInOffset = new KeyframeEase(0, 75);
var easeOutOffset = new KeyframeEase(0, 75);
var easeInEnd1 = new KeyframeEase(0, 60);
var easeOutEnd1 = new KeyframeEase(0, 60);
var easeInEnd2 = new KeyframeEase(0.25, 13);
var easeOutEnd2 = new KeyframeEase(0.25, 13);
var easeInEnd3 = new KeyframeEase(0, 75);
var easeOutEnd3 = new KeyframeEase(0, 75);
var comp = app.project.activeItem;
var selectedLayers = comp.selectedLayers;
if(selectedLayers.length == 0){
  alert("Please select some weights");
}


for(var i=0;selectedLayers.length;i++){
var layer = selectedLayers[i];
if(layer.property("Contents").property(1).name != "Group 1"){
var contents = layer.property("Contents");
// Get expressions
var pathExpression = contents.property("Path 1").property("Path").expression;
var strokeExpression = contents.property("Stroke 1").property("Stroke Width").expression;
var group1 = contents.addProperty("ADBE Vector Group");
var vectors1 = group1.property("ADBE Vectors Group");
var path1 = vectors1.addProperty("ADBE Vector Shape - Group");
path1.property("Path").expression = pathExpression;
var trimPaths = vectors1.addProperty("ADBE Vector Filter - Trim");
var trimStart = trimPaths.property("ADBE Vector Trim Start");
// trimEnd
var trimEnd = trimPaths.property("ADBE Vector Trim End");
var numKeysEnd = trimEnd.numKeys;
//Create keyframes
trimEnd.setValueAtTime(comp.time,0);
trimEnd.setTemporalEaseAtKey(trimEnd.numKeys, [easeInEnd1], [easeOutEnd1]);
trimEnd.setValueAtTime(comp.time+flashTime/2,27);
trimEnd.setTemporalEaseAtKey(trimEnd.numKeys, [easeInEnd2], [easeOutEnd2]);
trimEnd.setValueAtTime(comp.time+flashTime,0);
trimEnd.setTemporalEaseAtKey(trimEnd.numKeys, [easeInEnd3], [easeOutEnd3]);
// Offset
var trimOffset = trimPaths.property("ADBE Vector Trim Offset");
trimOffset.setValueAtTime(comp.time,reverseCheckVar?170:0);
trimOffset.setTemporalEaseAtKey(trimOffset.numKeys, [easeInOffset], [easeOutOffset]);
trimOffset.setValueAtTime(comp.time+flashTime,reverseCheckVar?0:170);
trimOffset.setTemporalEaseAtKey(trimOffset.numKeys, [easeInOffset], [easeOutOffset]);
var stroke1 = vectors1.addProperty("ADBE Vector Graphic - Stroke");
var stroke1Width = stroke1.property("ADBE Vector Stroke Width");
stroke1Width.setValue(12);
stroke1.property("Color").setValueAtTime(comp.time,firingColor);
stroke1.property("Color").setValueAtTime(comp.time+flashTime,firingColor);
var group2 = contents.addProperty("ADBE Vector Group");
var vectors2 = group2.property("ADBE Vectors Group");
var path2 = vectors2.addProperty("ADBE Vector Shape - Group");
path2.property("Path").expression = pathExpression;
var stroke2 = vectors2.addProperty("ADBE Vector Graphic - Stroke");
var stroke2Width = stroke2.property("ADBE Vector Stroke Width");
stroke2Width.expression = strokeExpression;
contents.property(1).remove();
contents.property(1).remove();
}else{
  var strokeColor = layer.property("Contents").property("Group 1").property("Contents").property("Stroke 1").property("Color");
  strokeColor.setValueAtTime(comp.time,firingColor);
  strokeColor.setValueAtTime(comp.time+flashTime,firingColor);
  // trimEnd
  var trimEnd = layer.property("Contents").property("Group 1").property("Contents").property("Trim Paths 1").property("End");
  var numKeysEnd = trimEnd.numKeys;
  //Create keyframes
  trimEnd.setValueAtTime(comp.time,0);
  trimEnd.setTemporalEaseAtKey(trimEnd.numKeys, [easeInEnd1], [easeOutEnd1]);
  trimEnd.setValueAtTime(comp.time+flashTime/2,27);
  trimEnd.setTemporalEaseAtKey(trimEnd.numKeys, [easeInEnd2], [easeOutEnd2]);
  trimEnd.setValueAtTime(comp.time+flashTime,0);
  trimEnd.setTemporalEaseAtKey(trimEnd.numKeys, [easeInEnd3], [easeOutEnd3]);
  // Offset
  var trimOffset = layer.property("Contents").property("Group 1").property("Contents").property("Trim Paths 1").property("Offset");
  trimOffset.setValueAtTime(comp.time,reverseCheckVar?170:0);
  trimOffset.setTemporalEaseAtKey(trimOffset.numKeys, [easeInOffset], [easeOutOffset]);
  trimOffset.setValueAtTime(comp.time+flashTime,reverseCheckVar?0:170);
  trimOffset.setTemporalEaseAtKey(trimOffset.numKeys, [easeInOffset], [easeOutOffset]);
}
}
app.endUndoGroup();
}

function lockWeights(bool){
  var comp = app.project.activeItem;
  for(var i=1;i<comp.layers.length+1;i++){
    if(comp.layer(i).comment.length > 2){
      comp.layer(i).locked = bool;
    }
  }
}

function modifyNeurons(){
var comp = app.project.activeItem;
var animationTime = prompt("Enter the animation duration: ",0.5);
animationTime = eval(animationTime);
var num = prompt("Hidden layer/neuron:",1);
app.beginUndoGroup("Modify");
if(num.length == 2){
  var activation = prompt("Enter the value: ",99);
  activation = eval(activation);
  for(var i=0;i<comp.layers.length;i++){
    if(comp.layer(i+1).comment == num){
      var slider = comp.layer(i+1).property("Effects").property("Slider Control").property("Slider");
      var previousActivationIndex = slider.nearestKeyIndex(comp.time);
      var previousActivation = slider.keyValue(previousActivationIndex);
      slider.setValueAtTime(comp.time,previousActivation);
      slider.setValueAtTime(comp.time+animationTime,activation);
      break;
    }
  }
}else if(num.length == 1){
  var netArray = comp.netArray;
  var allActivations = [];
  num = eval(num);
  for(var i=0;i<netArray[num];i++){
    var p = prompt("Enter a value for neuron: "+num+""+i);
    allActivations[i] = eval(p);
  }
  for(var i=1;i<comp.layers.length+1;i++){
    if((comp.layer(i).comment.length == 2) && (comp.layer(i).comment[0] == num.toString())){
      neuronNumber = eval(comp.layer(i).comment[1]);
      var slider = comp.layer(i).property("Effects").property("Slider Control").property("Slider");
      var previousActivation = 0;
      if(slider.numKeys > 0){
        var previousActivationIndex = slider.nearestKeyIndex(comp.time);
        previousActivation = slider.keyValue(previousActivationIndex);
      }else{
        previousActivation = slider.valueAtTime(comp.time,false);
      }
      slider.setValueAtTime(comp.time,previousActivation);
      slider.setValueAtTime(comp.time+animationTime,allActivations[neuronNumber]);
    }
  }
}else{
  alert("Enter a valid neuron/layer number");
}
alert("Done!");
comp.time = comp.time + animationTime;
app.endUndoGroup();
}

function doFunction(fn){
      var funcString = eval(fn);
      var args = "(";
      for(var i=1;i<arguments.length;i++){
        args += arguments[i]+",";
      }
      args = args.slice(0,-1) + ");\n";
      functionString = fn + args + funcString.toString();
      //alert(functionString);
      var bt = new BridgeTalk;
      bt.target = "aftereffects";
      var message = functionString;
      bt.body = message;
      bt.send();
}

win=new Window("palette","Neural net",[0,0,240,350],{resizeable:true,});
input=win.add("edittext",[41,28,206,63] ,"[3,1]",{readonly:0,noecho:0,borderless:0,multiline:0,enterKeySignalsOnChange:0});
neuralNetStatic=win.add("statictext",[93,10,163,30] ,"neural net:",{multiline:true});
parameters=win.add("panel",[25,110,200,330]);
fireReverseCheck=win.add("checkbox",[150,133,200,330],"FRev");
reverseCheck=win.add("checkbox",[150,213,200,250],"Rev");
fireWeights = win.add("button",[45,125,140,155],"Fire Weights");
lockWeightsButton=win.add("button",[45,165,140,195],"Lock Weights");
selectWeights=win.add("button",[45,205,140,235],"Select Weights");
fireUp = win.add("button",[45,245,140,275],"FIRE UP!");
modify = win.add("button",[45,285,140,315],"Modify!");
reverseCheck.value=0;
createNet=win.add("button",[70,70,178,99],"Create");
win.center();
win.show();


createNet.onClick = function(){
  app.beginUndoGroup("createNet");
  var netArray = input.text;
  net(eval(netArray));
  app.endUndoGroup();
}
selectWeights.onClick = function(){
  app.beginUndoGroup("Select weights");
  var reverse = reverseCheck.value == 0? false:true;
  select(false,reverse);
  app.endUndoGroup();
}
lockWeightsButton.onClick = function(){
  app.beginUndoGroup("lock weights");
  weightsLocked = !weightsLocked;
  lockWeights(weightsLocked);
  app.endUndoGroup();
}
fireUp.onClick = function(){
  var comp = app.project.activeItem;
  var hexColor = $.colorPicker();
  var r = hexColor >> 16;
  var g = (hexColor & 0x00ff00) >> 8;
  var b = hexColor & 0xff;
  r/=255;g/=255;b/=255;
  var fTime = prompt("Enter the flash time",1.2);
  fTime = parseFloat(fTime);
  var startingPlace = prompt("Enter the starting neuron/layer",0);
  var endingPlace = prompt("Enter the ending neuron/layer",1);
  var formTheCombos = formCombosGivenCoord([startingPlace,endingPlace]);
  select(true,false,formTheCombos[0]);
  doFunction("fire",fTime,"["+r+","+g+","+b+",1]",formTheCombos[1]);
  alert("done!");
  comp.time = comp.time + fTime;
}

fireWeights.onClick = function(){
  
  app.wrapUndo(
    fire,
    $prompt("Flash time", 1.2, parseFloat), $.$colorPicker(1),
    fireReverseCheck.value
  );
  
  /*
  app.beginUndoGroup("Fire weights");
  var hexColor = $.colorPicker();
  var r = hexColor >> 16;
  var g = (hexColor & 0x00ff00) >> 8;
  var b = hexColor & 0xff;
  r/=255;g/=255;b/=255;
  var promptValue = prompt("Enter the flash time",1.2);
  promptValue = parseFloat(promptValue);
  fire(promptValue,[r,g,b,1],fireReverseCheck.value);
  app.endUndoGroup();
  */
}

modify.onClick = function(){
  modifyNeurons();
}