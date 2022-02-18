
Math.xt({
    
    degToRad : function(D)
    {
        return D * Math.PI / 180;
    },

    radToDeg : function(R)
    {
        return R * 180 / Math.PI;
    },

    mult : function()
    {    
        var A = arguments.slice(); 
        var i = A.length, k = 1;
        while(i--) k *= A[i];
    
        return k;
    }
})