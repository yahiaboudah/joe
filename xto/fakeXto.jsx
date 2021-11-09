
(function(H,S){

    H[S] = S;

    BASC = (function(){

        Object.prototype.in = function(oo)
        {
            var k = this;
            if(typeof oo !== "array") return;

            for(;++i<oo.length;) if(oo[i] == k) return true;

            return false;
        }
    });

    //==================
    BASC.call($.global);
    //==================

    S.LOADED = 
    {
        asModule = [],
        asDepend = {}
    }

    S.isLoaded = function(what)
    {
        return what.in(S.loaded);
    }

    S.load = function(what)
    {
        S.LOADED.asModule.push(what);
        
        // Deal with DEP:
        var deps = TREE[what].DEPS, i=-1;
        for(;++i<deps.length;)
        {
            n = deps[i];
            // if FUNS[n] does not exist: continue:
            if(!FUNS[n]) continue;
            
            // if it's loaded, add parent to LOADED.asDepend[n] and continue:
            if(n.in(S.LOADED.asDepend))
            {
                S.LOADED.asDepend[n].push(what);
                continue;
            }
            //if it's not loaded: add it to S.LOADED.asDepend, and its parent:
            S.LOADED.asDepend[n] = [what];
            f.call($.global);
        }

        FUNS[what].call($.global);
    }

    S.unload = function(what)
    {
        S.LOADED[
            what.in(S.LOADED.asModule)?"asModule":
            what.in(S.LOADED.asDepend)?"asDepend": ($.err = "wtf?")
        ].remove(what);

        //===============
        //=== UNLOAD ====
        var arr = TREE[what].FUNS, i=-1;
        for(;++i<arr.length;)
        {
            eval([
                "delete(" + arr[i] + ")",
                arr[i] + "= null;"
            ].join(";"))
        }
        //================

        // UNLOAD DEPS:
        var parentArr = [];
        for(var k in S.LOADED.asDepend) if(k.in(S.LOADED.asDepend))
        {
            parentArr = S.LOADED.asDepend[k];
            if(what.in(parentArr))
            {
                parentArr = parentArr.remove(what);
                S.LOADED.asDepend[k] = parentArr;
                if(!parentArr.length) S.unload(k);
            }
        }
    }

    var TREE = 
    {
        animals:
        {
            DEPS: ["monkey", "giraffe", "elephant"],
            FUNS: [
                "$.global.callAnimal"
            ]
        },

        monkey:[
            "monkeyName"
        ],

        giraffe: [
            "giraffeNoise"
        ],

        elephant: [
            "indianElephant"
        ]
    }

    var FUNS = 
    {
        animals: (function(){
            
            /**
             * DEP: [monkey, giraffe, elephant]
             */

            $.global.callAnimal = function(name)
            {
                switch (name) {
                    case "monkey":
                        $.writeln(monkeyName())
                        break;
                
                    case "giraffe":
                        $.writeln(giraffeNoise());
                        break;

                    case "elephant":
                        $.writeln(indianElephant());
                        break;

                    default:
                        $.writeln("UNICORN DOESN't EXIST!")
                        break;
                }
            }

        }),

        monkey: (function(){

            $.global.monkeyName = function()
            {
                return "MONKEY!";
            }

        }),

        giraffe: (function(){
            $.global.giraffeNoise = function()
            {
                return "GIRAFFE!"
            }
        }),

        elephant: (function(){

            $.global.indianElephant = function()
            {
                return "INDIAN ELEPHANT!"
            }
        })
    }

})($.global, {toString: function(){return "fakeXto"}})

fakeXto.load("animals");

callAnimal("elephant");