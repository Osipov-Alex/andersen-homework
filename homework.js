const makeObjectDeepCopy = (object) => {
  const newObject = Array.isArray(object) ? [] : {}
  for (let prop in object) {
    const value = object[prop];
    if (value && typeof (value) === 'object') {
      newObject[prop] = makeObjectDeepCopy(value)
    } else {
      newObject[prop] = value
    }
  }
  
  return newObject
}

const selectFromInterval = (arr, number_1, number_2) => {
  const {minValue, maxValue} = number_1 < number_2 ? {minValue: number_1, maxValue: number_2} : {minValue: number_2, maxValue: number_1};

  if(!Array.isArray(arr) || typeof (number_1) !== 'number' || typeof (number_2) !== 'number') {
    throw new Error('Ошибка!');
  } 

  return arr.filter(elem => {
    if(typeof (elem) !== 'number') {
      throw new Error('Ошибка!');
    }

    return minValue <= elem && elem <= maxValue
  });
}

const myIterable = { from: 5, to: 6 };

myIterable[Symbol.iterator] = function () {
  
  let currentValue = this.from
  const rangeEnd = this.to
  const rangeStart = this.from

  return {
    next() {
      if(rangeEnd < rangeStart || typeof (rangeStart) !== 'number' || typeof (rangeEnd) !== 'number') {
        throw new Error('Ошибка!')
      }
      if(currentValue <= rangeEnd) {
        return {
          done: false,
          value: currentValue++
        };
      } else {
        return {
          done: true
        }
      }
    }
  }

}

for (let item of myIterable) {
  console.log(item)
}