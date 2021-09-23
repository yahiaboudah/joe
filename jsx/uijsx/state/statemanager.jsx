/*******************************************************************************
        TODO:           ---
		Name:           statemanager
		Desc:           A state manager for uijsx.
		Kind:           Helper.
        API:            useState(), updateState()
		Created:        2108 (YYMM)
		Modified:       2108 (YYMM)
*******************************************************************************/
/******************************************************************************
============================ Docs =============================================

==> How the library works:
    
    Here's a regular implementation of a window with a button and a text,
    coded procedurally:
    
    w = new Window("palette")
    s = w.add("statictext", undefined, "text");
    b = w.add("button", undefined, "button");

    b.onClick = function(){ s.text = "other text" }

    w.show();

    UIJSX aims to change the dull procedural, difficult-to-maintain, not very
    readable, and overall boring coding style of Adobe scripts UIs into a more
    fun, modern, declarative coding style, that looks a bit like this:

    w = new _Window({
        title: "mywin",
        children:[

            new _Text({
                stateful: true,
                text: useState("sttext", function(x){
                    return "My Static Text Is: " + x;
                }, "my text")
            }),
            
            new _Button({
                text: "button",
                onClick: function(){
                    updateState("sttext", undefined,"other text")
                }
            })
        
        ]
    })

    While the verboseness of the declarative style may look off-putting in this
    simple example, compared to the compact five-line procedural representaion
    of our UI, it has the following benefits:

        * Readability: listing widgets as instances and filling their
          properties key-by-key is much more readable and maintainable in the
          long run. The code itself resembles the UI, which makes it easier
          to visualize the final product, and make proper adjustments.
        
        * Reusability: It may be difficult or uncomfortable to create complex 
          custom UI elements and store them for later personal use since 
          everything is tied in a "long procedural train". This is made a lot
          easier with UIJSX as complex widgets can be crafted and used across
          many different UIs
        
        * State-Based: When creating a complex UI, it can be difficult to keep
          track of all the variables, variable names, and update each one.
          With UIJSX, this can be acheived by declaring a widget stateful, then
          linking it to a state variable. When creating Event handles for
          events in the UI, calling the updateState() function will go through
          each state variable, find their corresponding stateful widgets and
          update them with the newly supplied values.
    

    While this has many benefits, it also has some drawbacks, the state based
    coding style can be difficult to get used to at first, contrasted with
    the easier and more familiar procedural style. Here's a list of things
    that are worth investigating:
        
        * How does UIJSX affect memory? can there be memory leaks? A lot of these
          created instances are not connected to the rendering engine, but are 
          supposed to simply carry information over to the function that actually
          creates widgets: parent.add("childtype", [arg2, arg3,..etc]).

        * How to access individual stateful children? An issue that arises from
          using this style is the difficulty in grabbing elements and changing
          their values. Using the default coding style, one can do:
                
                widget = container.add("type");
                widget.property = "value";
          
           With the declarative style, one does not have access to this
          "widget variable name". So a custom address must be created for
          any stateful widget to ease its retreival later on when updateState()
          is called and widget property values are modified. A few possible ways
          such an address can be created during container population are:
                
                1) Create a random address and store it as follows:
                    
                    for(i=0, ...)
                    {
                        // ...
                        temp = container.add(child.type);
                        temp.properties.name = "0xc288";
                        //...
                    }
                    then call it later with:
                    
                    widget = container.findElement("0xc288");
                    
                    Now make changes:
                    
                    widget.text = "new text";
                
                2) Use the child index to later retreive it like this:
                    
                    for(i=0..)
                    {
                        // ...
                        address = i + k + j + ...;
                        STATE[statevar].listeners.push(address + propName);
                    }

==> How the State Manager Works:
    
    The state manager basically creates a State object with key-value pairs that
    have information about:

        1) Key: The state variable: The state variable name.
        
        2) Value: An object with two keys: value and followers:
            
            - Value:     The value of that state variable in a given time.
            
            - Listeners: An array containing a list of all the widget that
                        are to be notified and updated when the updateState() 
                        function is called. Each array element is broken down
                        to two pieces of information: 
                        
                        [The address and the property]
                        
                        The address is how we find and retreive our UI object, and
                        the property is the thing we are interested in updating.
                        (ex. text property)

                        [A modifier function]

                        When the 'updateState(statevar)' function is called upon 
                        the occuring of an event, our State Manager looks at the
                        passed name of the piece of state we're interested in
                        changing, then it proceeds to retreive the listeners to
                        the change in that piece of state, one at a time. It uses
                        the modifier function to modify the final value of our 
                        widget property by taking the statevar as an argument, and
                        returning the final polished value.

                         (x) => ("My Static Text Is: " + x);

                         # ES3 JS/ EXTENDSCRIPT do not support arrow functions # 

******************************************************************************/

//@include "../containers/window.jsx"
//@include "../elements/button.jsx"
//@include "../elements/statictext.jsx"

WINSTATE = {
    stttext : {
        value: "my text value",
        listeners:[
            "&[0]text"
        ]
    },
    buttonwidth: {
        value: 50,
        listeners: [
            "&[1]width"
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
            
            text: useState("sttext", function(x){
                return "My Static Text Value Is: " + x;
            }, "my text")
        
        }),
        
        new _Button({
            
            stateful: true,
            text: "button",
            width: useState("buttonwidth", undefined, 40),
            
            onClick: function(){
                /* later on: do fn.call(this)*/
                this.updateState("sttext", "My New Text Value");
                this.updateState("buttonwidth", function(oldWidth){ return oldWidth + 10});
                this.refresh();
            }
        })
    ]
})

w.show();