
w = new _Window({
  
  title: "Shifter",
  resizeable: true,
  
  children: [
    new _Button({
      text: "<-",
      onClick: function(){
        if(c.time <= this.state.timeShift) c.time =0;
        else c.time = c.time + this.state.timeShift;
      }
    }),
    new _Button({
      text: "set",
      onClick: function(){
        this.state.timeShift = $prompt("Enter new timeshift value", parseFloat)
      }
    }),
    new _Button({
      text: "->",
      onClick: function(){
        fTime = c.time + this.state.timeShift;
        if(fTime > c.duration) c.time = c.duration;
        else c.time = fTime;
      }
    }),
  ]
})

w.show();
