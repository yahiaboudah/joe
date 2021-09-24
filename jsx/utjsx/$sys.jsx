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

})($.global, {toString: function(){return "sys"}})