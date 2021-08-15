def pyjsx_run ():

    import json, sys, os

    inst_path   =  'C:/Users/me/Desktop/PYJSX/'
    intf_path   =  (inst_path + 'PyIntf.pyintf')
    exec_signal =  (inst_path + 'executed.tmp')

    # make args pythonic:
    def strr(ss):
        if(ss in ['true', 'false']): return ss.title()
        if(type(ss) is str):         return '\"' + ss + '\"'
        return str(ss)
    
    # read the intf file:
    with open(intf_path, 'r') as f:
        c= f.read()
    if not c: return 'Python Error: interface corrupt'

    
    intff = json.loads(c)
    AR    = intff['active_req']
    path  = AR   ['road']
    func  = AR   ['trac']
    name  = '.'.join(path.split('/')[-1].split('.')[0:-1])
    args  = ",".join(strr(e) for e in AR['seed'])

    # syspath edit:
    sys.path.append(os.path.dirname(path))

    # execute the function and get the result:
    try:
        exec('import ' + name + ' as s')
        result = eval("." + func + "(" + args + ")")
    except Exception as e:
        result = 'Python Error: ' + str(e).replace('\'', '\\\'')

    #store the result:
    intff['active_req']['crop'] = result
    intff['info']['requests_exec'] = intff['info']['requests_exec'] + 1

    with open(intf_path, 'w', encoding='utf8') as f:
        f.write(json.dumps(intff, indent =4))
    #make a temp exec file.
    with open(exec_signal, 'w') as execf:
        execf.write('')
    
    return 0

pyjsx_run()