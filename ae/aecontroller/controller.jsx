
//@include "lib.jsx"

function _Panel(cfg){

  this.tmpwin = new Window("palette");
  this.panel  = this.tmpwin.add("panel");
  this.panel.bounds = cfg.bounds || undefined;
  this.panel.text = cfg.text || undefined;

}
function _Window(cfg){
  
  this.win = new Window(
    cfg.type   || "palette",
    cfg.title  || "Untitled",
    cfg.bounds || undefined,
    {
      resizeable: typeof cfg.resizeable == "undefined"? false: cfg.resizeable
    }
  );

}
globalState = {
  distanceValue: 100,
  scaleFactorValue: 50,
  opacityFactorValue: 20,
  cursorSpacingValue: 2,
  easeIn: new KeyframeEase(0,75),
  easeOut: new KeyframeEase(0,75),
}

w = new _Window({
  type: "palette",
  title: "Controller",
  bounds: [0, 0, 450, 375],
  resizeable: false,
  children: [
    positionPanel,
    scalePanel,
    opacityPanel,
    cursorPanel
  ]
})

positionPanel = new _Panel({
  title: "Position",
  // layout: new GridLayout(),
  children: [
    new _Button({
      text: "distanceButton",
      onClick: function()
      {
        var newVal = prompt("Enter a new distance value: ");
        globalState["distanceValue"] = eval(newVal);
      }
    }),
    new _Button({
      text: "↑",
      onClick: moveIt.bind({dir: "up"})
    }),
    new _Button({
      text: "↓",
      onClick : moveIt.bind({dir: "down"})
    }),
    new _Button({
      text: "←",
      onClick: moveIt.bind({dir: "left"})
    }),
    new _Button({
      text: "→",
      onClick: moveIt.bind({dir: "right"})
    }),
    new _Button("."),
    new _Button({
      text: "←↑",
      onClick: moveIt.bind({dir: "topleft"})
    }),
    new _Button({
      text: "↑→",
      onClick: moveIt.bind({dir: "topright"})
    }),
    new _Button({
      text: "←↓",
      onClick: moveIt.bind({dir: "bottomleft"})
    }),
    new _Button({
      text: "↓→",
      onClick: moveIt.bind({dir: "bottomright"})
    }),
    new _Button({
      text: "KF IT!",
      onClick: kfit.bind({prop: "Position"})
    }),
    new _CheckBox({
      text: "group",
      value: 0
    })

  ]
})

scalePanel = new _Panel({
  title: "Scale",
  children: [
    new _Button({
      text: "ScaleFactor",
      onClick: function()
      {
        newVal = prompt("Enter the new scale value");
        globalState["scaleFactor"] = eval(newVal);
      }
    }),
    new _Button({
      text: "+",
      onClick: scaleIt.bind({dir: "up"})
    }),
    new _Button({
      text: "-",
      onClick: scaleIt.bind({dir: "down"})
    }),
    new _Button({
      text: "KF IT!",
      onClick: kfit.bind({prop: "Scale"})
    }),
    new _CheckBox({
      text: "group",
      value: 0
    }),
    new _Button({
      text: "Bong It!",
      onClick: bongit
    }),
    new _CheckBox({
      text: "Color Bong?",
      value: 0
    }),
  ]
});

opacityPanel = new _Panel({
  title: "Opacity",
  children: [
    new _Button({
      text: "OpacityFactor"
    }),
    new _Button({
      text: "+"
    }),
    new _Button({
      text: "-"
    }),
    new _Button({
      text: "KF IT!"
    }),
    new _CheckBox({
      text: "group",
      value: 0
    }),
    new _Button({
      text: "Show It!"
    }),
    new _Button({
      text: "Hide It!"
    })
  ]
})

cursorPanel = new _Panel({
  title: "Cursor",
  children: [
    new _Button({
      text: "spacingSize"
    }),
    new _Button({
      text: "→"
    }),
    new _Button({
      text: "←"
    })
  ]
})

w.show();
