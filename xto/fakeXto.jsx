
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

    S.loaded = [];
    S.isLoaded = function(what)
    {
        return what.in(S.loaded);
    }

    S.load = function(what)
    {
        // Deal with DEP:
        var deps = TREE[what].DEPS, i=-1;

        for(;++i<deps.length;)
        {
            n = deps[i];
            if(!(f = FUNS[n]) || S.isLoaded(n)) continue;
            f.call($.global);
            S.loaded.push(n);
        }

        FUNS[what].call($.global);
    }

    S.unload = function(what)
    {
        var arr = TREE[what];
        if(!arr) return;
        for(var i=0; i<arr.length; i++)
        {
            eval([
                "delete(" + arr[i] + ")",
                arr[i] + "= null;"
            ].join(";"))
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