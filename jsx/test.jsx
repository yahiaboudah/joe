
(function(g, v){
    g["mine"] = v;
})($.global,{deep: 1});

(function(g, v){
    g["mine2"] = v;
})($.global.mine,{deep: 2});


$.writeln(mine.toSource())