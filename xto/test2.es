

ra = /(?<![_$[:alnum:]])(?:(?<=\.\.\.)|(?<!\.))/g;
re = /for/g;


ro = /?=((\s+|(\s*\/\*([^\*]|(\*[^\/]))*\*\/\s*))await)?\s*(\/\*([^\*]|(\*[^\/]))*\*\/\s*)?(\()/g;

/*

structure of TML file:
    * begin
    * beginCaptures
    * end
    * endCaptures
    * patterns

*/

g = {
    x: "kinaze",
    y: "inazeknaze"
}

for(x in g) 
{
    $.writeln(x);
}

for each(y in g)
{
    $.writeln(y)
}