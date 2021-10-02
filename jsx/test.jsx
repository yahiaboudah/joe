

function test(){
    $.writeln("test");
}


if($.stack.split("\n")[0] != "[" + $.fileName.split("/").pop() + "]")
{
    test();
}