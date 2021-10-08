/*******************************************************************************
    Name:           Utils
    Desc:           plotter utilties.
    Path:           utils.jsx
    Created:        2109 (YYMM)
    Modified:       2110 (YYMM)
*******************************************************************************/

//🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️
//                                                                                                  🛠️
(function LatexUtils(gg){

    gg._Window = function _Window(cfg){
        
        // $.log("win Cfg: " + cfg.toSource())

        var ww = new Window(cfg.type || "palette", cfg.title || "untitled");

        if(typeof cfg.banner != "undefined")
        {
            switch(cfg.banner.type)
            {
                case "ANIMATED":
                    Window.prototype.addAnimatedSequence.call(ww, cfg.banner.folder, cfg.banner.idx);
                    break;
                default: break;
            }
        };

        cfg.children.forEach(function(child){

            switch(child.type)
            {
                case "edittext":
                    
                    b = ww.add("edittext", undefined, child.text, {
                        multiline : child.multiline  || false,
                        borderless: child.borderless || false,
                        name: child.name
                    });
                    b.preferredSize = child.size;
                    break;

                case "button":
                    b = ww.add("button", undefined, child.text);
                    b.onClick = child.onClick.bind(b);
                    break;

                default:
                    break;
            }
        });

        return ww;
    };

    (function StrExtens(){

        String.prototype._replace = function(repCfg){
            
            var str = this;
            for(x in repCfg) if(repCfg.hasOwnProperty(x))
            {
                str = str.split(x).join(repCfg[x])
            }
            return str;
        }

    })();

    (function FuncExtens(){
        
        Function.prototype.bind = function(thisArg) 
        {
            var method = this;
            var args = Array.prototype.slice.call(arguments, 1);

            return function bound() {
                var _args = args.concat(Array.prototype.slice.call(arguments));
                if (!(this instanceof bound))
                    return method.apply(thisArg, _args);

                var __args = [];
                for (var i = 0, len = _args.length; i < len; i++)
                    __args.push('_args[' + i + ']');

                return eval('new method(' + __args.join(',') + ')');
            };
        }
        Function.prototype.body = function(){
            return this.toString()
            .replace(/^[^{]*\{[\s]*/,"    ")
            .replace(/\s*\}[^}]*$/,"")._replace(repConfig || {});
        }

    })();

    (function ArrExtens(){

        
        Array.prototype.forEach = function(callback, thisArg) {

            if (this == null) throw new TypeError('Array.prototype.forEach called on null or undefined');
            if (typeof callback !== "function") throw new TypeError(callback + ' is not a function');


            var T, k,
                O = Object(this);
                len = O.length >>> 0;
            if (arguments.length > 1) T = thisArg;
            k = 0;
            
            while (k < len) {

                    var kValue;
                    if (k in O) {
                        kValue = O[k];
                        callback.call(T, kValue, k, O);
                    }
                    k++;
            }


            return this;
        };

    })();
    
})($.global);
//                                                                                                         🛠️
//🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️