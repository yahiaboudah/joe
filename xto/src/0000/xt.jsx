
delete(Object.prototype.xt);
Object.prototype.xt = function(oo)
{
    var T = this;

    if(T.constructor == Array)
    {
        var i = -1;
        while(++i < T.length) for(x in oo) if(oo.hasOwnProperty(x))
        {
            T[i][x] = oo[x];
        }
    }

    else for(x in oo) if(oo.hasOwnProperty(x)) this[x] = oo[x];

    return this;
}

