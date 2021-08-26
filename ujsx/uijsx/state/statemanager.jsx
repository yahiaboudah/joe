/*******************************************************************************
        TODO:           ---
		Name:           statemanager
		Desc:           A state manager for uijsx.
		Kind:           Helper.
		Created:        2108 (YYMM)
		Modified:       2108 (YYMM)
*******************************************************************************/

/******************************************************************************
============================ Docs =============================================

==> How the library works:
    
    Here's a regular implementation of a window with a button and a panel,
    implemented procedurally:
    
    w = new Window("palette")
    s = w.add("statictext", undefined, "text");
    b = w.add("button", undefined, "button");

    b.onClick = function(){ s.text = "other text" }

    w.show();

    UIJSX aims to change the dull procedural, difficult-to-maintain, not very
    readable, and overall boring coding style of Adobe scripts UIs into a more
    fun, modern, declarative coding style, that looks like this:

    w = new _Window({
        title: "mywin",
        children:[

            new _Text({
                stateful: true,
                text: {
                    statevar: "sttext",
                    init: "text"
                }
            }),
            
            new _Button({
                text: "button",
                onClick: function(){
                    updateState("sttext", "other text")
                }
            })
        
        ]
    })

    While the verboseness of the declarative style may look off-putting in this
    simple example, compared to the compact five-line procedural representaion
    of our UI, it has the following benefits:

        * Better readability: listing widgets as instances and filling their
          properties key-by-key is much more readable and maintainable in
          long run. The code itself resembles the UI, which makes it easier
          to visualize the final product, and make proper adjustments.
        
        * Reusability: It may be difficult or uncomfortable to create complex 
          custom UI elements and store them for later personal use since 
          everything is tied in a "long procedural train". This is made a lot
          easier with UIJSX  

******************************************************************************/

//@include "../containers/window.jsx"
//@include "../elements/button.jsx"
//@include "../elements/statictext.jsx"

GLOBALSTATE = {
    stttext : {
        value: "initial text",
        followers:[
            "&(statictextwidget)text"
        ]
    }
}; //& + prop

w = new _Window({
    title: "testwin",
    nosize: true,
    spacing: 10,
    margins: 10,
    children: [
        new _Text({
            stateful: true,
            text: GLOBALSTATE.stttext
        }),
        new _Button({
            text: "button",
            onClick: function()
            {
                alert("got clicked on!");
            }
        })
    ]
})

w.show();

// // Normal UI creation and state management:
// w = new Window("palette")
// s = w.add("statictext", undefined, "text");
// s.justify    = "center"
// s.characters = 10;
// b = w.add("button", undefined, "button");

// b.onClick = function(){
//     s.justify = "left";
//     s.text = "other text"
// }

// w.show();