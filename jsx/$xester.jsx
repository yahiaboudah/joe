/*******************************************************************************
		Name:           $xester
		Desc:           small unit testing utility for extendscript.
		Path:           $xester.jsx
		API:            test
		Created:        2109 (YYMM)
		Modified:       2109 (YYMM)
*******************************************************************************/

(function(H, SELF){
    
    H[SELF] = SELF;

    I =
    {
        T: "✔️",
        F: "❌"
    }

    SELF.test =  function(H, tests)
    {
        for(t in tests) if(tests.hasOwnProperty(t))
        {
            $.writeln("{0} {1}".f(tests[t].call(H)? I.T: I.F, t));
        }
    }

})($.global, {toString: function(){return "Xester"}});