/*******************************************************************************
        TODO:           ---
		Name:           $sys
		Desc:           system utilities.
		Path:           $sys.jsx
		API:            cmd
		Created:        2109 (YYMM)
		Modified:       2110 (YYMM)
*******************************************************************************/
// 💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻
//                                 SYS                                                  💻
(function(host, self){

    //@include "$fstring.jsx"
    host[self] = self;

    self.cmd = function(myCommand, sp, sleep)
    {
        var oo = system.callSystem((sp?"cmd /c \"{0}\"":"{0}").f(myCommand));
        if(typeof sleep == "number") $.sleep(sleep);
        return oo;
    }

    self.wget = function(file, link)
    {
        var folder = Folder(File(file).path).fsName.replace(/\\/gi, "/");
        file = file.replace(/\\/gi, "/");

        self.cmd("cd {0} & wget -O {1} {2}".f(
                folder,
                file,
                link
        ));
    }

})($.global, {toString: function(){return "sys"}}); $.sleep(0);
//                                                                                       💻
//💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻
//=========================================================================================
// 🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪
//                                      UNIT TEST                                         🧪
(function(host, self){

    //@include "$file.jsx"
    //@include "$json.jsx"
    //@include "$xester.jsx"

    host[self] = function()
    {
        Xester.test(host,
        {
            "should return python version": function()
            {
                var outp = this.cmd.call(null, "python --version");
                var cond = outp.split(" ")[0] == "Python";
                return cond;
            },
    
            "should add to problems list": function()
            {
                var outp = this.cmd.call(null, "pro \"new pp\"", 0);
                var fppp = File(Folder.desktop.fsName + "/pro.txt");
                var arrr = JSON.parse(fppp.$read());
                var cond = (arrr.pop() == "new pp");
                fppp.$write(JSON.stringifyy(arrr), 'w');
    
                return cond;
            }
        });
    };

})($.global.sys, "test")
//                                                                                       🧪
//🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪🧪

if($.stack.split("\n")[0] == "[" + $.fileName.split("/").pop() + "]")
{
    sys.test();
}