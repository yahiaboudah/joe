import shutil
import sys
py_version = '.'.join(sys.version.split(' ')[0].split('.')[0:1])

PP = {
    'xto_pyes': 'C:/oi/joe/xto/pyes/',
    'spk_pyes': 'C:/dev/Python/lib/site-packages/pyes/',
    'spk_eggs': 'C:/dev/Python/lib/site-packages/pyjsx-version-pyversion.egg-info/'
}

version_file = "{0}_version.py".format(PP['xto_pyes'])
new_version = upgrade_version()

def upgrade_version(v_file = version_file, modify_file= False):

        ver = list((int(v) for v in run_path(v_file)['__version__'].split('.')))

        # c < 10
        if(ver[2]+1 < 10): ver[2] = ver[2]+1
        # c == 10
        elif(ver[2]+1 ==10): 
            ver[2] = 0
            ver[1] = ver[1]+1

        if(ver[1] ==10):
            ver[2] = ver[1] = 0
            ver[0] = ver[0]+1

        new_version = '.'.join(str(v) for v in ver)
        if(not modify_file): return new_version

        with open(v_file, 'w') as f:
            f.write("__version__ = \'{ver}\'".format(ver=new_version))

def move_files_raw(
    xto_src= 'C:/oi/joe/xto/pyes/pyes',
    site_packages_dest= 'C:/dev/Python/lib/site-packages/pyes/'
    ):
    try:
        shutil.copytree(pp, sp, dirs_exist_ok=True)
    except Exception as e:
        print("Error is {0}".format(e))