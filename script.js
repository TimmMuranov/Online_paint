const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let mode = 'free'; // 'free' for free drawing, 'straight' for straight lines, 'eraser' for eraser
let lastX = 0;
let lastY = 0;

const brushSizeInput = document.getElementById('brushSize');
const eraserSizeInput = document.getElementById('eraserSize');
const freeDrawBtn = document.getElementById('freeDrawBtn');
const eraserBtn = document.getElementById('eraserBtn');

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

freeDrawBtn.addEventListener('click', () => {
    freeDrawBtn.style = "background-color: red";
    eraserBtn.style = "background-color: gray";
    mode = 'free';
    setActiveButton(freeDrawBtn);
});
eraserBtn.addEventListener('click', () => {
    freeDrawBtn.style = "background-color: gray";
    eraserBtn.style = "background-color: red";
    mode = 'eraser';
    setActiveButton(eraserBtn);
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
        ctx.strokeStyle = 'black';
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else if (mode === 'straight') {
        ctx.strokeStyle = 'black';
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Удаляем рисунок для рисования прямой
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
    } else if (mode === 'eraser') {
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
