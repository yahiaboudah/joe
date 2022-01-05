from pyes.pyjsx import *
from pyes.file_interface import *

pp = "C:/Users/bouda/Desktop/myInterface.txt"


ff = FileInterface(intf_path = pp)
py = PYJSX()

res = PYJSX.execute_intf(ff.grab_proper())

ff.update('active_req/crop', res)