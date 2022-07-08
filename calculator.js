const CALCULATOR_CONFIG = {
    1: { type: 'number', value: 1, title: '1', className: 'button' },
    2: { type: 'number', value: 2, title: '2', className: 'button' },
    3: { type: 'number', value: 3, title: '3', className: 'button' },
    4: { type: 'number', value: 4, title: '4', className: 'button' },
    5: { type: 'number', value: 5, title: '5', className: 'button' },
    6: { type: 'number', value: 6, title: '6', className: 'button' },
    7: { type: 'number', value: 7, title: '7', className: 'button' },
    8: { type: 'number', value: 8, title: '8', className: 'button' },
    9: { type: 'number', value: 9, title: '9', className: 'button' },
    0: { type: 'number', value: 0, title: '0', className: 'button' },
    '.': { type: 'number', value: '.', title: '.', className: 'button' },
    changeModule: { type: 'changeModule', value: 'changeModule', title: '+/-', className: 'button' },
    
    multiply: { 
        type: 'operator',
        value: 'multiply',
        title: '*',
        className: 'button',
        handler: function (firstValue, secondValue) {
            const result = parseFloat(firstValue) * parseFloat(secondValue);
            return parseFloat(result.toFixed(8))
        },
    },
    divide: { 
        type: 'operator',
        value: 'divide',
        title: '/',
        className: 'button',
        handler: function (firstValue, secondValue) {
            const result = parseFloat(firstValue) / parseFloat(secondValue);
            return parseFloat(result.toFixed(8))
        },
    },
    minus: { 
        type: 'operator',
        value: 'minus',
        title: '-',
        className: 'button',
        handler: function (firstValue, secondValue) {
            const result = parseFloat(firstValue) - parseFloat(secondValue);
            return parseFloat(result.toFixed(8))
        },
    },
    plus: {
        type: 'operator',
        value: 'plus',
        title: '+',
        className: 'button',
        handler: function(firstValue, secondValue) {
            const result = parseFloat(firstValue) + parseFloat(secondValue);
            return parseFloat(result.toFixed(8))
        },
    },
    backspace: { type: 'backspace', value: 'backspace', title: '←', className: 'button' },
    clear: { type: 'clear', value: 'clear', title: 'C', className: 'clear'  },
    equal:  { type: 'result', value: 'equal', title: '=', className: 'result' },
}

class Button {
    constructor({title, value, type, className}) {
        this.title = title;
        this.value = value;
        this.type = type;
        this.className = className

        return this.render();
    }

    render() {
        const button = document.createElement('button');
        button.innerText = this.title;
        button.style = 'margin: 8px;';
        button.setAttribute('data-value', this.value);
        button.setAttribute('data-type', this.type);
        button.classList.add(this.className)

        return button;
    }
}

class Screen {
    constructor() {
        this.screenValue = '0';
        this.input;
    }

    render() {
        this.input = document.createElement('input');
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('readonly', true);
        this.input.setAttribute('value', this.screenValue);
        this.input.classList.add('input')

        return this.input;
    }

    setValue(newValue) {
        this.input.setAttribute('value', newValue);
    }
}

class Calculator {
    constructor(config) {
        this.root = document.querySelector('#root');
        this.numPad;
        this.config = config;

        this.screen = new Screen();

        this.firstOperand = '';
        this.secondOperand = '';
        this.operation = null;

        this.init();
    }

    init (){
        this.root.appendChild(this.screen.render());
        this.numPad = document.createElement('div');
        this.numPad.classList.add('numpud');

        Object.keys(this.config).forEach((key) => {
            this.numPad.appendChild(new Button(this.config[key]));
        });

        this.root.appendChild(this.numPad);

        this.numPad.addEventListener('click', event => {
            if(event.target.hasAttribute('data-value')) {
                const type = event.target.getAttribute('data-type');
                const value = event.target.getAttribute('data-value');

                switch(type) {
                    case 'number':
                        if (!this.operation) {
                            this.setOperand(value, 'firstOperand');
                        } else {
                            this.setOperand(value, 'secondOperand');
                        }
                        break;
                    case 'operator':
                        if (this.firstOperand) {
                            this.operation = value;
                        }
                        break;
                    case 'result':
                        this.makeResult(this.firstOperand, this.secondOperand, this.operation);
                        break;
                    case 'backspace':
                        this.backSpace(this.firstOperand, this.secondOperand);
                        break;
                    case 'clear':
                        this.clear();
                        break;
                    case 'changeModule':
                        this.changeModule(this.firstOperand, this.secondOperand);
                        break;
                    default:
                        return;
                }
                console.log(this.firstOperand, this.secondOperand, this.operation)
            }
        });
    }

    setOperand (anotherValue, properyName) {
        this[properyName] += anotherValue;
        this.screen.setValue(this[properyName]);
    }

    makeResult(firstValue, secondValue, operation) {
        const handler = this.config[operation].handler;

        if (handler) {
            this.screen.setValue(handler(firstValue, secondValue));
        }
    }

    backSpace(firstValue, secondValue) {
        
        if (this.operation) {
            secondValue = secondValue.slice(0, -1)
            this.secondOperand = secondValue
            this.screen.setValue(secondValue);
        } else {
            firstValue = firstValue.slice(0, -1)
            this.firstOperand = firstValue
            this.screen.setValue(firstValue);
        }
    }

    clear() {
        this.firstOperand = ''
        this.secondOperand = ''
        this.operation = null
        this.screen.setValue(0);
    }

    changeModule(firstValue, secondValue) {
        if (this.operation) {
            secondValue = parseFloat(secondValue) * -1
            this.secondOperand = secondValue
            this.screen.setValue(secondValue);
        } else {
            firstValue = parseFloat(firstValue) * -1
            this.firstOperand = firstValue
            this.screen.setValue(firstValue);
        }  
    }
}

new Calculator(CALCULATOR_CONFIG);