

(function fString(){
    
    // format: "my name is {0} and my fname is {1}".f(name, fname);
    String.prototype.f = function() {

        var frmt = this,
            args = Array.prototype.slice.call(arguments),
            i  = -1;

        for (;++i < args.length;) 
        {
            frmt = frmt.replace(
                RegExp("\\{" + i + "\\}", 'gi'),
                args[i]
                );
        }

        return frmt;
    }

})();