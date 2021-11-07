
(function(H,S){

    H[S] = S;

    S.load = function(what)
    {
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

    var TREE = {
        "myFunction": [
            "$.global.typeMonkey"
        ]
    }

    var FUNS = 
    {
        myFunction: (function(){

            $.global.typeMonkey = function()
            {
                $.writeln("monkey")
            }

        })
    }

})($.global, {toString: function(){return "fakeXto"}})