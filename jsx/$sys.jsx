/*******************************************************************************
        TODO:           ---
		Name:           $sys
		Desc:           system utilities.
		Path:           $sys.jsx
		API:            cmd
		Created:        2109 (YYMM)
		Modified:       2109 (YYMM)
*******************************************************************************/

(function systest(host, self){

    //@include "$file.jsx"
    //@include "$json.jsx"

    I = {
        T: "✔️",
        F: "❌",
        test: function(H, tests)
        {
            for(x in tests) if(tests.hasOwnProperty(x))
            {
                $.writeln("{0} {1}".f(tests[x].call(H)? this.T: this.F, x));
            }
        }
    }

    SYSTESTS = 
    {
        "should return python version": function()
        {
            var outp = this.cmd.call(null, "python --version");
            var cond = outp.split(" ")[0] == "Python";
            return cond;
        },

        "should add to problems list": function()
        {
            var outp = this.cmd.call(null, "pro \"new pp\"", 0);
            var fppp = File(Folder.desktop.fsName + "/pro.txt");
            var arrr = JSON.parse(fppp.$read());
            var cond = (arrr.pop() == "new pp");
            fppp.$write(JSON.stringifyy(arrr), 'w');

            return cond;
        }
    }

    host[self] = function(){
        I.test(host, SYSTESTS);
    };

})($.global.sys, "test")

sys.test();

(function $sys(host, self){

    //@include "$fstring.jsx"
    host[self] = self;

    self.cmd = function(myCommand, sp, sleep)
    {
        return system.callSystem((sp?"cmd /c \"{0}\"":"{0}").f(myCommand));
        if(typeof sleep == "number") $.sleep(sleep);
    }

    self.wget = function(folder, file, link){
        self.cmd( "cd {0} & wget -O {1} {2}".f(
                folder,
                file,
                link)
        )
    }

})($.global, {toString: function(){return "sys"}})


// Xester = {};

// Xester.currFunc = new Function();

// Xester.describe= function(fn, testo){
    
//     this.currFunc = fn;

//     for(test in testo) if(testo.hasOwnProperty(test))
//     {
//         testf = testo[test];
//         testf.call(this);        
//     }
// }

// Xester.expect = function(inputArr, cb){
    
//     if(typeof cb != "function") cb = function(x){return x};
    
//     return {
//         result: this.currFunc.apply(null, cb.apply(null, inputArr)),
//         toGive: function(whatGives){
//             return this.result == whatGives;
//         }
//     }

// }
