
'''
Update version number and push to PyPi
'''
import os, sys
from runpy import run_path
from collections import OrderedDict
import subprocess as cmd

'''
TODO:
    take dist zip file, and unzip it inside site-packages!
''' 

class PYJSX_Upgrader():

    def upgrade_version(version_arg):

        ver = list((int(v) for v in version_arg.split('.')))

        # c < 10
        if(ver[2]+1 < 10): ver[2] = ver[2]+1
        # c == 10
        elif(ver[2]+1 ==10): 
            ver[2] = 0
            ver[1] = ver[1]+1

        if(ver[1] ==10):
            ver[2] = ver[1] = 0
            ver[0] = ver[0]+1

        return '.'.join(str(v) for v in ver)

    _site_packages = "C:/dev/Python/lib/site-packages/" 
    _lib_path = "{0}pyes/".format(_site_packages)
    _PP = 'C:/oi/joe/xto/pyes/'
    _VP = "{parent}pyes/_version.py".format(parent= _PP)
    _pyv = '.'.join(sys.version.split(' ')[0].split('.')[0:1])
    _version = upgrade_version(run_path(_VP)['__version__'])

    _commands = OrderedDict({

        "fold": OrderedDict({
            'copy_dist_to_lib': 'copy dist\\pyjsx-{v}.tar.zip {p}'.format(
                p=_site_packages.replace('/', '\\'),
                v= _version
            ),

            "remove_eggs": 'for /d %i in ({sp}pyjsx-*-py?.*.egg-info) do rd %i /s /q'.format(
                sp= _site_packages.replace('/', '\\')
            ),

            "make_egg": 'mkdir {0}\\{1}'.format(
                _site_packages.replace('/', '\\'),
                'pyjsx-{v}-py{pyv}.egg-info'.format(
                    v= _version, pyv= _pyv
                )
            ),

            'unzip': ';'.join([
                #Change extension to zip
                #'powershell Rename-Item {sp}pyjsx-{v}.tar.gz pyjsx-{v}.tar.zip'
                #Unzip in pyjsx-0.0.0-tar-gz
                'powershell Expand-Archive {sp}pyjsx-{v}.tar.zip {sp}pyjsx-{v}-tar-zip\\',
                #Move dist and egg files
                'move {sp}pyjsx-{v}-tar-zip\\pyjsx-{v}\\pyes\\ {sp}',
                'powershell for /f %i in ({sp}pyjsx-{v}-tar-zip\\pyjsx-{v}\\pyjsx.egg-info\\) do move %i {sp}pyjsx-{v}-py{pyv}.egg-info\\',
                #Remove unzipped folder
                'Remove-Item -Force -Recurse {sp}pyjsx-{v}-tar-zip\\'
            ]).format(
                sp= _site_packages.replace('/', '\\'),
                v= _version,
                pyv= _pyv
            ),
        }),

        "dist": OrderedDict({
            'make': 'python setup.py sdist',
            'rename': 'powershell Rename-Item dist/pyjsx-{v}.tar.gz pyjsx-{v}.tar.zip'.format(v=_version),
            'remove': 'rd dist /s /q',
            'remove_egg': 'rd pyjsx.egg-info /s /q'
        }),

        "pypi": OrderedDict({
            'upload': 'twine upload dist/* --config-file twine.pypirc'
        }),
        
        "ppip": OrderedDict({
            'install_latest': 'pip install --force-reinstall --no-cache-dir pyjsx',
            'show': 'pip show pyjsx'
        })
    })

    @classmethod
    def modify_file(self):
        with open(self._VP, 'w') as f:
            f.write("__version__ = \'{ver}\'".format(ver=self._version))
    
    @classmethod
    def upgrade(self):
        self.modify_file()

    @classmethod
    def run_commands(self):
        C = self._commands
        cfg = {'shell': True, 'cwd': self._PP}
        
        cmd.call(C['dist']['make'], **cfg)
        cmd.call(C['dist']['rename'], **cfg)

        cmd.call(C['fold']['remove_eggs'], **cfg)
        cmd.call(C['fold']['make_egg'], **cfg)
        cmd.call(C['fold']['copy_dist_to_lib'], **cfg)
        cmd.call(C['fold']['unzip'], **cfg)

        cmd.call(C['dist']['remove'], **cfg)
        cmd.call(C['dist']['remove_egg'], **cfg)
        
if __name__ == '__main__':