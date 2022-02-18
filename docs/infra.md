
Infrastructure/ foundation of video production

# STRUCTURE
Structure is how presentation of information is organized.
This practically translates to a tree of scenes.
Each scene contains text, audio, images, and videos to be displayed or generally used in the scene.

# MOBJECT
Mobject is an Animation Object. It could be anything from an Illustrator-made character
to a talking tree, to a network of shapes and texts (precomp) with modifiable props
and well-defined behaviors (methods)

Example:
    Neural Net:
        - Num Neurons
        - Type of connectors
        -> Fire weights
        -> Collapse network
        -> Change network dimensions

# FLOW
Flow is what allows the story and Mobjects to flow through the structure.
It is what keeps the viewer engaged, and hooked. It allows for an easily
digestible video.

There are many components to the creation of FLOW:
    
    0) Displayers:
        - Shape displayers
        - Text displayers
        - Special MObject displayers

    1) Highlighters:
        - Bounding Boxes
        - Highlight Spots
        - Bongers
        - Arrows
    
    2) Connectors:
        - Simple Line Connectors
        - Advanced Curve Connectors (in Bezier shapes)
        - Text Connectors (weird one)
    
    3) Transitioners:
        - Morpher
        - Footage Mosher (Datamosh)
    
    4) Controllers:
        - Transform Controller
        - Assemble/Disassemble
        - Physical Simulators


# General Scheme of *C* Part of Video Production

_Structure_: GATHER ==> DROP ==> DISPLAY (as markers)

_Mobject_  : MAKE   ==> PROP/METHODS ==> SAVE

_Flow_     : DISPLAY ==> CONTROL ==> HIGHLIGHT ==> CONNECT ==> TRANSITION
