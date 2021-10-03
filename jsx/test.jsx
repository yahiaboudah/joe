

    Math.mult = function(){
        var args = Array.prototype.slice.call(arguments);
        
        var i = args.length, mm = 1;
        while(i--) mm *= args[i];

        return mm
    }

    $.writeln();