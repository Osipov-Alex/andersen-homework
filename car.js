class Car {
  #currentYear = new Date().getFullYear();
  #ERROR_MESSAGE = {
    'brand': 'Неверный бренд',
    'model': 'Неправильная модель',
    'yearOfManufacturing': 'Неверный год производства',
    'maxSpeed': 'Неправильная максимальная скорость',
    'maxFuelVolume': 'Неверно указан обьем бака',
    'fuelConsumption': 'Неверный расход топлива'
  }
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume;
  #isStarted;
  #mileage;
  constructor(options) {
    this.#brand = Car.checkStringLength(options.brand, this.#ERROR_MESSAGE['brand'], 1, 50);
    this.#model = Car.checkStringLength(options.model, this.#ERROR_MESSAGE['model'], 1, 50);
    this.#yearOfManufacturing = Car.checkNumber(options.yearOfManufacturing, this.#ERROR_MESSAGE['yearOfManufacturing'], 1900, this.#currentYear)
    this.#maxSpeed = Car.checkNumber(options.maxSpeed, this.#ERROR_MESSAGE['maxSpeed'], 100, 300)
    this.#maxFuelVolume = Car.checkNumber(options.maxFuelVolume, this.#ERROR_MESSAGE['maxFuelVolume'], 5, 20)
    this.#fuelConsumption = Car.checkNumber(options.fuelConsumption, this.#ERROR_MESSAGE['fuelConsumption'], 0);
    this.#currentFuelVolume = Car.checkNumber(options.currentFuelVolume, this.#ERROR_MESSAGE['fuelConsumption'], 0) || 0
    if (typeof options.currentFuelVolume !== 'number' || options.currentFuelVolume < 0) {
      throw new Error('Неверное тукущее значение топлива')
    } else {
      this.#currentFuelVolume = 0
    }
    if (typeof options.isStarted !== 'boolean') {
      throw new Error('Неправильный тип isStarted');
    } else {
      this.#isStarted = options.isStarted;
    }
    if (typeof options.mileage !== 'number' || options.mileage < 0) {
      throw new Error('Неверный пробег')
    } else {
      this.#mileage = 0
    }
  }

  get brand() {
    return this.#brand
  }

  set #brand(value) {
    this.#brand = Car.checkStringLength(value, this.#ERROR_MESSAGE['brand'], 1, 50)
  }

  get model() {
    return this.#model
  }

  set #model(value) {
    this.#model = Car.checkStringLength(value, this.#ERROR_MESSAGE['model'], 1, 50)
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing
  }

  set #yearOfManufacturing(value) {
    this.#yearOfManufacturing = Car.checkNumber(value, this.#ERROR_MESSAGE['yearOfManufacturing'], 1900, this.#currentYear)
  }

  get maxSpeed() {
    return this.#maxSpeed
  }

  set #maxSpeed(value) {
    this.#maxSpeed = Car.checkNumber(value, this.#ERROR_MESSAGE['maxSpeed'], 100, 300)
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume
  }

  set #maxFuelVolume(value) {
    this.#maxFuelVolume = Car.checkNumber(value, this.#ERROR_MESSAGE['maxFuelVolume'], 5, 20)
  }

  get fuelConsumption() {
    return this.#fuelConsumption
  }

  set #fuelConsumption(value) {
    this.#fuelConsumption = Car.checkNumber(value, this.#ERROR_MESSAGE['fuelConsumption'], 0)
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume
  }

  get isStarted() {
    return this.#isStarted
  }

  get mileage() {
    return this.#mileage
  }

  start = () => {
    if (this.#isStarted) {
      throw new Error('Машина уже заведена');
    }
    this.#isStarted = true
  }

  shutDownEngine = () => {
    if (!this.#isStarted) {
      throw new Error('Машина ещё не заведена');
    }
    this.#isStarted = false
  }

  fillUpGasTank = (value) => {
    if (typeof value !== 'number' || value <= 0 || isNaN(value)) {
      throw new Error('Неверное количество топлива для заправки');
    }
    if ((this.#currentFuelVolume + value) > this.#maxFuelVolume) {
      throw new Error('Топливный бак переполнен');
    }

    this.#currentFuelVolume += value
  }

  drive = (speed, time) => {
    if (typeof speed !== 'number' || speed <= 0 || isNaN(speed)) {
      throw new Error('Неверная скорость');
    }
    if (typeof time !== 'number' || time <= 0 || isNaN(time)) {
      throw new Error('Неверное количество часов');
    }
    if (speed > this.#maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    }
    if (!this.#isStarted) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }

    const range = speed * time;
    const spentFuel = this.#fuelConsumption * (range / 100);

    if (this.#currentFuelVolume - spentFuel < 0) {
      throw new Error('Недостаточно топлива');
    }

    this.#mileage += range
    this.#currentFuelVolume -= spentFuel
  }

  static checkStringLength = (string, errorMessage, min, max) => {
    if (typeof string !== 'string') {
      throw new Error(errorMessage)
    }
    if (min > string.length || string.length > max) {
      throw new Error(errorMessage)
    }

    return string
  }

  static checkNumber = (number, errorMessage, min, max) => {
    if (typeof number !== 'number') {
      throw new Error(errorMessage)
    }
    if (min > number || number > max) {
      throw new Error(errorMessage)
    }

    return number
  }
}

module.exports = { Car }