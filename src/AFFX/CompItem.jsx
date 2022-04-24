
CompItem

    [STATIC]
    ({
        __name__: "ATTRIBS",

        LAYER_TYPES: [ShapeLayer, TextLayer, LightLayer, CameraLayer, AVLayer],
        FILM_SIZE: 36,
        FOCAL_LENGTH: 50
    })

    [PROTO]
    ({
        __name__: "GETTERS&SETTERS",

        setResolution: function(newRes)
        {
            var rs = this.resolutionFactor;
            this.resolutionFactor = newRes;
            return rs;
        },

        getResolution: function()
        {
            return this.resolutionFactor;
        },
    
        deselect: function(i)
        {
            var k = -1;
            var S = this.selectedLayers;
            
            if(i == 'A') while(++k<S.length) S[k].selected = false;
            else  S[i].selected = false;
        },

        sel: function()
        //@@requires ["module.STATIC.LAYER_TYPES"]
        //@@requires ["PRIM.Array.FORS.forEach", "AFFX.LayerCollection.grab"]
        {
            var args = arguments.slice();

            var ss = this.selectedLayers;
            var os = [];

            args.forEach(function(arg)
            {
                if(is(arg, Number)) os.push(ss[arg]); //if (2) ==> comp.layer(2)

                if(arg.in(this.LAYER_TYPES)) // if(ShapeLayer) ==> comp shape layers!
                {
                    Array.prototype.push.apply(os, ss.grab(function(layer){
                        return is(layer, arg);
                    }));
                }
            })

            return os.length == 1?
                os[0]:
                os;
        },

        snap: function(t, pp)
        //@@requires ["AFFX.AECMD"]
        {
            t = is(t, Number)? t: this.time;

            app.executeCommand(AECMD("SAVE_AS_FRAME"));

            app.project.renderQueue.showWindow(false);
            var num = app.project.renderQueue.numItems;
            // app.project.renderQueue.item(num).outputModule(1).applyTemplate("SnapShotSettings");
            app.project.renderQueue.item(num).outputModule(1).file = File(pp || "~/Images/AESnap.png");
            app.project.renderQueue.render();
            app.project.renderQueue.showWindow(false);
        },

        getLayersWith: function(prop, val)
        //@@requires ["AFFX.LayerCollection.grab"]
        {
            if(is(val, undefined)) val = true;

            return this.layers.grab(function(layer){

                var oldVal = layer[prop]; 

                if(is(oldVal, undefined)) return false;
                if(is(oldVal, String) && is(val, RegExp)) return val.test(oldVal);
                
                return oldVal == val;
            })
        },

        setTime: function(t, all)
        //@@requires ["AFFX.LayerCollection.grab", "PRIM.Array.PROTO.FORS.forEach"]
        {
            if(!is(t, Number)) return this;

            all = is(all, undefined)? 1:all;
            
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

        workAreaDomain : function()
        {
            return {
                
                start: this.workAreaStart,
                end  : this.workAreaStart + this.workAreaDuration 
            }
        }                
    })

    [PROTO]
    ({
        __name__: "DROPPERS",

        drop: function(P, i) //Project, itemIndex
        {
            if(!(is(P, Project))) P = app.project;
            return this.layers.add(P.items[i + 1])
        },

        importAndDrop: function(FP, force, inv, i)
        //@@requires ["AFFX.Project.GETTERS.getItemsWith"]
        //@@requires ["AFFX.Data.File.PROTO.AE.importAE"]
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

    [PROTO]
    ({
        __name__: "MATRIX",

        getAOV: function()
        //@@requires ["MATH.AOV.getAOV"]
        {
            var aspect           = this.width / this.height,
                filmSizeVertical = CompItem.FILM_SIZE / aspect;
            
            return Math.getAOV(filmSizeVertical, CompItem.FOCAL_LENGTH);
        },

        getActiveAOV: function()
        //@@requires ["AFFX.Camera.MATRIX.getAOV"]
        {
            var cam = this.activeCamera;
            
            return (cam && cam.enabled)?
                cam.getAOV():
                this.getAOV();
        },

        getProjectedZ: function(w)
        //@@requires ["this.getZoom"]
        {
            var zoom = this.getZoom();
            return (z -(z/w))
        },

        getActiveProjectedZ: function(w)
        //@@requires ["AFFX.Camera.MATRIX.getProjectedZ"]
        //@@requires ["this.getProjectedZ"]
        {
            var cam = this.activeCamera;
            
            return (cam && cam.enabled)?
                cam.getProjectedZ():
                this.getProjectedZ();
        },

        getViewMatrix: function()
        //@@requires ["Math.M.STATIC.identity", "Math.M.PROTO.translate"]
        //@@requires ["this.getZoom"]
        {
            return Matrix.identity().translate(    
                this.width /2,
                this.height/2,
                this.getZoom()
            );
        },

        getZoom: function()
        //@@requires ["module.STATIC.FOCAL_LENGTH", "module.STATIC.FILM_SIZE"]
        {
            return this.width * CompItem.FOCAL_LENGTH / CompItem.FILM_SIZE;
        },

        getProjectionMatrix: function()
        //@@requires ["MATH.M.PROTO.perspective"]
        //@@requires ["this.getAOV"]
        {
            return Matrix.perspective(
                
                this.getAOV(), //angle of view
                this.width / this.height, //aspect
                0.1, //near
                10000 //far
            );
        },

        getActiveViewMatrix : function()
        //@@requires ["AFFX.Camera.PROTO.MATRIX.getViewMatrix", "this.getViewMatrix"]
        {
            var cam = this.activeCamera;
            
            return (cam && cam.enabled)?
                cam.getViewMatrix():
                this.getViewMatrix();
        }
    })