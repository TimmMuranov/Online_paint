const rabbish = document.getElementById("rabbish");
const pen = document.getElementById("pen");

pen.addEventListener('click', async () => {
  pen.style.backgroundColor = "red";
  rabbish.style.backgroundColor = "gray";
  let penSize = parseInt(prompt('Введите ширину ручки (1-20)'));
  if (!isNaN(penSize) && penSize > 0 && penSize <= 20) {
    alert('Ручка включена. Ширина ' + penSize);
    // Вызываем контекст из функции обратного вызова
    context.lineWidth = penSize;
    context.strokeStyle = "black";
  } else {
    context.lineWidth = 1;
    context.strokeStyle = "black";
    alert("Некорректный ввод. Ширина ручки по умолчанию 1");
  }
});

rabbish.addEventListener('click', async () => {
  pen.style.backgroundColor = "gray";
  rabbish.style.backgroundColor = "red";
  let rabbishSize = parseInt(prompt('Введите ширину ластика (1-100)'));
  if (!isNaN(rabbishSize) && rabbishSize > 0 && rabbishSize <= 100) {
    alert('Ластик включен. Ширина ' + rabbishSize);
    context.lineWidth = rabbishSize;
    context.strokeStyle = "white";
  } else {
    context.lineWidth = 10;
    context.strokeStyle = "white";
    alert("Некорректный ввод. Ширина ручки по умолчанию 10");
  }
});
