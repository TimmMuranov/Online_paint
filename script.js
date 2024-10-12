const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let mode; // 'free' for free drawing, 'eraser' for eraser
let lastX = 0;
let lastY = 0;

const brushSizeInput = document.getElementById('brushSize');
const eraserSizeInput = document.getElementById('eraserSize');
const freeDrawBtn = document.getElementById('freeDrawBtn');
const eraserBtn = document.getElementById('eraserBtn');
const saveBut = document.getElementById("save");
const deleteBut = document.getElementById("delete");
const colorSet = document.getElementById("colorSet");

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

freeDrawBtn.addEventListener('click', () => {
    if(mode !== 'free'){
        freeDrawBtn.style = "background-color: red";
        eraserBtn.style = "background-color: gray";
        mode = 'free';
        setActiveButton(freeDrawBtn);
    }
    else{
        mode = '';
        freeDrawBtn.style = "background-color: gray";
    }
});
eraserBtn.addEventListener('click', () => {
        if(mode !== 'eraser'){
        freeDrawBtn.style = "background-color: gray";
        eraserBtn.style = "background-color: red";
        mode = 'eraser';
        setActiveButton(eraserBtn);
    }
    else{
        mode = '';
        eraserBtn.style = "background-color: gray";
    }
});

function startDrawing(e) {
    drawing = true;
    [lastX, lastY] = getCoordinates(e);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    const [x, y] = getCoordinates(e);
    const brushSize = mode === 'eraser' ? eraserSizeInput.value : brushSizeInput.value;

    ctx.lineWidth = mode === 'eraser' ? brushSize : brushSize;
    ctx.lineCap = 'round';

    if (mode === 'free') {
        ctx.strokeStyle = mainColors[colNum];
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else if(mode === 'eraser'){
        ctx.clearRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
    }
    lastX = x;
    lastY = y;
}

function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    return [x, y];
}

saveBut.addEventListener('click', () => {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    let name = "";
    name = prompt("Введите название вашего шедевра");
    if(name === ""){
        alert("Вы не ввели название.")
    }
    else if (name === null){
        alert("Ну ок. Отмена так отмена :)")
    }
    else{
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

deleteBut.addEventListener('click', () => {
    let sure = confirm("Вы точно хотите удалить ваш шедевр?");
    if(sure){window.location.reload();}
});

const mainColors = ["#000000", "#FF0000", "#008000", "#0000FF", "#FFFF00"];
let colNum = 0;

colorSet.style.backgroundColor = mainColors[colNum];
colorSet.style.color = "white";

colorSet.addEventListener('click', () => {
    if(colNum === 4){colNum = 0;}
    else{colNum++;}
    colorSet.style.backgroundColor = mainColors[colNum];
})
