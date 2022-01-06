
"""

Automatically:

    -> Move contents to Python/lib,
    -> Version up,
    -> Upload to PyPi with twine

"""

import shutil
import sys
from runpy import run_path
import subprocess as cmd
py_version = '.'.join(sys.version.split(' ')[0].split('.')[0:2])
PP = {
    'xto_pyes': 'C:/oi/joe/xto/pyes/',
    'spk': 'C:/dev/Python/lib/site-packages/',
    'spk_pyes': 'C:/dev/Python/lib/site-packages/pyes/',

    'pyes_ver': 'C:/oi/joe/xto/pyes/pyes/_version.py'
}

class PYJSX_Upgrader():
    
    _version = run_path(PP['pyes_ver'])['__version__']

    def __init__():
        pass

    @classmethod
    def run_setup(self, path= PP['xto_pyes'], typ='source'):
        if(typ not in ('build', 'source')): typ = 'source'
        cfg = {'shell': True, 'cwd': path}
        cmd.call('python setup.py {0}dist'.format(typ[0]), **cfg)

    @classmethod
    def upgrade_version(self, v_file = PP['pyes_ver'], modify_file= True):

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
            
            if(modify_file):
                with open(v_file, 'w') as f:
                    f.write("__version__ = \'{ver}\'".format(ver=self._version))

    @classmethod
    def push_local(
        self,
        xto_src= '{0}pyes'.format(PP['xto_pyes']),
        site_packages_dest= PP['spk_pyes']
        ):
        shutil.copytree(xto_src, site_packages_dest, dirs_exist_ok=True)

    @classmethod
    def push_pypi(self, path= PP['xto_pyes'], push_eggs=True, remove_eggs=True, remove_built=True):
        
        self.run_setup()
        cfg= {'shell': True, 'cwd': path}
        cmd.call('twine upload dist/* --config-file twine.pypirc', **cfg)

        if(remove_eggs):
            try:
                cmd.call('for /d %i in ({0}pyjsx-*) do rd %i /s /q'.format(
                    PP['spk'].replace('/', '\\')
                ), **cfg)
            except Exception as e:
                print("Error is: {0}".format(e))

        if(push_eggs):
            shutil.copytree(
            '{0}pyjsx.egg-info'.format(path),
            '{pp}pyjsx-{ver}-py{pyver}.egg-info'.format(
                pp = PP['spk'],
                ver= self._version,
                pyver= py_version
                )
            )

        if(remove_built):
            shutil.rmtree("{0}dist/".format(path))
            shutil.rmtree("{0}pyjsx.egg-info/".format(path))

def run():
    # PYJSX_Upgrader.upgrade_version()
    PYJSX_Upgrader.push_local()
    # PYJSX_Upgrader.push_pypi()

if __name__ == '__main__': run()