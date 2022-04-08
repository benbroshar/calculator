
const wrapper = document.querySelector('.button-area');
const buttonArray = Array.from(document.querySelectorAll('.number, .not-number, .operator'));
buttonArray.forEach(element => element.addEventListener("click",buttonClick));

let displayValue = '';
let savedValue = '';
let operator = '';

wrapper.addEventListener('mousedown', (e) => {
  const isButton = e.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  lightup(e);
});

wrapper.addEventListener('mouseup', (e) => {
  const isButton = e.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  lightdown(e);
});

function lightup(e){
  targetButton = Array.from(e.target.classList);
  if(e.target.classList[1] == "number") {
    e.target.setAttribute('id','lightup-number')
  } else if(e.target.classList[1] == "not-number"){
    e.target.setAttribute('id','lightup-not-number')
  } else if(e.target.classList[1] == "operator"){
    e.target.setAttribute('id','lightup-operator')
  };
};

function lightdown(e){
  targetButton = Array.from(e.target.classList);
  if(e.target.classList[1] == "number") {
    e.target.removeAttribute('id','lightup-number')
  } else if(e.target.classList[1] == "not-number"){
    e.target.removeAttribute('id','lightup-not-number')
  } else if(e.target.classList[1] == "operator"){
    e.target.removeAttribute('id','lightup-operator')
  };
};

function appendAnswer(value){
  target = document.querySelector('.answer-area')
  target.textContent = displayValue
}


function buttonClick(e){
  const clicked = Array.from(e.target.classList)
  if(clicked[1] == "number"){
    if(displayValue == undefined){
      displayValue = "";
    }else if(displayValue == "ERROR"){
      displayValue = "";
    }
    displayValue += e.target.textContent;
    appendAnswer(displayValue);
  }else if(clicked[1] == "not-number"){
    if(clicked[0] == "clear"){
      displayValue = '';
      savedValue = '';
      appendAnswer(displayValue);
    }else if(clicked[0] == 'plusminus'){
      displayValue = displayValue * -1;
      appendAnswer(displayValue);
    }else if(clicked[0] == 'delete'){
      displayValue = displayValue.slice(0,displayValue.length - 1);
      appendAnswer(displayValue);
    }
  }else if(clicked[1] == "operator"){
    if (clicked[0] == "enter"){
      if(operator == ""){
        return
      }else if(savedValue == ""){
        return
      }else if(displayValue == ""){
        return
      }else{
        displayValue = operate(operator,savedValue,displayValue);
        if (displayValue == undefined){
          return
        } else{
          savedValue = '';
          appendAnswer(displayValue)
        }

      }
    }else{
      operator = Array.from(e.target.classList)[0]
      savedValue = displayValue;
      displayValue = '';
      appendAnswer(displayValue)
  };
  };
};





function add(a,b){
  a = parseInt(a)
  b = parseInt(b)
  return a+b;
};

function subtract(a,b){
  a = parseInt(a)
  b = parseInt(b)
  return a-b;
};

function multiply(a,b){
  a = parseInt(a)
  b = parseInt(b)
  return a*b;
};

function divide(a,b){
  if(b==0){
    displayValue = "ERROR"
    appendAnswer(displayValue)
    return
  }else{
    a = parseInt(a)
    b = parseInt(b)
    return (a/b);
  };
};

function operate(operator,a,b){
  if(operator == "add"){
    let c = add(a,b);
    return c
  }else if(operator == "subtract"){
    let c = subtract(a,b);
    return c
  }else if(operator == "multiply"){
    let c = multiply(a,b);
    return c
  }else if(operator == "divide"){
    let c = divide(a,b);
    c = c.toFixed(10);
    return c
  }
};
