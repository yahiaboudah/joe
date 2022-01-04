
from pyes.pyjsx import *
from pyes.file_interface import *

# ff = FileInterface("C:/Users/bouda/Desktop/myInterface.json")
# ww = ff.value
# print(ww)

pp = "C:/Users/bouda/Desktop/extra/extraSon/myInterface2.json"
ff = FileInterface(intf_path = pp)

print(type([4,"aze", {"ww": "knaze"}]))

# pp = "C:/Users/bouda/Desktop/someshit.txt"
# print(Utils.file_name(pp))
# print(Utils.get_user())