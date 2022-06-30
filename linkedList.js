class LinkedList {
  constructor() {
    this.start = null;
  }

  append = (elem) => {
    const newLinkedListElem = new LinkedListElem(elem)

    if (!this.start) {
      this.start = newLinkedListElem
    } else {
      let lastElem = this.start
      while (lastElem.next) {
        lastElem = lastElem.next
      }
      lastElem.next = newLinkedListElem
    }
  }

  prepend = (elem) => {
    const newLinkedListElem = new LinkedListElem(elem)
    newLinkedListElem.next = this.start
    this.start = newLinkedListElem
  }

  find = (elem) => {
    let searchElem = this.start

    while (searchElem) {
      if (searchElem.value === elem) {
        return searchElem
      }
      searchElem = searchElem.next
    }
    
    return null
  }

  toArray = () => {
    const linkedListArray = []
    let currentElem = this.start

    while (currentElem) {
      linkedListArray.push(currentElem.value)
      currentElem = currentElem.next
    }

    return linkedListArray
  }

  static fromIterable = (iterable) => {
    if (typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error('Entity must be iterable');
    }
    const newList = new LinkedList()
    for (let elem of iterable) {
      newList.append(elem)
    }
    return newList
  }
}

class LinkedListElem {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

module.exports = { LinkedList };