(function(g, self){
    
    //@include "$fstring.jsx"

    g[self] = self;

    self.makeF = function(ss){
        return ss.f("thevalue");
    }


})($.global, {toString: function(){return "neuro"}});
