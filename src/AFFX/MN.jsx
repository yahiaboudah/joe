
$.global.MN = {};

MN.toMN = function toMN(P)
{
    TOP_LEVEL =
    {
        Marker:           "ADBE Marker",
        Time_Remap:       "ADBE Time Remapping",
        Motion_Trackers:  "ADBE MTrackers",
        Masks:            "ADBE Mask Parade",
        Effects:          "ADBE Effect Parade",
        Essential_Properties: "ADBE Layer Overrides" 
    }

    TRANSFORM = 
    {
        Transform:    "ADBE Transform Group",
        
        Anchor_Point: "ADBE Anchor Point",
        
        Position:   "ADBE Position",
        X_Position: "ADBE Position_0",
        Y_Position: "ADBE Position_1",
        Z_Position: "ADBE Position_2",
        
        Scale: "ADBE Scale",

        Orientation: "ADBE Orientation",
        X_Rotation : "ADBE Rotate X",
        Y_Rotation : "ADBE Rotate Y",
        Z_Rotation : "ADBE Rotate Z",
        
        Opacity: "ADBE Opacity"
    },

    AUDIO = 
    {
        Audio: "ADBE Audio Group",
        Audio_Levels: "ADBE Audio Levels"
    },

    THREED = 
    {
        Geometry_Options: ["ADBE Plane Options Group", "ADBE Extrsn Options Group"],
        Curvature: "ADBE Plane Curvature",
        
        Segments: "ADBE Plane Subdivision",
        
        Bevel_Depth: "ADBE Bevel Depth",
        Extrusion_Depth: "ADBE Extrsn Depth",
        Hole_Bevel_Depth: "ADBE Hole Bevel Depth"
    },

    THREEDMATERIALS = 
    {
        Material_Options: "ADBE Material Options Group",
        Light_Transmission: "ADBE Light Transmission",
        Ambient: "ADBE Ambient Coefficient",
        Diffuse: "ADBE Diffuse Coefficient",
        Specular_Intensity: "ADBE Specular Coefficient",
        Specular_Shininess: "ADBE Shininess Coefficient",
        Metal : "ADBE Metal Coefficient",
        Reflection_Intensity: "ADBE Reflection Coefficient",
        Reflection_Sharpness: "ADBE Glossiness Coefficient",
        Reflection_Rolloff: ["ADBE Fresnel Coefficient", "ADBE Transp Rolloff"],
        Transparency: "ADBE Transparency Coefficient",
        Index_Of_Refraction: "ADBE Index of Refraction"
    },

    CAMERA =
    {
        Options: "ADBE Camera Options Group",
        Zoom: "ADBE Camera Zoom",
        Depth_Of_Field: "ADBE Camera Depth of Field",
        Focus_Distance: "ADBE Camera Focus Distance",
        Aperture: "ADBE Camera Aperture",
        Blur_Level: "ADBE Camera Blur Level"
    },

    CAMERAIRIS = 
    {
        Iris_Shape: "ADBE Iris Shape",
        Iris_Rotation: "ADBE Iris Rotation",
        Iris_Roundness: "ADBE Iris Roundness",
        Iris_Aspect_Ration: "ADBE Iris Aspect Ratio",
        Iris_Diffraction_Fringe: "ADBE Iris Diffraction Fringe",
        Hightlight_Gain: "ADBE Iris Highlight Gain",
        Heighlight_Threshold: "ADBE Iris Highlight Threshold",
        Highlight_Saturation: "ADBE Iris Hightlight Saturation"
    },

    LIGHT = 
    {
        Light_Options: "ADBE Light Options Group",
        Intensity: "ADBE Light Intensity",
        Color: "ADBE Light Color",
        Cone_Angle: "ADBE Light Cone Angle",
        Cone_Feather: "ADBE Light Cone Feather 2",
        Falloff: "ADBE Light Falloff Type",
        Radius: "ADBE Light Falloff Start",
        Falloff_Distance: "ADBE Light Falloff Distance",
        Shadow_Darkness: "ADBE Light Shadow Darkness",
        Shadow_Diffusion: "ADBE Light Shadow Diffustion"
    },

    TEXT = 
    {
        Text: "ADBE Text Properties",
        Source_Text: "ADBE Text Document",
        Path_Options: "ADBE Text Path Options",
        Reverse_Path: "ADBE Text Reverse Path",
        Perpendicular_To_Path: "ADBE Text Perpendicular To Path",
        Force_Alignment: "ADBE Text Force Align Path",
        First_Margin: "ADBE Text First Margin",
        Last_Margin: "ADBE Text Last Margin",
        More_Options: "ADBE Text More Options",
        Grouping_Alignment: "ADBE Text Anchor Point Align",
        Animators: "ADBE Text Animators"

        // ANIMATORS:

        ,Animator: "ADBE Text Animator",
        Selectors: "ADBE Text Selectors",
        Range_Selector: "ADBE Text Selector",
        Start: ["ADBE Text Percent Start", "ADBE Text Index Start"],
        End: ["ADBE Text Percent End", "ADBE Text Index End"],
        Offset: ["ADBE Text Percent Offset", "ADBE Text Index Offset"],
        Advanced: "ADBE Text Range Advanced",
        Mode: "ADBE Text Selector Mode",
        Amount: "ADBE Text Selector Max Amount",
        Smoothness: "ADBE Text Selector Smoothness",
        Ease_High: "ADBE Text Levels Max Ease",
        Ease_Low: "ADBE Text Levels Min Ease",
        Random_Seed: "ADBE Text Random Seed",
        Properties: "ADBE Text Animator Properties",
        Anchor_Point: "ADBE Text Anchor Point 3D",
        Position: "ADBE Text Position 3D",
        Scale: "ADBE Text Scale 3D",
        Skew: "ADBE Text Skew",
        Skew_Axis: "ADBE Text Skew Axis",
        X_Rotation: "ADBE Text Rotation X",
        Y_Rotation: "ADBE Text Rotation Y",
        Z_Rotation: "ADBE Text Rotation",
        Opacity: "ADBE Text Opacity",
        Fill_Opacity: "ADBE Text Fill Opacity",
        Stroke_Opacity: "ADBE Text Stroke Opacity",
        Fill_Hue: "ADBE Text Fill Hue",
        Stroke_Hue: "ADBE Text Stroke Hue",
        Fill_Saturation: "ADBE Text Fill Saturation",
        Stroke_Saturation: "ADBE Text Stroke Saturation",
        Fill_Brightness: "ADBE Text Fill Brightness",
        Stroke_Brightness: "ADBE Text Stroke Brightness",
        Stroke_Width: "ADBE Text Stroke Width",
        Line_Anchor: "ADBE Text Line Anchor",
        Tracking_Type: "ADBE Text Track Type",
        Tracking_Amount: "ADBE Text Tracking Amount",
        Character_Value: "ADBE Text Character Replace",
        Character_Offset: "ADBE Text Character Offset",
        Line_Spacing: "ADBE Text Line Spacing",
        Blue: "ADBE Text Blur"


        //THREE D:
        ,Front_Color: "ADBE 3DText Front RGB",
        Front_Hue: "ADBE 3DText Front Hue",
        Front_Saturation: "ADBE 3DText Front Sat",
        Front_Brightness: "ADBE 3DText Front Bright",
        Front_Opacity: "ADBE 3DText Front Opacity",
        Front_Ambient: "ADBE 3DText Front Ambient",
        Front_Diffuse: "ADBE 3DText Front Diffuse",
        Front_Specular_Intensity: "ADBE 3DText Front Specular",
        Front_Specular_Shininess: "ADBE 3DText Front Shininess",
        Front_Metal: "ADBE 3DText Front Metal",
        Front_Reflection_Intensity: "ADBE 3DText Front Reflection",
        Front_Reflection_Sharpness: "ADBE 3DText Front Gloss",
        Front_Reflection_Rolloff: "ADBE 3DText Front Fresnel",
        Front_Transparency: "ADBE 3DText Front Xparency",
        Front_Transparency_Rolloff: "ADBE 3DText Front XparRoll",
        Front_Index_Of_Refraction: "ADBE 3DText Front IOR",
        Bevel_Color: "ADBE 3DText Bevel RGB",
        Bevel_Hue: "ADBE 3DText Bevel Hue",
        Bevel_Saturation: "ADBE 3DText Bevel Sat",
        Bevel_Brightness: "ADBE 3DText Bevel Bright",
        Bevel_Opacity: "ADBE 3DText Bevel Opacity",
        Bevel_Ambient: "ADBE 3DText Bevel Ambient",
        Bevel_Diffuse: "ADBE 3DText Bevel Diffuse",
        Bevel_Specular_Intensity: "ADBE 3DText Bevel Specular",
        Bevel_Specular_Shininess: "ADBE 3DText Bevel Shininess",
        Bevel_Metal: "ADBE 3DText Bevel Metal",
        Bevel_Reflection_Intensity: "ADBE 3DText Bevel Reflection",
        Bevel_Reflection_Sharpness: "ADBE 3DText Bevel Gloss",
        Bevel_Reflection_Rolloff: "ADBE 3DText Bevel Fresnel",
        Bevel_Transparency: "ADBE 3DText Bevel Xparency",
        Bevel_Transparency_Rolloff: "ADBE 3DText Bevel XparRoll",
        Bevel_Index_Of_Refraction: "ADBE 3DText Bevel IOR",
        
        Side_Color: "ADBE 3DText Side RGB",
        Side_Hue: "ADBE 3DText Side Hue",
        Side_Saturation: "ADBE 3DText Side Sat",
        Side_Brightness: "ADBE 3DText Side Bright",
        Side_Opacity: "ADBE 3DText Side Opacity",
        Side_Ambient: "ADBE 3DText Side Ambient",
        Side_Diffuse: "ADBE 3DText Side Diffuse",
        Side_Specular_Intensity: "ADBE 3DText Side Specular",
        Side_Specular_Shininess: "ADBE 3DText Side Shininess",
        Side_Metal: "ADBE 3DText Side Metal",
        Side_Reflection_Intensity: "ADBE 3DText Side Reflection",
        Side_Reflection_Sharpness: "ADBE 3DText Side Gloss",
        Side_Reflection_Rolloff: "ADBE 3DText Side Fresnel",
        Side_Transparency: "ADBE 3DText Side Xparency",
        Side_Transparency_Rolloff: "ADBE 3DText Side XparRoll",
        Side_Index_Of_Refraction: "ADBE 3DText Side IOR",

        Back_Color: "ADBE 3DText Back RGB",
        Back_Hue: "ADBE 3DText Back Hue",
        Back_Saturation: "ADBE 3DText Back Sat",
        Back_Brightness: "ADBE 3DText Back Bright",
        Back_Opacity: "ADBE 3DText Back Opacity",
        Back_Ambient: "ADBE 3DText Back Ambient",
        Back_Diffuse: "ADBE 3DText Back Diffuse",
        Back_Specular_Intensity: "ADBE 3DText Back Specular",
        Back_Specular_Shininess: "ADBE 3DText Back Shininess",
        Back_Metal: "ADBE 3DText Back Metal",
        Back_Reflection_Intensity: "ADBE 3DText Back Reflection",
        Back_Reflection_Sharpness: "ADBE 3DText Back Gloss",
        Back_Reflection_Rolloff: "ADBE 3DText Back Fresnel",
        Back_Transparency: "ADBE 3DText Back Xparency",
        Back_Transparency_Rolloff: "ADBE 3DText Back XparRoll",
        Back_Index_Of_Refraction: "ADBE 3DText Back IOR",

        Text_Bevel_Depth: "ADBE 3DText Bevel Depth",
        Text_Extrustion_Depth: "ADBE 3DText Extrude Depth"
    },

    SHAPE =
    {

        Shape_Layer: "ADBE Vector Layer",
        Root_Contents: "ADBE Root Vectors Group"
        
        //GROUP
        ,Group: "ADBE Vector Group",
        Vector_Blend_Mode: "ADBE Vector Blend Mode",
        Vector_Contents: "ADBE Vectors Group",
        Vector_Transform: "ADBE Vector Transform Group",
        Vector_Material_Options: "ADBE Vector Materials Group"
        
        // RECT
        ,Vector_Rect: "ADBE Vector Shape - Rect",
        Vector_Shape_Direction: "ADBE Vector Shape Direction",
        Vector_Rect_Size: "ADBE Vector Rect Size",
        Vector_Rect_Position: "ADBE Vector Rect Position",
        Vector_Rect_Roundness: "ADBE Vector Rect Roundness"

        //ELLIPSE
        ,Vector_Ellipse: "ADBE Vector Shape - Ellipse",
        // Vector_Shape_Direction: "ADBE Vector Shape Direction",
        Vector_Size: "ADBE Vector Size",
        Vector_Position: "ADBE Vector Position"

        //POLYSTAR
        ,Polystar: "ADBE Vector Shape - Star",
        // Vector_Shape_Direction: "ADBE Vector Shape Direction",
        Vector_Polystar_Type: "ADBE Vector Star Type",
        Vector_Polystar_Points: "ADBE Vector Star Points",
        Vector_Polystar_Position: "ADBE Vector Star Position",
        Vector_Polystar_Rotation: "ADBE Vector Star Rotation",
        Vector_Polystar_Inner_Radius: "ADBE Vector Star Inner Radius",
        Vector_Polystar_Outer_Radius: "ADBE Vector Star Outer Radius",
        Vector_Polystar_Inner_Roundness: "ADBE Vector Star Inner Roundness",
        Vector_Polystar_Outer_Roundness: "ADBE Vector Star Outer Radius"

        //PATH
        ,Path: "ADBE Vector Shape",
        PathGroup: "ADBE Vector Shape - Group",
        // Vector_Shape_Direction: "ADBE Vector Shape Direction"

        //FILL
        Vector_Fill: "ADBE Vector Graphic - Fill",
        Vector_BlendMode: "ADBE Vector Blend Mode",
        Vector_Composite: "ADBE Vector Composite Order",
        Vector_FillRule: "ADBE Vector Fill Rule",
        Vector_Color: "ADBE Vector Fill Color",
        Vector_Opacity: "ADBE Vector Fill Opacity"

        // STROKE
        ,Vector_Stroke: "ADBE Vector Graphic - Stroke",
        Vector_Stroke_Blend_Mode: "ADBE Vector Blend Mode",
        Vector_Stroke_Composite: "ADBE Vector Composite Order",
        Vector_Stroke_Color: "ADBE Vector Stroke Color",
        Vector_Stroke_Opacity: "ADBE Vector Stroke Opacity",
        Vector_Stroke_Stroke_Width: "ADBE Vector Stroke Width",
        Vector_Stroke_Line_Cap: "ADBE Vector Stroke Line Cap",
        Vector_Stroke_Line_Join: "ADBE Vector Stroke Line Join",
        Vector_Stroke_Miter_Limit: "ADBE Vector Stroke Miter Limit"

        // STROKE DASHES
        ,Vector_Stroke_Dashes: "ADBE Vector Stroke Dashes",
        Vector_Stroke_Dashes_Dash: "ADBE Vector Stroke Dash 1",
        Vector_Stroke_Dashes_Gap: "ADBE Vector Stroke Gap 1",
        Vector_Stroke_Dashes_Dash_2: "ADBE Vector Stroke Dash 2",
        Vector_Stroke_Dashes_Gap_2: "ADBE Vector Stroke Gap 2",
        Vector_Stroke_Dashes_Dash_3: "ADBE Vector Stroke Dash 3",
        Vector_Stroke_Dashes_Gap_3: "ADBE Vector Stroke Gap 3",
        Vector_Stroke_Dashes_Offset: "ADBE Vector Stroke Offset"

        //STROKE TAPER
        ,Vector_Stroke_Taper: "ADBE Vector Stroke Taper",
        Vector_Stroke_Taper_Start_Width: "ADBE Vector Taper Start Width",
        Vector_Stroke_Taper_Length_Units: "ADBE Vector Taper Length Units",
        Vector_Stroke_Taper_End_Width: "ADBE Vector Taper End Width",
        Vector_Stroke_Taper_End_Ease: "ADBE Vector Taper End Ease",
        Vector_Stroke_Taper_End_Length: "ADBE Vector Taper End Length",
        Vector_Stroke_Taper_Start_Length: "ADBE Vector Taper Start Length",
        Vector_Stroke_Taper_Start_Ease: "ADBE Vector Taper Start Ease"

        //STROKE WAVE
        ,Vector_Stroke_Taper_Wave: "ADBE Vector Stroke Wave",
        Vector_Stroke_Taper_Wave_Amount: "ADBE Vector Taper Wave Amount",
        Vector_Stroke_Taper_Wave_Units: "ADBE Vector Taper Wave Units",
        Vector_Stroke_Taper_Wave_Phase: "ADBE Vector Taper Wave Phase",
        Vector_Stroke_Taper_Wave_WaveLength: "ADBE Vector Taper Wavelength"

        //GRADIENT FILL
        ,Vector_Gradient_Fill: "ADBE Vector Graphic - G-Fill",
        Vector_Blend_Mode: "ADBE Vector Blend Mode",
        Vector_Composite: "ADBE Vector Composite Order",
        Vector_Fill_Rule: "ADBE Vector Composite Order",
        Vector_Gradient_Type: "ADBE Vector Grad Type",
        Vector_Gradient_Start_Point: "ADBE Vector Grad Start Pt",
        Vector_Gradient_End_Point: "ADBE Vector Grad End Pt",
        Vector_Gradient_Highlight_Length: "ADBE Vector Grad HiLite Length",
        Vector_Gradient_Highlight_Angle: "ADBE Vector Grad HiLite Angle",
        Vector_Gradient_Colors: "ADBE Vector Grad Colors",
        Vector_Fill_Opacity: "ADBE Vector Fill Opacity"

        //GRADIENT STROKE:
        ,Gradient_Stroke: "ADBE Vector Graphic - G-Stroke",
        Blend_Mode: "ADBE Vector Blend Mode",
        Composite: "ADBE Vector Composite Order",
        Stroke_Rule: "ADBE Vector Composite Order",
        Type: "ADBE Vector Grad Type",
        Start_Point: "ADBE Vector Grad Start Pt",
        End_Point: "ADBE Vector Grad End Pt",
        Highlight_Length: "ADBE Vector Grad HiLite Length",
        Highlight_Angle: "ADBE Vector Grad HiLite Angle",
        Colors: "ADBE Vector Grad Colors",
        Opacity: "ADBE Vector Stroke Opacity",
        Stroke_Width: "ADBE Vector Stroke Width",
        Line_Cap: "ADBE Vector Stroke Line Cap",
        Line_Join: "ADBE Vector Stroke Line Join",
        Miter_Limit: "ADBE Vector Stroke Miter Limit",
        Dashes: "ADBE Vector Stroke Dashes"

        //MERGE PATHS:
        ,Merge_Paths: "ADBE Vector Filter - Merge",
        Mode: "ADBE Vector Merge Type"

        //OFFSET PATHS:
        ,Offset_Paths: "ADBE Vector Filter - Offset",
        Amount: "ADBE Vector Offset Amount",
        Line_Join: "ADBE Vector Offset Line Join",
        Miter_Limit: "ADBE Vector Offset Miter Limit",
        Copies: "ADBE Vector Offset Copies",
        Copy_Offset: "ADBE Vector Offset Copy Offset"

        //PUCKER & BLOAT:
        ,Pucker$Bloat: "ADBE Vector Filter - PB",
        Amount: "ADBE Vector PuckerBloat Amount"

        //REPEATER
        ,Repeater: "ADBE Vector Filter - Repeater",
        Copies: "ADBE Vector Repeater Copies",
        Offset: "ADBE Vector Repeater Offset",
        Composite: "ADBE Vector Repeater Order",
        Transform: "ADBE Vector Repeater Transform"

        //ROUND CORNERS
        ,Round_Corners: "ADBE Vector Filter - RC",
        Radius: "ADBE Vector RoundCorner Radius"

        //TRIM PATHS
        ,Trim_Paths: "ADBE Vector Filter - Trim",
        Start: "ADBE Vector Trim Start",
        End: "ADBE Vector Trim End",
        Offset: "ADBE Vector Trim End",
        Trim_Multiple_Shapes: "ADBE Vector Trim Type"

        //TWIST
        ,Twist: "ADBE Vector Filter - Twist",
        Angle: "ADBE Vector Twist Angle",
        Center: "ADBE Vector Twist Center"

        //WIGGLE PATHS
        ,WigglePaths: "ADBE Vector Filter - Roughen",
        Size: "ADBE Vector Roughen Size",
        Detail: "ADBE Vector Roughen Detail",
        Points: "ADBE Vector Roughen Points",
        Wiggles$$Second: "ADBE Vector Temporal Freq",
        Correlation: "ADBE Vector Correlation",
        Temporal_Phase: "ADBE Vector Temporal Phase",
        Spatial_Phase: "ADBE Vector Spatial Phase",
        Random_Seed: "ADBE Vector Random Seed"

        //WIGGLE TRANSFORM
        ,Wiggle_Transform: "ADBE Vector Filter - Wiggler",
        Wiggles$$Second: "ADBE Vector Xform Temporal Freq",
        Correlation: "ADBE Vector Correlation",
        TemporalPhase: "ADBE Vector Temporal Phase",
        Spatial_Phase: "ADBE Vector Spatial Phase",
        Random_Seed: "ADBE Vector Random Seed",
        Transform: "ADBE Vector Wiggler Transform",

        //ZIG ZAG
        Zig_Zag: "	ADBE Vector Filter - Zigzag",
        Size: "ADBE Vector Zigzag Size",
        Ridges_per_segment: "ADBE Vector Zigzag Detail",
        Points: "ADBE Vector Zigzag Points"
    }

    var A = [TOP_LEVEL, TRANSFORM, AUDIO, THREED, THREEDMATERIALS, CAMERA, CAMERAIRIS, LIGHT, TEXT, SHAPE], i=-1;
    
    var C; // CURRENT
    while(++i<A.length)
    {
        C = A[i];
        for(k in C) if(x.in(C) && x == P) return C[k];
    }

    return "ADBE";
}

// [global match names funcs]:
MN.fromMN = function fromMN(m, category)
{
    m = m.split('-');
    var k, d;

    return 
    [
        m[1].replace(/\s*/, ''),
        (k = m[0].replace(/\s*/, '').split(' '), k[2]),
        k[1]
    ][category || 0];
}

MN.TOMN = function (what)
{
    what = what.replace(/\_|\W|\d/g, '').toLowerCase();

    var DD = {
        pathgroup: "ADBE Vector Shape - Group",
        path: "ADBE Vector Shape",
        stroke: "ADBE Vector Graphic - Stroke",
        strokewidth: "ADBE Vector Stroke Width",
        fill: "ADBE Vector Graphic - Fill"  
    }

    return DD[what];
}