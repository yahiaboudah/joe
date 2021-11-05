
function codebox(c){

  c.layers.$add("text", {text: codeStr}, {
    
    style: 
    {
      size: 45,
      font: "DejaVuSansMono",
      color: [0,0,0],
      position: [ src.left+50,src.top+55 ],
    },
    parent: box
  });

  c.layers.$add("shape", {}, {

    groups: [
    // GROUPS
      {
        name: "rect",
        children: [
          {
            type: "rectangle",
            name: "myRect1",
            fill: {color: [1,1,1,1], param: 0}
          }
        ]
      }
    // GROUPS
    ]
    
  })
}