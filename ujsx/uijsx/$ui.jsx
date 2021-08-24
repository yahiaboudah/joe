

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

// var names = ["Annabel", "Bertie", "Caroline", "Debbie", "Erica"];
// var w = new Window ("dialog", "Place documents", undefined, {closeButton: false});
// w.alignChildren = "right";
// var main = w.add ("group");
//  main.add ("statictext", undefined, "Folder: ");
//  var group = main.add ("group {alignChildren: 'left', orientation: 'stack'}");

//  var list = group.add ("dropdownlist", undefined, names);
 
//  var e = group.add ("edittext");
//  e.text = names[0]; e.active = true;
 
//  list.preferredSize.width = 240;
//  e.preferredSize.width = 220; e.preferredSize.height = 20;

// var buttons = w.add ("group")
//  buttons.add ("button", undefined, "OK");
//  buttons.add ("button", undefined, "Cancel");

// list.onChange = function () {
//  e.text = list.selection.text;
//  e.active = true;
// }
// w.show ();

// var w = new Window ("dialog");
// var tree = w.add ("treeview", [0, 0, 150, 150]);
// var mammals = tree.add ("node", "Mammals");
//  mammals.add ("item", "cats");
//  mammals.add ("item", "dogs");
// var insects = tree.add ("node", "Insects");
//  insects.add ("item", "ants");
//  insects.add ("item", "bees");
//  insects.add ("item", "flies");
// mammals.expanded = true;
// insects.expanded = true;
// w.show ();

/* Treeview with icons:: */
// var w = new Window ("dialog");
// var tree = w.add ("treeview", [0, 0, 150, 200]);
// var folder_1 = tree.add ("node", "Folder 1");
//  folder_1.image = File ("/d/icons/img/edit.png");
//  folder_1.add ("item", "File 1 1");
//  folder_1.items[0].image = File ("/d/icons/img/ae composition.png");
//  folder_1.add ("item", "File 1 2");
//  folder_1.items[1].image = File ("/d/icons/img/ae composition.png");
//  folder_1.add ("item", "File 1 3");
//  folder_1.items[2].image = File ("/d/icons/img/ae composition.png");
// var folder_2 = tree.add ("node", "Folder 2");
//  folder_2.image = File ("/d/icons/img/edit.png");
//  folder_2.add ("item", "File 2 1");
//  folder_2.add ("item", "File 2 2");
//  folder_2.add ("item", "File 2 3");
//  // another method to add the icons
//  for (var i = 0; i < folder_2.items.length; i++){
//  folder_2.items[i].image = File ("/d/icons/img/ae composition.png");
//  }
// folder_1.expanded = true;
// folder_2.expanded = true;
// w.show();

// var w = new Window ('dialog');
// var tree = w.add ('treeview', [0, 0, 150, 350]);
// var mammals = tree.add ('node', 'Mammals');
//  mammals.cats = mammals.add ('node', 'cats');
//  mammals.cats.add ('item', 'tabbies');
//  mammals.cats.add ('item', 'tiggers');
//  mammals.dogs = mammals.add ('node', 'dogs');
//  mammals.dogs.add ('item', 'terrier');
//  mammals.dogs.collies = mammals.dogs.add ('node', 'colly');
//  mammals.dogs.collies.add ('item', 'border');
//  mammals.dogs.collies.add ('item', 'highland');
//  mammals.dogs.add ('item', 'labrador');
// var insects = tree.add ('node', 'Insects');
//  insects.add ('item', 'ants');
//  insects.add ('item', 'bees');
//  insects.add ('item', 'flies');
// var fgroup = w.add ('group {_: StaticText {text: "Find: "}}');
//  var srch = fgroup.add ('edittext {characters: 10}');
// var search_button = w.add ('button {text: "Search"}');
// search_button.onClick = function (){
//  var items = find_item (tree, [], srch.text);
//  if (items.length == 0) { // Nothing found
//  tree.selection = null;
//  return;
//  }
//  var item = items[0];
//  var temp = item; // store this so we can select it later
//  // Expand the full path
//  while (item.parent.constructor.name != 'TreeView') {
//  item.parent.expanded = true;
//  item = item.parent;
//  }
//  tree.selection = temp;
//  tree.active = true;
// } // search_button.onClick
// 51
// function find_item (tree, list, item){
//  var branches = tree.items;
//  for (var i = 0; i < branches.length; i++) {
//  if (branches[i].type == 'node') {
//  find_item (branches[i], list, item);
//  } else if (branches[i].text == item) {
//  list.push (branches[i]);
//  }
//  }
//  return list;
// }
// w.show ();

// var w = new Window ("dialog");
// var s = w.add ("statictext", undefined, "Static");

// s.graphics.drawString("myself", s.graphics.newPen (w.graphics.PenType.SOLID_COLOR, [0.7,
//     0.7, 0.7], 1), 0,0, "Arial-Bold:50");

// w.show ();
