class Car {
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
    this.#brand = options.brand;
    this.#model = options.model;
    this.#yearOfManufacturing = options.yearOfManufacturing;
    this.#maxSpeed = options.maxSpeed;
    this.#maxFuelVolume = options.maxFuelVolume;
    this.#fuelConsumption = options.fuelConsumption;
    this.#currentFuelVolume = options.currentFuelVolume;
    this.#isStarted = options.isStarted;
    this.#mileage = options.mileage;
  }

  get brand() {
    return this.#brand
  }

  set brand(value) {
    if (Car.checkString(value, 1, 50)) {
      throw new Error('Wrong brand');
    }
    this.#brand = value
  }

  get model() {
    return this.#model
  }

  set model(value) {
    if (Car.checkString(value, 1, 50)) {
      throw new Error('Wrong model');
    }
    this.#model = value
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing
  }

  set yearOfManufacturing(value) {
    const currentYear = new Date().getFullYear();
    if (Car.checkNumber(value, 1900, currentYear)) {
      throw new Error('Wrong year of manufacturing');
    }
    this.#yearOfManufacturing = value
  }

  get maxSpeed() {
    return this.#maxSpeed
  }

  set maxSpeed(value) {
    if (Car.checkNumber(value, 100, 300)) {
      throw new Error('Wrong max speed');
    }
    this.#maxSpeed = value
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume
  }

  set maxFuelVolume(value) {
    if (Car.checkNumber(value, 5, 20)) {
      throw new Error('Wrong max fuel volume');
    }
    this.#maxFuelVolume = value
  }

  get fuelConsumption() {
    return this.#fuelConsumption
  }

  set fuelConsumption(value) {
    if (Car.checkNumber(value, 0)) {
      throw new Error('Wrong fuel consumption');
    }
    this.#fuelConsumption = value
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

  static checkString = (value, min, max) => {
    return typeof value !== 'string' || min > value.length || value.length > max
  }

  static checkNumber = (value, min, max) => {
    return typeof value !== 'number' || isNaN(value) || min > value || value > max
  }
}

module.exports = { Car }

const car = {brand: 'audi', model: 's4', yearOfManufacturing: 2020, maxSpeed: 250, maxFuelVolume: 20, fuelConsumption: 4, currentFuelVolume: 0, isStarted: false, mileage: 0 }
const newCar = new Car(car)