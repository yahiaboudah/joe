
var  psEX = new ExternalObject("lib:" + "C:/Users/me/Desktop/BasicExternalObject.dll");

    $.writeln(psEX.getClipboard());
    $.writeln("-----------------------------");
    //Put data on clipboard
    psEX.setClipboard("This is put on the clipboard!");
    //Get data from clipboard
    $.writeln(psEX.getClipboard());
    //Clear clipboard
    // psEX.clearClipboard();
    // //system example
    // var task = psEX.systemCmd('tasklist').match(/Photoshop.exe/im);
    // if(task == null){
    // $.writeln("Photoshop is not running");
    // }else{
    //     $.writeln("Photoshop is running");
    //     }
