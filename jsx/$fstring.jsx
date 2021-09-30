
(function(){

    // format: "my name is {0} and my fname is {1}".f(name, fname)
    String.prototype.f = function(){
        
        var fstr = this,
            args = Array.prototype.slice.call(arguments),
            i    = -1;

        while(++i <args.length)
        {
            fstr = fstr.replace( RegExp("\\{" + i + "\\}", "gi"),
                args[i]
            );
        }

        return fstr;
    }


})()