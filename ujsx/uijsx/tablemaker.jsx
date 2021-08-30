//@include "../docjsx/table.jsx"
$.fp = File($.fileName).path;

Table.removeAll($.fp);
new Table(Table.process(
    "property, type, default, values, desc",
    
    "characters, integer, (txt.len/2)+5, any:+int, num of characters to be displayed",
    "text, string, (empty), any:str, text to be displayed on the button",
    
    "shortcutKey, string, undefined, any:letter(ex:g), the key that activates the onClick function of the button",
     
     "active, boolean, true, any:bool, whether the item has keyboard focus",
     "visible, boolean, true, bool:any, controls the visibility of the button",
     "enabled, boolean, true, bool:any, enables or disables a button",
     
     "helpTip, string, (empty), any:str, modified the displayed help tip in the event of a hoverover",
     
     "type(RO), string, \"button\", \"button\", static property that stores widget type",
     "window(RO), object, Window({}), Window({}), static property that calls the window of the button",

     "alignment, string, center, [center,left,right], align within the parent",
     "textDirection, string, null, [ltr, rtl], specifies the text direction \n(TESTED. DOES NOT WORK)",
     
     "children, array, [], any:arr, An array of child elements",
     "properties, object, {}, any:object, An object with user-assigned property values",

     // location stuff:
     

)).write($.fp, 3)


characters = 25;
justify = "right";
text= "0texttezzezwzwxcfextaezazeaezazeazeeazzz";
active = true;
shortcutKey = "b";
graphics = "graphics";
visible = true;