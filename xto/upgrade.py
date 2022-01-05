
'''
Update version number and push to PyPi
'''
from runpy import run_path
from collections import OrderedDict
import subprocess as cmd

'''
TODO:
    take dist zip file, and unzip it inside site-packages!
'''

class PYJSX_Upgrader():

    _PP = 'C:/oi/joe/xto/pyes/'
    _VP = "{parent}/pyes/_version.py".format(parent= _PP)
    _version = run_path(_VP)['__version__']

    _commands = OrderedDict({

        "dist": OrderedDict({
            'make': 'python setup.py sdist',
            'remove': 'rd dist /s /q',
            'remove_egg': 'rd pyjsx.egg-info /s /q'
        }),

        "pypi": OrderedDict({
            'upload': 'twine upload dist/* --config-file twine.pypirc'
        }),
        
        "ppip": OrderedDict({
            'install_latest': 'pip install --force-reinstall --no-cache-dir pyjsx',
            'show': 'pip show pyjsx'
        }),

        "fold": OrderedDict({}) 
    })

    @classmethod
    def upgrade_version(self):

        ver = list((int(v) for v in self._version.split('.')))

        # c < 10
        if(ver[2]+1 < 10): ver[2] = ver[2]+1
        # c == 10
        elif(ver[2]+1 ==10): 
            ver[2] = 0
            ver[1] = ver[1]+1

        if(ver[1] ==10):
            ver[2] = ver[1] = 0
            ver[0] = ver[0]+1

        self._version = '.'.join(str(v) for v in ver)

    @classmethod
    def modify_file(self):
        with open(self._VP, 'w') as f:
            f.write("__version__ = \'{ver}\'".format(ver=self._version))
    
    @classmethod
    def upgrade(self):
        self.upgrade_version()
        self.modify_file()

    # @classmethod
    # def run_commands(self, timeout = 9):

    #     commands = OrderedDict({
    #         #pacakge and ship
    #         "dist": 'python setup.py sdist',
    #         #clean
    #         "rmds": 'rmdir dist /s /q',
    #         "rmin": 'rmdir pyjsx.egg-info /s /q',
    #         #sleep
    #         'wait': 'timeout {timeout}'.format(timeout = timeout),
    #         #reinstall
    #         # 'fpip': 'pip install --no-cache-dir --upgrade -vvv pyjsx=={v}'.format(v= self._version),
    #         # 'spip': 'pip show pyjsx'
    #     })
    #     cfg = {'shell': True, 'cwd': self._PP}

    #     for c in commands.values():
    #         cmd.call(c, **cfg)

if __name__ == '__main__':
    PYJSX_Upgrader.upgrade()
    PYJSX_Upgrader.run_commands()