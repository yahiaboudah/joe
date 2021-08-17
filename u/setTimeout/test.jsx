

var setTimeout_Task_curfile = new File($.fileName),
setTimeout_Task_curfullname = decodeURI(setTimeout_Task_curfile.name),

setTimeout_Taskname = setTimeout_Task_curfullname.lastIndexOf(".") > 0 ? (setTimeout_Task_curfullname.substr(0,setTimeout_Task_curfullname.lastIndexOf("."))) : setTimeout_Task_curfullname,

setTimeout_Tasks = {},  

setTimeout_hasIdleTask = function(id) {
  var has = false, i;
  for (i = 0; i < app.idleTasks.length; i++) {
    //alert("id: " + id + " tid: " + app.idleTasks[i].label);
    if (app.idleTasks[i].isValid && (app.idleTasks[i].id === id)) {
      has = true;
      break;
    }
  }
  return has;
},

setTimeoutList = function() {
  var list = "", cb,
    k;
  for (k in setTimeout_Tasks) {
    if (list !== "") list += ",";
    cb = setTimeout_Tasks[k]["cb"].toString();
    cb = cb.replace(/\s/g,"");
    list += setTimeout_Tasks[k]["taskid"] + ":" + cb;
  }
  return list;
},


idleTasksList = function() {
  var list = "",
    k;
  for (k = 0; k < app.idleTasks.length; k++) {
    if (list !== "") list += ",";
    list += app.idleTasks[k].id + ":" + setTimeout_hasIdleTask(app.idleTasks[k].id) + ":" + app.idleTasks[k].label;
  }
  return list;
},


setTimeoutInit = function() {
  var it;

  for (it = 0; it < app.idleTasks.length; it++) {
    if (app.idleTasks[it].label == setTimeout_Taskname) {
      //alert("removing idleTask id " + app.idleTasks[it].id + " label: " + app.idleTasks[it].label);
      clearTimeout(app.idleTasks[it].id);
    }
  }
  setTimeout_Tasks = {};
},


setTimeoutHandler = function(taskid) {
  var now_Ticks = new Date().getTime(),
    cb, cb_retval = undefined;

  try {

    if (setTimeout_Tasks[taskid]["end_ticks"] > now_Ticks) {
      setTimeout_Tasks[taskid]["numcalls"] += 1;
      return false; // wait for next call
    }
  }
  catch(ex) {
    alert("Exception (1) in function 'setTimeoutHandler()', taskid " + taskid + ":\n" + ex);
  }

  try {
    cb = setTimeout_Tasks[taskid]["cb"];    // store the callback
    clearTimeout(taskid);   // remove the timeout
  }
  catch(ex) {
    alert("Exception (2) in function 'setTimeoutHandler()', taskid " + taskid + ":\n" + ex);
  }

  try {
    cb_retval = cb();   // call the cb
  } catch(ex) {
    alert("Exception in function '" + cb() + ":\n" + ex);
  }

  return false;
},


setTimeout = function(callback,timeout) {
  try {
    var idle_Task,
      now_Ticks = new Date().getTime();
    idle_Task = app.idleTasks.add({sleep:timeout});
    idle_Task.label = setTimeout_Taskname;
    setTimeout_Tasks[idle_Task.id] = {
      "label": setTimeout_Taskname,
      "start_ticks": now_Ticks,
      "sleep": timeout,
      "end_ticks": now_Ticks + timeout,
      "cb": callback,
      "taskid": idle_Task.id,
      "numcalls": 0
      };
    setTimeout_Tasks[idle_Task.id].handler = function(ev){setTimeoutHandler(setTimeout_Tasks[idle_Task.id]["taskid"]);};
    idle_Task.addEventListener(IdleEvent.ON_IDLE, setTimeout_Tasks[idle_Task.id].handler,false);

    return idle_Task.id;
  }
  catch(ex) {
    alert("Exception in function 'setTimeout()':\n" + ex);
  }
  return null;
},


clearTimeout = function (id){
  var i, task = null;
  for (i = 0; i < app.idleTasks.length; i++) {
    //alert("id: " + id + " tid: " + app.idleTasks[i].label);
    if ((app.idleTasks[i].id == id) && app.idleTasks[i].isValid) {
      task = app.idleTasks[i];
      break;
    }
  }

  if (task !== null) {
    try {
      if (setTimeout_Tasks[id] && setTimeout_Tasks[id].handler) {
        // this kills any!!!    app.idleTasks.itemByID(id).removeEventListener(IdleEvent.ON_IDLE, setTimeout_Tasks[id].handler,false);
        task.removeEventListener(IdleEvent.ON_IDLE, setTimeout_Tasks[id].handler,false);
      }
      // this kills any!!!    app.idleTasks.itemByID(id).remove();
      //task.remove();
      task.sleep = 0;
    }
    catch(ex) {
      alert("Exception in function 'clearTimeout() idleTasks':\n" + ex);
    }
    try {
      delete setTimeout_Tasks[id];
    }
    catch(ex) {
      alert("Exception in function 'clearTimeout() delete setTimeout_Tasks':\n" + ex);
    }
  }
};

setTimeoutInit();
// alert(setTimeout_Taskname);  // Just to check if the 'setTimeout_Taskname' was set correctly