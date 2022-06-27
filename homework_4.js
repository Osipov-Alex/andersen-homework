const concatStrings = (str, separator) => {
  return (nextString, nextSeparator) => {
    if (typeof nextString !== 'string') return str;
    const currentSeparator = (typeof separator !== 'string') ? '' : separator;
    return concatStrings(str + currentSeparator + nextString, nextSeparator ? nextSeparator : currentSeparator);
  };
};

class Calculator {
  static checkIfNumber(number) {
    if (typeof number !== 'number') {
      throw new Error('Not a number')
    }
  }

  constructor(firstNumber, secondNumber) {

    if (arguments.length > 2) {
      throw new Error('Must be two arguments')
    }

    Calculator.checkIfNumber(firstNumber)
    Calculator.checkIfNumber(secondNumber)

    this.firstNumber = firstNumber
    this.secondNumber = secondNumber
  }

  setX = (number) => {
    Calculator.checkIfNumber(number)
    this.firstNumber = number
  }

  setY = (number) => {
    Calculator.checkIfNumber(number)
    this.secondNumber = number
  }

  logSum = () => {
    console.log(this.firstNumber + this.secondNumber)
    return this.firstNumber + this.secondNumber
  }

  logMul = () => {
    console.log(this.firstNumber * this.secondNumber)
    return this.firstNumber * this.secondNumber
  }

  logSub = () => {
    console.log(this.firstNumber - this.secondNumber)
    return this.firstNumber - this.secondNumber
  }

  logDiv = () => {
    if(this.secondNumber === 0) {
      throw new Error('Division by zero')
    }

    console.log(this.firstNumber / this.secondNumber)
    return this.firstNumber / this.secondNumber
  }
}
