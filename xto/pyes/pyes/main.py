from pyes.file_interface import *
from pyes.pyjsx import *

def run():
    ff = FileInterface(intf_path='C:/Users/bouda/Desktop/test.json')
    rr = PYJSX.execute_intf(ff.grab_proper())
    ff.update('active_req/crop', rr)
    ff.create_signal()

if __name__ == "__main__": run()