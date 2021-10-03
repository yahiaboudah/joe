
Array.prototype['+'] = function(/*operand*/v)
{

    if(!v.is("Array")) return;
    
    var i = this.length,
        j = v.length,
        r = this.concat(v.slice(i));
    
    if(i > j) i = j;
    while( i-- )
    {
        r[i] += v[i];
    }
    
    return r;
}

Array.prototype['-'] = function(/*operand*/v)
{

    if(!v.is("Array")) return;
    
    var i = this.length,
        j = v.length,
        r = this.concat(v.slice(i));
    
    if(i > j) i = j;
    while( i-- )
    {
        r[i] -= v[i];
    }
    
    return r;
}


Array.prototype['*'] = function(/*operand*/k)
{
    if(!k.is("Number")) return;
    
    var i = this.length,
        r = this.concat();
    
    while( i-- ) r[i] *= k;
    return r;
}
 
Array.prototype['/'] = function(/*operand*/k, /*reversed*/rev)
{
    return (k.is("Number") && !rev)?
           this * (1/k):
           undefined; 
}

gg = [2,3,5]

$.writeln(Number.prototype["+"].call(45, 5, false))

var a = [1,2, 3];
$.writeln(a - gg);