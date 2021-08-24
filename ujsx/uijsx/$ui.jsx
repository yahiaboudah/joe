

// win = new Window("palette");
// image = win.add("image", undefined, "D:/media/Memes/exp/1.jpg");
// image2 = win.add("image", undefined, "D:/media/Memes/exp/24.jpg");
// image2.hide();
// image.addEventListener("click", (function(){
//     image2.show();
//     image.hide();
// }))
// win.show();

// Image.prototype.refresh = function(){
//     var wh = this.size;
//     this.size = [1+wh[0],1+wh[1]];
//     this.size = [wh[0],wh[1]];
//     wh = null;
// }
// var w = new Window ("palette", "Video Player");
// var play = w.add ("iconbutton", undefined, File ("/d/ICONS/img/edit.png"));
// var myImage  = w.add("image", undefined,File ("d:/media/Memes/exp/1.jpg") , {counter: 1})

// myImage.onDraw = function()
// {
//     this.properties.counter++;
//     this.graphics.drawImage(ScriptUI.newImage("d:/media/Memes/exp/"+this.properties.counter+".jpg"),0, 0);
// };

// play.onClick = function(){
//     myImage.refresh();
// }


// counter = 0;
// seq = Folder("d:/media/Memes/exp").getFiles();

// play.onClick  = function(){
    
//     pp = seq[counter].fsName;
//     if(counter == seq.length-1)
//     {
//         counter = 0;
//         return;
//     }
//     img.image = pp;
//     counter++;
//     // this.notify("onClick");
// }

// w.show();

// icon = flowers["icon"];
// for(y in icon)
// {
//     $.writeln(y + ": " + uneval(icon[y]));
// }

// Image.prototype.onDraw = function()
// {
    
//     if( !this.image ) return;
    
//     var WH = this.size,
//     wh = this.image.size,
    
    
//     k = Math.min(WH[0]/wh[0], WH[1]/wh[1]),
//     xy;
//     wh = [k*wh[0],k*wh[1]];
//     xy = [ (WH[0]-wh[0])/2, (WH[1]-wh[1])/2 ];
    
    
//     this.graphics.drawImage(this.image,xy[0],xy[1],wh[0],wh[1]);
//     WH = wh = xy = null;
// }
// var w = new Window ("dialog", "Bouquet");
// var flowers = w.add ("image", undefined, File ("/d/media/Memes/exp/5.jpg"));
// flowers.size = [250,250];
// w.show ();

// =============================

// var w = new Window( "palette", "Alert Box Builder");

// p = w.add("panel", undefined, "my panel")
// b = p.add("iconbutton", undefined, "d:/ICONS/img/edit.png");
// b2= p.add("iconbutton", undefined, "d:/icons/img/ae composition.png");


// ScriptUI.events.createEvent( "MouseEvent" );

// w.addEventListener("mousedown", function(){
//     alert("Window was clicked!");
// })

// p.addEventListener("mousedown", function(){
//     alert("panel clicked!");
// })

// b.addEventListener("mousedown", function(){
//     alert("button was clicked!");
// })

// b2.addEventListener("mousedown", function(){
//     alert("comp button was clicked!");
// })

// w.show();

// // ======================================

// var dir = "/d/icons/img/";
// var icons = {
//             a: File(dir+"sova.png"), 
//             b: File(dir+"edit.png"),
//             c: File(dir+"ae composition.png"), 
//             d: File(dir+"kj.png")}

// var w = new Window("dialog");
// b = w.add ("iconbutton", undefined, ScriptUI.newImage ("/d/icons/img/sova.png",
//                                                       "/d/icons/img/edit.png", 
//                                                       "/d/icons/img/ae composition.png", 
//                                                       "/d/icons/img/kj.png"));
// a = w.add("button", undefined ,"disable other");
// a.onClick = function(){
//     b.enabled = !b.enabled;
// }
// w.show();

// create an example array
// lines = [];
// for (i = 0; i < 20; i++)
// lines.push ("Line " + String (i));
// alert_scroll ("Example", lines);

// function alert_scroll (title, input) { // string, string/list
// // if input is an array, convert it to a string
// if (input instanceof Array)
//  input = input.join ("\r");
// var w = new Window ("dialog", title);
// var list = w.add ("edittext", undefined, input, {multiline: true, scrolling: true, readonly: true});
// // the list should not be taller than the maximum possible height of the window
// list.maximumSize.height = w.maximumSize.height - 100;
// list.minimumSize.width = 150;
// w.add ("button", undefined, "Close", {name: "ok"});
// w.show()}

// var w = new Window ("dialog");
// // w.alignChildren = "left";
// var check1 = w.add ("checkbox", undefined, "Prefer white");
// var check2 = w.add ("checkbox", undefined, "Prefer black and white");
// check1.value = true;
// w.show ();

// var w = new Window ("dialog");
// var radio_group = w.add ("panel");
//  radio_group.alignChildren = "left";
//  radio_group.add ("radiobutton", undefined, "InDesign");
//  radio_group.add ("radiobutton", undefined, "PDF");
//  radio_group.add ("radiobutton", undefined, "IDML");
//  radio_group.add ("radiobutton", undefined, "Text");
// w.add ("button", undefined, "OK");
// // set dialog defaults
// radio_group.children[0].value = true;
// function selected_rbutton (rbuttons) {
//  for (var i = 0; i < rbuttons.children.length; i++) {
//  if (rbuttons.children[i].value == true) {
//  return rbuttons.children[i].text;
//  }
//  }
// }
// ff = w.show();

// $.writeln(ff);

// ls = ['bat', 'bear', 'beaver', 'bee', 'cat', 'cats and dogs', 'dog', 'maggot', 'moose',
// 'moth', 'mouse', 'moogrt'];

// picked = type_ahead (ls);

// function type_ahead (animals) {
    
//     var w = new Window ('dialog {text: "Quick select", alignChildren: "fill"}');
   
//     var entry = w.add ('edittext {active: true}');
//     var list = w.add ('listbox', [0, 0, 150, 250], animals);
    
//     list.selection = 0;

//     entry.onChanging = function () {
        
//         var temp = this.text;

//         list.removeAll ();
//         for (var i = 0; i < animals.length; i++) {
//             if (animals[i].toLowerCase().indexOf (temp) == 0) {
//                 list.add ('item', animals[i]);
//                 }
//         }
//     if (list.items.length > 0){
//         list.selection = 0;
//         }
//     }
//   // We need the button to catch the Return/Enter key (CC and later)
//   w.add ('button', undefined, 'Ok', {name: 'ok'});

//   if (w.show () != 2){
//    alert(list.selection.text);
//   }
//  w.close();
//  }