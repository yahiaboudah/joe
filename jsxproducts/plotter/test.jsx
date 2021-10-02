

var w = new Window("palette", "Plotter");

var bannerImage = w.addAnimatedSequence();
var scriptControls0 = w.add("panel", undefined, "Controls");

var funcBox = scriptControls0.add("edittext", undefined, "Math.pow(x, 2)", {multiline: true, borderless: true});
funcBox.preferredSize = [110, 70]; 

var scriptControls = scriptControls0.add("group", undefined, "Controls");
scriptControls.orientation = "row";
var xbasis  = scriptControls.add("edittext", undefined, "100");
var ybasis  = scriptControls.add("edittext", undefined, "100");
var strokew = scriptControls.add("edittext", undefined, "10");

var execControls = w.add("group");
var plotButton   = execControls.add("button", undefined, "PLOT");

plotButton.onClick = function(){
  plot(
    app.project.activeItem,
    funcBox.text,
    false,
    parseInt(xbasis.text),
    parseInt(ybasis.text),
    -10,
    10,
    1, // stepSize
    parseInt(strokew.text),
    [1,1,1,1]
  )
}

w.show();