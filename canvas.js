let canvas = document.getElementById("canvas"),
let Width = 1;
context = canvas.getContext("2d"),
mouse = { x:0, y:0 },
draw = false;

context.lineWidth = Width; // ширина 
context.strokeStyle = "black"; // цвет

canvas.addEventListener("mousedown", function(e){
    let ClientRect = this.getBoundingClientRect();
    mouse.x = e.clientX - ClientRect.left;
    mouse.y = e.clientY - ClientRect.top;
    draw = true;
    context.beginPath();
    context.moveTo(mouse.x, mouse.y);
});

canvas.addEventListener("mousemove", function(e){
    if(draw === true){
        let ClientRect = this.getBoundingClientRect();
        mouse.x = e.clientX - ClientRect.left;
        mouse.y = e.clientY - ClientRect.top;
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
    }
});

canvas.addEventListener("mouseup", function(e){
    let ClientRect = this.getBoundingClientRect();
    mouse.x = e.clientX - ClientRect.left;
    mouse.y = e.clientY - ClientRect.top;
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
    context.closePath();
    draw = false;
});
