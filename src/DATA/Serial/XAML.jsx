
;eval(MODULE.re("$.global", "XAML", "process"))

    [STATIC]
    ({
        __name__: "PROCESSORS",
        
        process: function process(file)
        {
            var A = [], address = [];
        
            var lineProcessor = function(lvl, str)
            {
                if(!str) return;
        
                var evalStr = "A", i = -1, iLvl = lvl;
                while(++i<lvl) evalStr += ("[" + address[i] + "].branches");
                evalStr += ".push({name: \"" + str + "\", branches:[]})";
                
                eval(evalStr);
        
                //Increment address
                if(address[lvl] === undefined) address.push(0);
                else address[lvl] = address[lvl]+1;
        
                //Reset all next addresses
                while(++iLvl<address.length) address[iLvl] = -1;
            }
        
            file.open('r');
            while(!file.eof) lineProcessor(padding(line = file.readln())/4, trim(line))
        
            return A;
        } 
    })