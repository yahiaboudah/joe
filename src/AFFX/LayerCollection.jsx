
LayerCollection

    [PROTO]
    ({
        __name__: "GETTERS",

        containingComp: function()
        {
            var N = this.addShape();
            var C = N.containingComp;

            N.remove();
            delete(N);

            return C;
        },
    })

    [PROTO]
    ({
        __name__: "ADDERS",
        
        $add: function(what, cfg, args)
        {
            var CC = this.containingComp();
            var CONFIG = {
                
                "SHAPE": {},
                "TEXT": {text: "text"},
                "TEXTBOX": {width: 250, height: 250},
                "SOLID": 
                {
                    color: [21,21,21],
                    name: "solid",
                    width: CC.width,
                    height: CC.height,
                    pixelAspect: CC.aspectRatio,
                    duration: CC.duration,
                },

                "CAMERA": {name: "cam", centerPoint: [960, 540]},
                "LIGHT": {name: "light", centerPoint: [960, 540]},
                "NULL": {duration: CC.duration}
            };

            var T = this, F, V, L;
            if(F = T["add{0}".re(what.title())])
            {
                L = F.apply(T,
                    Object.values(Object.adapt(args, CONFIG[what.toUpperCase()], 0))
                );
            }

            if(!L) return 0;
            if(!cfg) return L;

            switch(what)
            {
                case "shape":
                    if(is(cfg.path, String))
                    {
                        L.content.addProperty("ADBE Vector Shape - Group").name = cfg.path;
                    }
                    break;

                case "Text":
                    if(is(cfg.fixSource, Function))
                    {
                        var src = L.Text.sourceText;
                        src.setValue(
                            cfg.fixSource(src.value.toString())
                        );
                    }
                    break;
                
                default: 
                    break;
            }

            if(is(cfg.name, String)) L.name = (cfg.name);

            if(is(cfg.fx, Array))
            {
                var fx = cfg.fx, i= -1;
                while(++i<fx.length)
                {
                    L.add("effect:{0}".re(fx[i]));
                }
            }

            return L;
        }
    })

    [PROTO]
    ({

        __name__: "MOBJ",
        
        axis: function(numDashes, text)
        {
            var C = this[0].containingComp,
                S = this.$add("Shape", {name: "Axis", fx: ["Axis"]}),
                
                L = S.add("content:group", {
                    name: "Line",
                    stroke: 4
                }); //Line G(roup)

            var LP = L.add("path"); // Line Path
            LP.expression = new Expression(function(){

                createPath(points = [
                                        [effect("Axis")("Start"), 0],
                                        [effect("Axis")("End")  , 0]
                                    ],
                            inTangents = [], outTangents = [],
                            is_closed = false)
            });

            // Now create the other dashes:
            var i = -1;
            while(++i<numDashes)
            {
                // Dash
                var D = S.addProp("Contents/ADBE Vector Group");
                D.name = "dash {0}".re(i);
                S.addProp("Contents/{0}/Contents/ADBE Vector Shape - Group".re(D.name));
                S.addProp("Contents/{0}/Contents/ADBE Vector Graphic - Stroke".re(D.name));

                S.getProp("Contents/{0}/Contents/Path 1/Path").expression = function()
                {
                    var FX = thisComp.layer("$SName").effect("Axis");
                    var start = FX("Start");
                    var space = FX("Space");
                    var end   = FX("End");
                    var dLength = FX("Axis")("Dash Length");
                    
                    var factor= 30;
                    var pos   = start + $i * space;
                    var dLen  = 0;

                    if(pos-end < -20) dLen = dashLen;
                    else
                    {
                        dLen = dLength * Math.exp(-Math.pow(end-pos, 2)/(2*factor*factor));
                    }

                    createPath(points = [[pos, -dLen/2], [pos, dLen/2]],
                                inTangents = [], outTangents = [], is_closed =false);

                }.body({
                    $SName: S.name,
                    $i: i
                });
                S.getProp("Contents/{0}/Contents/Stroke 1/Stroke Width").setValue(4);
            }

            var endValue = ((100*numDashes)-100)/2;
            S.getProp("Effects/Axis/Start").setValue(-endValue);
            S.getProp("Effects/Axis/End")  .setValue(endValue);

            if(!text) return;

            i = -1;
            while(++i<numDahses)
            {
                var TL = this.$add("text", {shy: true});

                // [EDIT TEXT LAYER PROPERTY EXPRESSIONS]

                // [SOURCE TEXT EXPRESSION]
                TL.sourceText.expression = function()
                {
                    var FX = thisComp.layer("$SName").effect("Axis");
                    var num = FX("Count") + $i * FX("Basis");

                    (Math.round(10*num)/10)
                }.body({$i:i})
                TL.name = TL.sourceText.value;
            
                //[ANCHOR POINT EXPRESSION]
                TL.transform.anchorPoint.expression = function()
                {
                    var S = sourceRectAtTime(time, false);
                    [S.width/2 + S.left, S.height/2 + S.top];
                }.body();
            
                // [TEXT POSITION EXPRESSION]
                TL.transform.position.expression = function()
                {
                    var LA = thisComp.layer("$SName");
                    var FX = LA.effect("Axis");
                    var SP = FX("Space");

                    var x = (thisComp.width/2) + $i * SP + FX("Start") + LA.transform.position[0] -960;
                    var y = LA.transform.position[1] + 55;

                    [x, u]

                }.body({$SName: S.name, $i:i})

                // [OPACITY EXPRESSION]
                TL.transform.opacity.expression = function()
                {
                    var FX = thisComp.layer("$SName").effect("Axis");
                    var PS = transform.position[0] - thisComp.width/2;

                    if(PS - FX("End") < -10) 100
                    else
                    {
                        100 * Math.exp(-Math.pow(FX("End")-PS, 1)/(2*30*30))
                    }
                }
            }
        },

        lineConnector: function(x0 ,y0 ,x1 ,y1)
        {
            var c = this[0].containingComp;
            
            var shape   = new makeShapeWithPath(c, 2 ,true);
            var path    = shape.content.property(MATCH_NAMES.PATH);
            var argName = Arguments.getArgs(callee);
            var args    = arguments;
            var expr    = ""; 
            
            var i = -1;
            while(++i<args.length)
            {
                A = arguments[i];
                N = argName[i];
            
                if(A.is(Array)) // if it's layers you want to connect:
                {
                arrRepCfg = 
                {
                    $argName: n,
                    $argLayer: a[0].name,
                    $argType: a[1]
                }
            
                expr += (function(){
                    
                    var $argName     = thisComp.layer("$argLayer").transform.position[$argType] - ($argType? 540 : 960);
                    var anch$argName = thisComp.layer("$argLayer").transform.anchorPoint[$argType];
            
                }).body()._replace(arrRepCfg)
                
                }
                else //if it's points you want to connect:
                {
                expr += (function(){
            
                    var $argName      = $argValue;
                    var anch$argName  = 0;
            
                }).body()._replace({$argName  : n, $argValue : a });
            
                }
            }
            
            // now make the path with createPath() with all the shit you made previously
            expr += (function(){
                
                createPath(
                points      = [[x0-anchx0,y0-anchy0],[x1-anchx1,y1-anchy1]],
                inTangents  = [], 
                outTangents = [], 
                is_closed   = true)
            
            }).body();
            
            // set the expression value, and zero the anchor point:
            path.path.expression = expr;
            shape.transform.anchorPoint.setValue(defVals.anchorPoint);
            
            // frick layer off:
            return layer;
        },

        point: function(c, radius)
        {
            radius = radius.is(Number)?radius:8;

            var stretch = radius / (kconst = 1.81066);
            const POINT_SHAPE = 
            {
            vertices    : [[-radius,0],[0,radius],[radius,0],[0,-radius]],
            inTangents  : [[0,-stretch],[-stretch,0],[0,stretch],[stretch,0]],
            outTangents : [[0,stretch],[stretch,0],[0,-stretch],[-stretch,0]],
            closed      : true
            };
        
            return c.layers.$add("shape", {name: c.newName(callee.name)},{
            groups:[
                {
                name: "point",
                path: new $Shape(POINT_SHAPE)
                }
            ],
            fill: {
                color: [1,1,1,1]
            }
            })
        },

        code: function(codeStr, syntax)
        {
            var style =
            {
                applyFill: true,
                fontSize : 50,
                font: "DejaVuSansMono",
                fillColor: [1,1,1],
                position: [200, 200]
            };
            
            for(i=-1;++i<syntax.length;)
            {
                var jj = syntax[i];
                var pointsEx = getExpression(getPoints(codeStr, RegExp(syntax.pattern), RegExp(syntax.replacepattern)));
                text.animator(jj.name).addExpressionSelector(pointsEx).getParent(3)
                                    .addTextFill(jj.color);
            }
            
            return text.config(style);
        },
        
        plot: function(
            /*str*/func/*="x"*/
            ,/*bool*/optimized/*=true*/
            ,/*float*/xbasis/*=100*/
            ,/*float*/ybasis/*=100*/
            ,/*float*/start/*=-10*/
            ,/*float*/end/*=10*/
            ,/*int*/step/*20*/
            ,/*float*/strokeWidth/*10*/
            ,/*arr*/colorValue/*white*/
            )
        {
        
            step = optimized?80:step;
            
            var shapeLayer = this.$add("shape"),
                path = shapeLayer.content.addProperty(MATCH_NAMES.PATH);
            
            var ln = Math.floor((((end-start)*xbasis)/step)+2),
                k  = (100/step) * 3,
                h  = 0.0000000001,
                ax = 10000;
            
            var vertices    = [],
            
                inTangents  = [],
                outTangents = [],
                efunc       = new Function("x","return " + func + ";");
            
            
            var x,y,xh,fh,f,y0;
            
            
            vertMaker: for(var i =-1;++i<ln;)
            {
                x = ((step * i) + start * xbasis);
                y = (-ybasis) * Math.round(ax*efunc(((step * i) + start* xbasis)/xbasis))/ax;
                
                if(!optimized) vertices.push([x,y]); continue vertMaker;
                
                xh = x + h * xbasis;
                fh = (ybasis/k) * efunc((x/xbasis)+h);
                f =  (ybasis/k) * efunc((x/xbasis));
                y0 = 100*(fh-f)/(xh-x);
            
                vertices.push([x,y])
                inTangents.push([-100/k,y0]);
                outTangents.push([100/k,-y0]);
            }
            
            path.path.setValue(new $Shape({
            
                vertices   : vertices,
                inTangents : inTangents,
                outTangents: outTangents,
                closed: false
            
            }).shape());
            
            shapeLayer.addStroke(strokeWidth);
            shapeLayer.name = func;

            return shapeLayer;
        },
    })