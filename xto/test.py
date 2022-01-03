

oo = {

    "info": {

        "contacts": [],
        "requests_arch": [],
        "requests_made": 0,
        "requests_exec": 0
    },

    "active_req":
    {
        "road": "",
        "trac": "",
        "seed": "",
        "crop": "",
        "someshit": ""
    }
}

intf_struct = {

    "MAJ": ('info', 'active_req'), # major
    "INF": ('contacts', 'requests_arch', 'requests_exec', 'requests_made'), # info
    "ACR": ('road', 'trac', 'seed', 'crop') # active request
}

if(
        all(k in oo               for k in intf_struct['MAJ'])
    and all(k in oo['info']       for k in intf_struct['INF'])
    and all(k in oo['active_req'] for k in intf_struct['ACR'])
): print('all good')

else: print('not good bruv')