class Calculator {
  constructor() {
    this.upperValue = document.querySelector('#upper-number');
    this.resultValue = document.querySelector('#result-number');
    this.reset = 0;
  }

  checkLastDigit(input, upperValue, reg) {
    if (!reg.test(input) && !reg.test(upperValue[upperValue.length - 1])) {
      return true;
    }
    return false;
  }

  clearValues() {
    this.upperValue.textContent = '0';
    this.resultValue.textContent = '0';
  }

  // operations methods
  sum(n1, n2) {
    return Number(n1) + Number(n2);
  }
  subtract(n1, n2) {
    return Number(n1) - Number(n2);
  }
  divide(n1, n2) {
    return Number(n1) / Number(n2);
  }
  multiply(n1, n2) {
    return Number(n1) * Number(n2);
  }

  //update values
  refreshValues(total) {
    this.upperValue.textContent = total;
    this.resultValue.textContent = total;
  }

  resolve() {
    // explode uma string em um array
    let upperValueArray = this.upperValue.textContent.split(' ');
    // resultado da operação
    let result = 0;

    for (let i = 0; i <= upperValueArray.length; i++) {
      let operation = 0;
      let actualItem = upperValueArray[i];

      // faz a multiplicação
      if (actualItem == 'x') {
        result = this.multiply(upperValueArray[i - 1], upperValueArray[i + 1]);
        operation = 1;
        // faz a divisão
      } else if (actualItem == '/') {
        result = this.divide(upperValueArray[i - 1], upperValueArray[i + 1]);
        operation = 1;
        // checa se o array ainda tem multiplicação e divisão a ser feita
      } else if (
        !upperValueArray.includes('x') &&
        !upperValueArray.includes('/')
      ) {
        // soma e subtração
        if (actualItem == '+') {
          result = this.sum(upperValueArray[i - 1], upperValueArray[i + 1]);
          // result  = 4
          operation = 1;
        } else if (actualItem == '-') {
          result = this.subtract(
            upperValueArray[i - 1],
            upperValueArray[i + 1]
          );
          operation = 1;
        }
      }

      // atualiza valores do array para proxima iteração
      if (operation) {
        // indice anterior no resultado da operação
        // ['4', '+', '2', '+', '2']
        upperValueArray[i - 1] = result;
        // remove os itens já utilizado para a operação
        // ['4', '+', '2']
        upperValueArray.splice(i, i + 1);
        // atualizar o valor do índice
        i = 0;
      }
    }

    if (result) {
      calc.reset = 1;
    }

    // atualizar os totais
    calc.refreshValues(result);
  }

  btnPress() {
    const reg = /^[0-9]*$/; // check if it only has numbers RegExp

    let input = this.textContent;
    let upperValue = calc.upperValue.textContent;

    // check if reset is true and clean the display
    if (calc.reset && reg.test(input)) {
      upperValue = '0';
    }

    // clean reset prop
    calc.reset = 0;

    //chack wether it is AC or not
    if (input === 'AC') {
      calc.clearValues();
    } else if (input === '=') {
      calc.resolve();
    } else {
      // check whether to add a number or not
      if (calc.checkLastDigit(input, upperValue, reg)) return;

      // add sapce between operations
      if (!reg.test(input)) {
        input = ` ${input} `;
      }

      // check if upperValue is zero or not
      if (upperValue === '0') {
        if (reg.test(input)) {
          calc.upperValue.textContent = input;
        } else {
          calc.upperValue.textContent += input;
        }
      } else {
        calc.upperValue.textContent += input;
      }
    }
  }
}

// start obj
let calc = new Calculator();

// start btns
let buttons = document.querySelectorAll('.btn');

buttons.forEach((button) => {
  button.addEventListener('click', calc.btnPress);
});
