/*******************************************************************************
		Name:           $string
		Desc:           String polyfills.
		Path:           /utils/$string.jsx
		Require:        Array: indexOf, Object: Object.newKeys, File:$read
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            inspectFF, startsWith, repeat, padding, checkFF, replaceSeq,
                        capFirst, jump.
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
//@include "$array.jsx"
/******************************************************************************/

(function StringExtens(){
    
    String.prototype.inspectFF = function() {

        var inspection = {},
            parts = this.split('/'),
            lastPart = parts.pop(),
            numParts = parts.length,
            fStr0 = this[0],
            fStr1 = this[1];
    
        inspection.folderDepth = numParts;
        inspection.drive = (fStr1 == ':') ? fStr0 : null;
        inspection.isFile = false;
        inspection.isFolder = false;
        inspection.extension = "";
    
        /**
         * if last part contains a dot: file
         * if not: check numParts: if 0: invalid path string
         * if numParts > 0: folder
         */
    
        if (lastPart.indexOf('.') > -1) 
                Object.newKeys(inspection,["valid", "isFile", "isFolder","extension"],
                                          [true,true,false,lastPart.split('.').pop()]);
    
        else Object.newKeys(inspection, ["valid", "isFolder"], [!!numParts, !!numParts]);
    
    
        return inspection;
    }
    String.prototype.startsWith = function(search, rawPos) {
    
        var pos = rawPos > 0 ? rawPos | 0 : 0;
        
        return this.substring(pos, pos + search.length) === search;
    }
    String.prototype.repeat = function(n) {
        
        var rep = this.toString(),
            str = "",
            c   = 0;
        
        while ((c < n) && ++c) str += rep;
    
        return str;
    }
    String.prototype.padding = function() {
        var pad = /^\s*/;
    
        pad.exec(this);
        
        return pad.lastIndex;
    }
    String.prototype.checkFF = function() {
    
        var ff = Folder(this);
    
        if (!ff.exists) return 0;
        return (ff.constructor == File)? 1: -1;
    }
    String.prototype.replaceSeq = function(specialChar/*, str1, str2..*/) {
    
        startIdx = 1;
        if (typeof specialChar == "undefined"){
            specialChar = '@';
            startIdx    =  0;  
        }
    
        var thiss = this, 
            args  = Array.prototype.slice.call(arguments, startIdx),
            patt  = new RegExp(specialChar),    
            i     = 0;
        
        while (thiss.search(patt) != -1) thiss = thiss.replace(patt, args[i++] || specialChar);
    
    
        return thiss;
    }
    String.prototype.title = function() {
        return this[0].toUpperCase() + this.slice(1);
    }
    String.prototype.f = function() {
        
        var frmt = this,
            args = Array.prototype.slice.call(arguments),
            i    = -1;
    
        for (;++i < args.length;) 
        {
            frmt = frmt.replace(
                RegExp("\\{" + i + "\\}", 'gi'),
                args[i]
                );
        }
    
        return frmt;
    }
    String.prototype.trim = function(){
        return this.replace(/^\s*/,"").replace(/\s*$/,"");
    }
    String.prototype._replace = function(repCfg){
        
        var str = this;
        for(x in repCfg) if(repCfg.hasOwnProperty(x))
        {
            str = str.split(x).join(repCfg[x])
        }
        return str;
    }
    String.prototype["*"] = function(op, joinChar)
    {
        if(!$.global.strr)
        {
            $.global.strr = function(s){return new String(s)};
        }
    
        var str = this, fstr = [fstr];
        if(isNaN(op = Math.floor(op))) return str;
        
        while(op--) fstr.push(str);
        return fstr.join(joinChar); 
    }
    String.prototype.pushAt = function(atIndex, pushChar, delet, numDelete) {
        
        delet     = (typeof delet == "undefined")? 1: delet;
        numDelete = (typeof delet == "undefined")? 1: numDelete;
        
        first = this.substring(0, atIndex);
        last  = this.substring(delet? (atIndex+numDelete): atIndex);
    
        return first + pushChar + last;
    }
    String.prototype.fstr = function()
    {
        arra = Array.prototype.slice.call(arguments);
        s    = this.toString();
        patt = /&/g;
        
        while(!!patt.exec(s))
        {
          li = patt.lastIndex -1;
          no = s[li+1];
          if(isNaN(no)) continue;
          s = s.pushAt(li, arra[no-1], 1, 2);
        }
    
        return s;
    }

})();