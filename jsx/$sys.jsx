/*******************************************************************************
        TODO:           ---
		Name:           $sys
		Desc:           system utilities.
		Path:           $sys.jsx
		API:            cmd
		Created:        2109 (YYMM)
		Modified:       2109 (YYMM)
*******************************************************************************/

(function sys(host, self){

    //@include "$fstring.jsx"
    host[self] = self;

    self.cmd = function(myCommand, sp)
    {
        return system.callSystem((sp?"cmd /c \"{0}\"":"{0}").f(myCommand));
    }

    self.wget = function(folder, file, link){
        self.cmd( "cd {0} & wget -O {1} {2}".f(
                folder,
                file,
                link)
        )
    }

})($.global, {toString: function(){return "sys"}})


var Xester = 
{
    currFunc: function(){},

    describe: function(fn, testo){
        
        this.currFunc = fn;

        for(test in testo) if(testo.hasOwnProperty(test))
        {
            testf = testo[test];
            testf.call(this);        
        }
    },

    expect: function(input, cb){
        
        if(typeof cb != "function") cb = function(x){return x};
        input  = cb.apply(null, inputArr);
        result = this.currFunc.apply(null, inputArr);
        
        return {
            result: result,
            toGive: function(whatGives){
                return this.result == whatGives;
            }
        }

    }
}

(function systest(host, self, T){

    host.test = function(write)
    {
        if(typeof write == "undefined") write = true;
    }

    T.describe(host.cmd, {
    
        "should return python version": function(){with(this){
            
            $.global.myGlobalShit = expect(["python --version"]).toGive("Python 3.9.6");
        }},
    });

})($.global.sys, {toString: function(){return "test"}}, Xester)


sys.test();
$.writeln($.global.myGlobalShit)