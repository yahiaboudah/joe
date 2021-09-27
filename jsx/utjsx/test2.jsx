
var execStr    = [
    "def pyjsx_run():",
        
         //import py utils
    "    import json, sys, os",
        
        // intializing vars
    "    inst_path  = '$instPath/'",
    "    intf_path   =  (inst_path + 'PyIntf.pyintf')",
    "    exec_signal =  (inst_path + 'executed.tmp')",
    
         // pythonic args
    "    def strr(ss):",
    "        if(ss in ['true', 'false']): return ss.title()",
    "        if(type(ss) is str):         return '\\\"' + ss + '\\\"'",
    "        return str(ss)",
    
         // grab the interface:
    "    with open(intf_path, 'r') as f:",
    "        c= f.read()",
    "    if not c: return 'Python Error: interface corrupt'",

         // interface vars:
    "    intff = json.loads(c)",
    "    AR    = intff['active_req']",
    "    path  = AR   ['road']",
    "    func  = AR   ['trac']",
    "    name  = '.'.join(path.split('/')[-1].split('.')[0:-1])",
    "    args  = ','.join(strr(e) for e in AR['seed'])",
        
         // include script in sys paths
    "    sys.path.append(os.path.dirname(path))",
        
        // execute
    "    try:",
    "        exec('import ' + name + ' as s')",
    "        result = eval('s.' + func + '(' + args + ')')",
    "    except Exception as e:",
    "        result = 'Python Error: ' + str(e).replace('\\\'', '\\\\\\\'')",
         
         // store crop:
    "    intff['active_req']['crop'] = result",
    "    intff['info']['reqs_exec'] = intff['info']['reqs_exec'] + 1",
        
        // write result, and create temp signal file:
    "    with open(intf_path, 'w', encoding='utf8') as f:",
    "        f.write(json.dumps(intff, indent =4))",
    "    with open(exec_signal, 'w') as execf:",
    "        execf.write('')",
        
        // success: return(0)
    "    return 0",
    "pyjsx_run()"

    ].join("\\n");
