
$.global.Xester = function Xester(){}

// [EMJOIS]
Xester.xt({

    T: "✔️",
    F: "❌"
})

// [TESTING]
Xester.xt({
    
    test: function(H, tests)
    {
        for(t in tests) if(t.in(tests))
        {
            $.writeln("{0} {1}".re(tests[t].call(H)? Xester.T: Xester.F, t));
        }
    }
})