
(function(h, s){
  
  h[s] = s;
  s.version = "1.0";

  s.getWindow = function()
  {
    return new _Window({

      type: "palette",
      title: "Shifter",
      resizeable: true,

      children: 
      [
        {
          type: "button",
          text: "⬅️",
          onClick: function(){
            
            var c = app.project.activeItem,
                n = this.window.properties.state.timeShift;
            
            c.time = (c.time <= n)?
                     0:
                     c.time + n;
          }
        },

        {
          type: "button",
          text: "🖊️ set",
          onClick: function(){
            this.window.properties.state.timeShift = $prompt("New timeshift value:", parseFloat);
          }
        },

        {
          type: "button",
          text: "➡️",
          onClick: function(){

            var c = app.project.activeItem,
                n = this.window.properties.state.timeShift;  
            
            var f = c.time + n;

            c.time = (f > c.duration)?
                     c.duration:
                     f;
          }
        }
      ]
    })
  }

})($.global, {toString: function(){return "MoveCursor"}});

if($.inside($.fileName)) MoveCursor.getWindow().show();