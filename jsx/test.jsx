

function yes(myName){
    var pp = app.project.items;

    for(var i=1; i< pp.length; i++)
    {
      if(pp[i].name != myName) pp.splice(i);
    }

    return pp;
  }

aa = yes("shit");
for(var i=1; i<aa.length+1; i++)
{
    $.writeln(aa[i].name);
}