
;CompItem

    //ATTRIBS
    [STATIC]
    ({
        FILM_SIZE: 36,
        FOCAL_LENGTH: 50
    })

    //GETTERS
    [PROTO]
    ({
        __name__: "GETTERS",

        setResolution : function(newRes)
        {
            var rs = this.resolutionFactor;
            this.resolutionFactor = newRes;
            return rs;
        },

        getResolution : function()
        {
            return this.resolutionFactor;
        },
    
        deselect: function(i)
        {
            var k = -1;
            var S = this.selectedLayers;
            if(i == 'A'){
                while(++k<S.length) S[k].selected = false;
            }
            else{
                if(S[i].selected) S[i].selected =false;
            }
        },

        sel : function()
        {
            LAYER_TYPES = [ShapeLayer, Textlayer, LightLayer, CameraLayer, AVLayer];

            var args = Object.toArray(arguments);

            var ss = this.selectedLayers;
            var os = [];

            args.forEach(function(arg)
            {
                if(arg.is(Number)) os.push(ss[arg]); //if (2) ==> comp.layer(2)

                if(LAYER_TYPES.includes(arg)) // if(ShapeLayer) ==> comp shape layers!
                {
                    Array.prototype.push.apply(os, ss.grab(function(layer){
                        return layer.constructor == arg;
                    }));
                }
            })

            return os.length == 1?
                os[0]:
                os;
        },

        snap : function(t, pp)
        // snap(1.5, "~/Desktop/MySnaps/snapit.png") => A screenshot of compo at -1.5s-
        {

            t = t.is(Number)? t: this.time;

            app.executeCommand(AECMD.SAVE_AS_FRAME);

            app.project.renderQueue.showWindow(false);
            var num = app.project.renderQueue.numItems;
            // app.project.renderQueue.item(num).outputModule(1).applyTemplate("SnapShotSettings");
            app.project.renderQueue.item(num).outputModule(1).file = File(pp || "~/Images/AESnap.png");
            app.project.renderQueue.render();
            app.project.renderQueue.showWindow(false);
        },

        getLayersWith : function(prop, val)
        {
            if(is(val, undefined)) val = true;

            return this.layers.grab(function(layer)
            {
                var oldVal = layer[prop]; 

                if(oldVal.is(undefined)) return false;
                if(oldVal.is(String) && val.is(RegExp)) return val.test(oldVal);
                
                return oldVal == val;
            })
        },

        setTime : function(t, all)
        {
            if(t.isnt(Number)) return this;
            all  = all.is(undefined)? 1:all;
        
            //==============/
            this.duration = t;
            //==============/
        
            this.layers.grab().forEach(function(layer){
                
                var isLocked = layer.locked;
                layer.locked = false;
        
                //-----------------------------------------------------------
                layer.outPoint = t;
                if(all && layer.source.is(CompItem)) setTime(t, layer.source);
                //------------------------------------------------------------
        
                layer.locked = isLocked;
            })
            
            return this;
        },

        workAreaDomain : function(){
        
            return {
                
                start: this.workAreaStart,
                end  : this.workAreaStart + this.workAreaDuration 
            }
        }                
    })

    //DROPPERS
    [PROTO]
    ({
        __name__: "DROPPERS",

        drop: function(P, i) //Project, itemIndex
        {
            if(!(is(P, Project))) P = app.project;
            return this.layers.add(P.items[i + 1])
        },

        importAndDrop: function(FP, force, inv, i)
        {
            var F = File(FP),
                I = app.project.getItemsWith("name",function(name){return name == F.name;});

            // layer:
            var L = this.layers.add(

                (I.length && !force)?
                I[0]:
                F.importAE()
            );
            app.project.lastItem().selected = false;
            
            if(i) L.moveAfter(i);
            if(inv)
            {
                L.inPoint  = inv[0]; 
                L.outPoint = inv[1];
            }

            return L;
        }
    })

    //MATRIX
    [PROTO]
    ({
        __name__: "MATRIX",
        getAOV : function()
        {
            var aspect           = this.width / this.height,
                filmSizeVertical = CompItem.FILM_SIZE / aspect;
            
            return Math.getAOV(filmSizeVertical, CompItem.FOCAL_LENGTH);
        },

        getActiveAOV : function()
        {
            var cam = this.activeCamera;
            
            return (cam && cam.enabled)?
                cam.getAOV():
                this.getAOV();
        },

        getProjectedZ : function(w)
        {
            var zoom = this.getZoom();
            return (z -(z/w))
        },

        getActiveProjectedZ : function(w)
        {
            var cam = this.activeCamera;
            
            return (cam && cam.enabled)?
                cam.getProjectedZ():
                this.getProjectedZ();
        },

        getViewMatrix : function()
        {
            return Matrix.identity().translate(    
                this.width /2,
                this.height/2,
                this.getZoom()
            );
        },

        getZoom : function()
        {
            return this.width * CompItem.FOCAL_LENGTH / CompItem.FILM_SIZE;
        },

        getProjectionMatrix : function()
        {
            return Matrix.perspective(
                
                this.getAOV(), //angle of view
                this.width / this.height, //aspect
                0.1, //near
                10000 //far
            );
        },

        getActiveViewMatrix : function()
        {
            var cam = this.activeCamera;
            
            return (cam && cam.enabled)?
                cam.getViewMatrix():
                this.getViewMatrix();
        }
    })

// [PROPERTIES]
CompItem.xt({
    FILM_SIZE: 36,
    FOCAL_LENGTH: 50
})

// [GETTERS/SETTERS]
CompItem.prototype.xt({

    setResolution : function(newRes)
    {
        var rs = this.resolutionFactor;
        this.resolutionFactor = newRes;
        return rs;
    },

    getResolution : function()
    {
        return this.resolutionFactor;
    },

    deselect: function(i)
    {
        var k = -1;
        var S = this.selectedLayers;
        if(i == 'A'){
            while(++k<S.length) S[k].selected = false;
        }
        else{
            if(S[i].selected) S[i].selected =false;
        }
    },

    sel : function()
    {
        LAYER_TYPES = [ShapeLayer, Textlayer, LightLayer, CameraLayer, AVLayer];

        var args = Object.toArray(arguments);

        var ss = this.selectedLayers;
        var os = [];

        args.forEach(function(arg)
        {
            if(arg.is(Number)) os.push(ss[arg]); //if (2) ==> comp.layer(2)

            if(LAYER_TYPES.includes(arg)) // if(ShapeLayer) ==> comp shape layers!
            {
                Array.prototype.push.apply(os, ss.grab(function(layer){
                    return layer.constructor == arg;
                }));
            }
        })

        return os.length == 1?
            os[0]:
            os;
    },

    snap : function(t, pp)
    // snap(1.5, "~/Desktop/MySnaps/snapit.png") => A screenshot of compo at -1.5s-
    {

        t = t.is(Number)? t: this.time;

        app.executeCommand(AECMD.SAVE_AS_FRAME);

        app.project.renderQueue.showWindow(false);
        var num = app.project.renderQueue.numItems;
        // app.project.renderQueue.item(num).outputModule(1).applyTemplate("SnapShotSettings");
        app.project.renderQueue.item(num).outputModule(1).file = File(pp || "~/Images/AESnap.png");
        app.project.renderQueue.render();
        app.project.renderQueue.showWindow(false);
    },

    getLayersWith : function(prop, val)
    {
        if(is(val, undefined)) val = true;

        return this.layers.grab(function(layer)
        {
            var oldVal = layer[prop]; 

            if(oldVal.is(undefined)) return false;
            if(oldVal.is(String) && val.is(RegExp)) return val.test(oldVal);
            
            return oldVal == val;
        })
    },

    setTime : function(t, all)
    {
        if(t.isnt(Number)) return this;
        all  = all.is(undefined)? 1:all;
    
        //==============/
        this.duration = t;
        //==============/
    
        this.layers.grab().forEach(function(layer){
            
            var isLocked = layer.locked;
            layer.locked = false;
    
            //-----------------------------------------------------------
            layer.outPoint = t;
            if(all && layer.source.is(CompItem)) setTime(t, layer.source);
            //------------------------------------------------------------
    
            layer.locked = isLocked;
        })
        
        return this;
    },

    workAreaDomain : function(){
    
        return {
            
            start: this.workAreaStart,
            end  : this.workAreaStart + this.workAreaDuration 
        }
    },

})

// [DROP/ DROP AND IMPORT]
// REQUIRES (PROJECT, File.prototype.importAE)
CompItem.prototype.xt({

    drop : function(P, i) //Project, itemIndex
    {
        if(!(is(P, Project))) P = app.project;
        return this.layers.add(P.items[i + 1])
    },

    importAndDrop : function(FP, force, inv, i)
    {
        var F = File(FP),
            I = app.project.getItemsWith("name",function(name){return name == F.name;});

        // layer:
        var L = this.layers.add(

            (I.length && !force)?
            I[0]:
            F.importAE()
        );
        app.project.lastItem().selected = false;
        
        if(i) L.moveAfter(i);
        if(inv)
        {
            L.inPoint  = inv[0]; 
            L.outPoint = inv[1];
        }

        return L;
    }
})

// [MATRIX RELATED OPERATIONS]
CompItem.prototype.xt({
    
    getAOV : function()
    {
        var aspect           = this.width / this.height,
            filmSizeVertical = CompItem.FILM_SIZE / aspect;
        
        return Math.getAOV(filmSizeVertical, CompItem.FOCAL_LENGTH);
    },

    getActiveAOV : function()
    {
        var cam = this.activeCamera;
        
        return (cam && cam.enabled)?
            cam.getAOV():
            this.getAOV();
    },

    getProjectedZ : function(w)
    {
        var zoom = this.getZoom();
        return (z -(z/w))
    },

    getActiveProjectedZ : function(w)
    {
        var cam = this.activeCamera;
        
        return (cam && cam.enabled)?
            cam.getProjectedZ():
            this.getProjectedZ();
    },

    getViewMatrix : function()
    {
        return Matrix.identity().translate(    
            this.width /2,
            this.height/2,
            this.getZoom()
        );
    },

    getZoom : function()
    {
        return this.width * CompItem.FOCAL_LENGTH / CompItem.FILM_SIZE;
    },

    getProjectionMatrix : function()
    {
        return Matrix.perspective(
            
            this.getAOV(), //angle of view
            this.width / this.height, //aspect
            0.1, //near
            10000 //far
        );
    },

    getActiveViewMatrix : function()
    {
        var cam = this.activeCamera;
        
        return (cam && cam.enabled)?
            cam.getViewMatrix():
            this.getViewMatrix();
    }
})