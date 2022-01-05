from pyes.pyjsx import *
from pyes.file_interface import *

pp = "C:/Users/bouda/Desktop/myInterface.txt"


ff = FileInterface(intf_path = pp)
py = PYJSX()

intf = ff.grab_proper()
req  = py.process_intf(intf)

res = py.execute_request(req)
ff.update('active_req/crop', res)