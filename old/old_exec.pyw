

def pyjsx_run():
    
    import json, sys, os
    
    def strr(ss):
        if(ss in ['true', 'false']): return ss.title()
        if(type(ss) is str):         return '"' + ss + '"'
        return str(ss)

    # load the interfaces array first:
    interfaces = "C:/Users/bouda/AppData/Roaming/PYJSX/interfaces.txt"
    with open(interfaces, 'w') as f:
        interfaces = json.loads(interfaces)

    for interf in interfaces:

        intf_path   = interf
        intf_name   = os.path.basename(interf)
        exec_signal = os.path.dirname(interf) + '/executed_{N}.tmp'.format(N = intf_name)


        with open(intf_path, 'r') as f: c = f.read()
        if not c: return 'Python Error: interface corrupt'
        
        intff = json.loads(c)
        AR    = intff['active_req']
        path  = AR   ['road']
        func  = AR   ['trac']
        
        name  = '.'.join(path.split('/')[-1].split('.')[0:-1])
        args  = ','.join(strr(e) for e in AR['seed'])
        sys.path.append(os.path.dirname(path))
        
        try:
            exec('import ' + name + ' as s')
            result = eval('s.' + func + '(' + args + ')')
            
        except Exception as e:
            result = 'Python Error: {e}'.format(str(e).replace('\'', '\\\'')) 
        
        intff['info']['reqs_exec'] = intff['info']['reqs_exec'] + 1
        intff['active_req']['crop'] = result
        
        # dump new interface with crop result
        with open(intf_path, 'w', encoding='utf8') as f:
            f.write(json.dumps(intff, indent =4))

        # write signal file
        with open(exec_signal, 'w') as ef: ef.write('')
    
    return 0
pyjsx_run()