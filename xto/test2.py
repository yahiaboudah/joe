
from schema import Schema, Use, Optional
import json, os

listt = lambda c: c if (type(c) == list) else []
pintt = lambda n: n if (type(n) == int and n>0) else 0
pathh = lambda p: p if os.path.exists(p) else ""

ss = Schema({

    "info":
    {
        "contacts": Use(listt),
        "requests_arch": Use(listt),
        "requests_made": Use(pintt),
        "requests_exec": Use(pintt)
    },
    
    "active_req":
    {
        "road": Use(pathh),
        "trac": Use(str),
        "seed": Use(listt),
        "crop": Use(lambda s:s)
    }
}, ignore_extra_keys=True)

pp = "C:/Users/bouda/Desktop/extra/extraSon/myInterface2.json"
with open(pp, 'r') as f: cc = json.loads(f.read())
try: print(ss.validate(123))
except: print("nope")

# with open(pp, 'w') as f: json.dump(ss.validate(cc), f, indent=4)