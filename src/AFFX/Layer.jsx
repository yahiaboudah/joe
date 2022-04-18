
var C;
if(is(C = app.project.activeItem, CompItem) && C.numLayers){
    $.global.layr = C.layer(1); 
}

eval(MODULE.re("$.global", "Layer", "dummy_auto"))


[STATIC]

({
    dummy_auto: function(){
        return;
    },

    clone: function(cloneName)
    {
        var c = this.containingComp,
            n = cloneName || c.newName(this.name);
        
        switch (this.getType())
        {    
            case "shape":
                c.layers.$add("shape", {name: n},{
                    // PROPS GO HERE:
                    // GROUPS/FILL..etc
                })
                break;
        
            case "text":
                c.layers.$add("text", {name: n}, {
                    // OLD TEXT LAYER PROPS GO HERE:
                    // SOURCE TEXT, FILL COLOR, STROKE..etc
                })
                break;
            default:
                break;
        }
    },

    mask: function(mask, cfg)
    {
        var mModes = {
            '-': MaskMode.SUBTRACT
        }

        var msk = this.Masks.addProperty("Mask");
        msk.maskMode = mModes[mask.maskMode];
        switch(mask.path)
        {
            case Shape:
                msk.property("Mask Path").setValue(mask.path);
                break;
            
            case Expression:
                msk.property("Mask Path").expression = mask.path.toString();
        }

        if(cfg.locked == true) msk.locked = true;

        return msk;
    },

    masks: function(masksArr, cfg)
    {
        var i = -1, MM = [];
        while(++i<masksArr.length) MM.push(this.mask(masksArr[i], cfg));

        return MM;
    },

    centerAnchorPoint: function(time)
    {
        var src = this.sourceRectAtTime(this.containingComp.time,false),
            xy = [src.width/2  + src.left, src.height/2 + src.top];

        time?
            this.anchorPoint.setValueAtTime(time, xy):
            this.anchorPoint.setValue(xy);

        return this;
    },
    
    transformIt: function(PROP, value, t, groupChecked)
    {
        /**
            * Change opacity, position and scale of a layer or of multiple
            * groups pertaining to a layer easily.
            */
    
        var layer = this;
    
        if(typeof groupChecked == "undefined") groupChecked = false;
        var scaleFactorValue = opacityFactorValue = dist = value;
    
        var dirs = 
        {
            scale: 
            {
            up   :  scaleFactorValue,
            down : -scaleFactorValue
            },
    
            opacity: 
            {
            up   :  opacityFactorValue,
            down : -opacityFactorValue
            },
    
            position:
            {
            up        : [0,-dist],
            down      : [0,dist],
            upleft    : [-dist,-dist],
            downleft  : [-dist,dist],
            upright   : [dist,-dist],
            downright : [dist,dist],
            left      : [-dist,0],
            right     : [dist,0]
            }
        };
        
        app.beginUndoGroup(callee.name)
    
        if(groupChecked)
        {
            layer.properties().forEach(function(prop){
            
            if(!prop.selected) return;
    
            prop.setValueOf("Transform/{0}".re(PROP), function(position){
                position.value += dirs[PROP][dir];
            }, t).setTemporalEaseAtKey("numKeys", [easeIn], [easeOut]);
            })
            return;
        }
    
        layer.setValueOf("Transform/{0}".re(PROP), function(position){
            position += dirs[PROP][dir];
        }, t).setTemporalEaseAtKey("numKeys", [easeIn], [easeOut])
    
    
        app.endUndoGroup();
    },
    
    getType: function()
    {
        var cns = this.constructor.name;

        switch (cns)
        {
            case "ShapeLayer":
            case "TextLayer":
            case "CameraLayer":
            case "LightLayer": return cns;

            case "AVLayer":
                if(this.source.constructor.name == "CompItem") return "Comp";
                if(this.nullLayer) return "Null";
                if(this.source.mainSource.constructor.name == "SolidSource") return "Solid";
                if(this.hasAudio && !this.hasVideo) return "Audio";
                if(this.hasVideo) return "Video";
        }
    },

    getMatrixOf: function(what)
    {
        var value = this.getProp("Transform/{0}".re(what)).value;

        switch(what) 
        {    
            case "Anchor Point":
                return Matrix.identity()
                
                .translate(value[0], value[1], -value[2]);
            
            case "Orientation":
                return Matrix.identity()
                
                .rotateZ(Math.degreesToRadians(value[2]))
                .rotateY(Math.degreesToRadians(-value[1]))
                .rotateX(Math.degreesToRadians(-value[0]));
            
            case "Position":
                return Matrix.getIdentity()
                
                .translate(value[0], value[1], -value[2]);
            
            case "Rotation":
                return Matrix.getIdentity()
        
                .rotateZ(Math.degreesToRadians(this.getProp("Transform/Z Rotation").value))
                .rotateY(Math.degreesToRadians(-this.getProp("Transform/Y Rotation").value))
                .rotateX(Math.degreesToRadians(-this.getProp("Transform/X Rotation").value))
            
            case "Scale":
                return Matrix.identity()

                .scale(value[0] /100, value[1] /100, value[2] /100)
            
            default: return Matrix.identity();
        }
    },

    getLocalMatrix: function()
    {   
        return Matrix.multiplyArrayOfMatrices([

            this.getMatrixOf("Scale"), // scale
            this.getMatrixOf("Rotation"), // rotation
            this.getMatrixOf("Orientation"), // orientation
            this.getMatrixOf("Position"), // position
        ]);
    },

    getWorldMatrix: function()
    {
        var worldMatrix = Matrix.identity(),
            layer       = this;

        while (parent = layer.parent)
        {
            worldMatrix = Matrix.multiplyArrayOfMatrices([
                
                worldMatrix,
                Matrix.invert(parent.getMatrixOf("Anchor Point")),
                parent.getLocalMatrix(),
            ]);
            layer = parent;
        }

        return worldMatrix;
    },

    getLookAt: function()
    {
        var anchorPoint = this.getProp("Transform/Anchor Point").value; anchorPoint[2] *= -1;
        var position    = this.getProp("Transform/Position").value; position[2] *= -1;

        return Matrix.lookAt(
            position,
            anchorPoint,
            [0, 1, 0]
        );
    },

    getModalMatrix: function(offset)
    {
        return Matrix.multiplyArrayOfMatrices([
            
            Matrix.identity().translate(offset), //offset vector
            this.getLocalMatrix(),
            this.getWorldMatrix()
        ]);
    },

    getModelViewProjection: function(modelMatrix)
    {
        var comp = this.containingComp;
        // Model-View-Projection
        return Matrix.multiplyArrayOfMatrices([
            
            modelMatrix, // model matrix
            comp.getViewMatrix().invert(), // view matrix
            comp.getProjectionMatrix() // projection matrix
        ]);
    },
    
    toComp: function(offset)
    {
        var x,y,z;

        var offset = !offset? [0,0,0]:
                        ((anch = this.getProp("Transform/Anchor Point").value, anch[2] *= -1, offset-=anch), 
                        offset);

        var modelMatrix = this.getModalMatrix(offset);

        if(!layer.threeDLayer) return (result = Matrix.getTranslate(modelMatrix), result.pop(), result)

        var mvp = this.getModelViewProjection(modelMatrix);
        var ndc = Matrix.getTranslate(mvp) / (w = mvp[15]);

        return [
            x = (ndc[0] + 1) * (this.containingComp.width  / 2),
            y = (ndc[1] + 1) * (this.containingComp.height / 2),
            z = comp.getActiveProjectedZ(w)
        ];
    },

    toWorld: function(offset)
    {
        // preprocess offset:
        var offset = !offset? [0,0,0]:
                        ((anch = this.getProp("Transform/Anchor Point").value, anch[2] *= -1, offset-=anch), 
                        offset);

        // translate modelMatrix:
        var result = Matrix.getTranslate(
            this.getModalMatrix(offset)
        );

        // if not 3d, pop z:
        return (!layer.threeDLayer? result.pop(): result[2] *= -1, result);
    }
})

ShapeLayer.prototype.xt(LayerExt);
CameraLayer.prototype.xt(LayerExt);
TextLayer.prototype.xt(LayerExt);
AVLayer.prototype.xt(LayerExt);
LightLayer.prototype.xt(LayerExt);