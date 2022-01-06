
import shutil
pp = 'C:/oi/joe/xto/pyes/pyes'
sp = 'C:/Users/bouda/Desktop/dev/Python/lib/site-packages/pyes/'

try:
    shutil.copytree(pp, sp, dirs_exist_ok=True)
except Exception as e:
    print("Error is {0}".format(e))