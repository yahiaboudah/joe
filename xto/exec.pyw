
# imports:
#   json (data ser/deser)
#   sys  (path append)
#   os   (path operations)
import json, os, sys

# Utils for
#   file_name
class Utils():

    @classmethod
    def file_name(pp):
        return '.'.join(pp.split('/')[-1].split('.')[0:-1])

class dotdict(dict):
    __getattr__ = dict.get
    __setattr__ = dict.__setitem__
    __delattr__ = dict.__delitem__

class FileInterface():

    def __init__(self, intf_path):

        self.value = 
        self.path = intf_path
        self.update_self()

    def update_self(self):

        intf = self.grab_interface(self.path)
        if(not intf): raise ValueError("FileInterface:Constructor:Invalid Interface")
        self.value = intf
    
    def update_source(self):
        pass

    # static props:
    #   structure (FileInterface basic structure)
    intf_struct = {

        "MAJ": ('info', 'active_req'), # major
        "INF": ('contacts', 'requests_arch', 'requests_exec', 'requests_made'), # info
        "ACR": ('road', 'trac', 'seed', 'crop') # active request
    }

    @classmethod
    def validate_structure(self, oo):

        S = self.intf_struct
        if(
                all(k in oo               for k in S['MAJ'])
            and all(k in oo['info']       for k in S['INF'])
            and all(k in oo['active_req'] for k in S['ACR'])
        ): return True

        return False

    @classmethod
    def grab_interface(self, pp):
        
        if(not os.path.exists(pp)): return None
        
        with open(pp ,'r') as f:
            c = f.read()
        
        c = json.loads(c)
        if(not self.validate_structure(c)): return None

        return c
    
    @classmethod
    def grab_signal(self, pp):

        return '{dir_name}/executed_{intf_name}.tmp'.format(
                            dir_name  = os.path.dirname(pp),
                            intf_name = os.path.basename(pp)
                    )

    @classmethod
    def load_interfaces(self, user_name = "bouda"):

        loaded = []

        path = "C:/Users/{0}/AppData/Roaming/PYJSX/interfaces.json".format(user_name)
        with open(path, 'r') as f: 
            interfaces = json.loads(f.read())
        
        for i in interfaces:
            i = self.grab_interface(i)
            if(not i): continue
            loaded.append(i)

        return loaded

class PYJSX():

    @classmethod
    def jspy_args(self, ss):
        
        #boolean
        if(ss in ['true', 'false']): return ss.title()
        #string
        if(type(ss) is str):         return '"{0}"'.format(ss)
        
        #any
        return str(ss)
    
    @classmethod
    def process_intf(self, intf):

        pp = intf['active_req']['road']
        if(not os.path.exsits(pp)): raise ValueError("Python:PYJSX:process_intf: Invalid Road")

        return dotdict({

            path: pp,
            name: Utils.file_name(pp),
            func: intf['active_req']['trac'],
            args: ','.join(self.jspy_args(arg) for arg in args) 
        })
    
    @classmethod
    def execute_request(self, request):

        # append to sys path
        sys.path.append(os.path.dirname(request.path))

        n = request.name
        n_as = n.replace('.', '_')
        f = request.func
        a = request.args
        # execute and harvest
        try:
            exec('import {0} as {1}'.format(n, n_as))
            result = eval('{name_as}.{func}({args})'.format(
                        name_as = n_as,
                        func = f, args = a )
                    )

        except Exception as e:
            result = 'Python:PYJSX:execute_request:{err}'.format(err = str(e).replace('\'', '\\\''))
        
        return result



print(FileInterface.load_interfaces())

# def pyjsx_run():
        
#         intff['info']['reqs_exec'] = intff['info']['reqs_exec'] + 1
#         intff['active_req']['crop'] = result
        
#         # dump new interface with crop result
#         with open(intf_path, 'w', encoding='utf8') as f:
#             f.write(json.dumps(intff, indent =4))

#         # write signal file
#         with open(exec_signal, 'w') as ef: ef.write('')
    
#     return 0
# pyjsx_run()