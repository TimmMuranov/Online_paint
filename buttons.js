const buttons = document.querySelectorAll('button');
var rabbish_click = false;
var rabbish_size = 20;
let p_click = false;
buttons.forEach((button) => {
  if (button.getAttribute('id') === 'rabbish'){
    button.addEventListener('click', async () => {
      if (!rabbish_click) {
        rabbish_click = true;
        button.style.backgroundColor = "red";
        rabbish_size = prompt('Введите ширину ластика (1-100)');
        if(rabbish_size < 1 || rabbish_size > 100 || isNaN(rabbish_size)){
          rabbish_size = 3;
          alert("Ваше значение некорректно. Включено значение по уолчанию - 3");
        }
        else{
          alert('Ластик включен. Ширина - ' + rabbish_size);
        }
        context.strokeStyle = "white";
        context.lineWidth = rabbish_size;
      }
    else {
      rabbish_click = false;
      button.style.backgroundColor = "gray";
      context.strokeStyle = "black";
      context.lineWidth = 1;
    }
  });
}
  else if (button.getAttribute('id') === 'p'){
    button.addEventListener('click', async () => {
      if (!p_click) {
        p_click = true;
        button.style.backgroundColor = "red";
      }
      else {
        p_click = false;
        button.style.backgroundColor = "gray";
      }
    });
  }
});
