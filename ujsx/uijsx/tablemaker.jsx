//@include "../docjsx/table.jsx"
$.fp = File($.fileName).path;

Table.removeAll($.fp);
new Table(Table.process(
    "property, type, default, values, desc",
    "characters, integer, (txt.len/2)+5, any:+int, num of characters to be displayed",
     "text, string, (empty string), any:str, text to be displayed on the button",
     "active, boolean, true, any:bool, whether the item has keyboard focus",
     "shortcutKey, string, undefined, any:letter(ex:g), the key that activates the onClick function of the button"
)).write($.fp, 3)


characters = 25;
justify = "right";
text= "0texttezzezwzwxcfextaezazeaezazeazeeazzz";
active = true;
shortcutKey = "b";
graphics = "graphics";
visible = true;