class Stack {
  constructor(maxStackSize = 10) {
    if (typeof maxStackSize !== 'number' || maxStackSize < 0 || !isFinite(maxStackSize) || isNaN(maxStackSize)) {
      throw new Error('Maxstacksize must be a number');
    }
    this.maxStackSize = maxStackSize;
    this.stack = [];
    this.count = 0;
  }

  push = (elem) => {
    if (this.count >= this.maxStackSize) {
      throw new Error('Stack is full');
    }

    this.stack[this.count] = elem;
    this.count += 1;
  }

  pop = () => {
    if (this.count === 0) {
      throw new Error('Stack is empty');
    }
    const newElem = this.stack[this.count - 1];
    delete this.stack[this.count - 1];
    this.count -= 1
    return newElem
  }

  peek = () => {
    return (this.count === 0) ? null : this.stack[this.count - 1]
  }

  isEmpty = () => {
    return !this.count
  }

  toArray = () => {
    const newArray = []
    for (let i = 0; i <= this.count - 1; i++) {
      newArray[i] = this.stack[i];
    }
    return newArray
  }

  static fromIterable = (iterable) => {
    if (typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error('Entity must be iterable');
    }
    const newStack = new Stack(iterable.length)
    for (let elem of iterable) {
      newStack.push(elem)
    }
    return newStack
  }
}

module.exports = { Stack };