

w = new Window("palette", "shit");
image = w.add("image", undefined, "d:/ICONS/img/sova.png")
image.addEventListener("click", function(){
    image.image = "/d/ICONS/img/edit.png"
})
w.show();