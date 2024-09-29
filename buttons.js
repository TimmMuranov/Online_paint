const rabbish = document.getElementById("rabbish");
const pen = document.getElementById("pen");
var p = document.getElementById("p");//окно размера у ручки
var r = document.getElementById("r");//окно размера у ластика
p.value = 1;
r.value = 20;

pen.addEventListener('click', async () => {
  pen.style.backgroundColor = "red";
  rabbish.style.backgroundColor = "gray";
  context.lineWidth = p.value;
  context.strokeStyle = "black";
});

rabbish.addEventListener('click', async () => {
  pen.style.backgroundColor = "gray";
  rabbish.style.backgroundColor = "red";
  context.lineWidth = r.value;
  context.strokeStyle = "white";
});

function updateInput(){
  if(p.value < 0 || p.value > 20 || isNaN(p.value) || p.value === ''){
      p.value = 1;
      alert('Недопустимое значение ручки. Установлено значение по умолчанию (1).');
    }
  if(r.value < 0 || r.value > 100 || isNaN(r.value) || r.value === ''){
    r.value = 20;
    alert('Недопустимое значение ластика. Установлено значение по умолчанию (20).');
  }
  if(pen.style.backgroundColor === "red"){
    context.lineWidth = p.value;
  }
  else if(rabbish.style.backgroundColor === "red"){
    context.lineWidth = r.value;
  }
}
