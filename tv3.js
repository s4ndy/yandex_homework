/**
 * Создает экземпляр Машины
 * @this {Car}
 * @param {string} manufacturer Производитель
 * @param {string} model Модель
 * @param {number} year Год производство
 */
function Car(manufacturer, model, year) {
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year;
    var currentDate = new Date();
    if (!year || typeof(year) !== "number") this.year = currentDate.getFullYear();
}

// @TODO: если конструктор вызывается без указания текущего года, то подставлять текущий
// @TODO: реализовать методы вывода информации о машине: 
// console.log('Car: ' + bmw); // Car: BMW X5 2010
// console.log(bmw.getInfo()); // BMW X5 2010
// console.log(bmw.getDetailedInfo()); // Производитель: BMW. Модель: X5. Год: 2010

Car.prototype.toString = function() {
	return this.manufacturer + " " + this.model + " " + this.year;
}

Car.prototype.getInfo = function() {
	return this.manufacturer + " " + this.model + " " + this.year;
}

Car.prototype.getDetailedInfo = function() {
	return "Производитель: " + this.manufacturer + ". Модель: " + this.model + ". Год: " + this.year;
}

var bmw = new Car("BMW", "X5", 2010),
    audi = new Car("Audi", "Q5", 2012),
    toyota = new Car("Toyota", "Camry");

console.log('Car: ' + bmw); // Car: BMW X5 2010
console.log(bmw.getInfo()); // BMW X5 2010
console.log(bmw.getDetailedInfo()); // Производитель: BMW. Модель: X5. Год: 2010


/**
 * Создает экземпляр Автосалона
 * @this {CarDealer}
 * @param {string} name Название автосалона
 */
function CarDealer(name) {
    this.name = name;
    this.cars = [];
}

var yandex = new CarDealer('Яндекс.Авто');

// @TODO: реализовать метод добавления машин в автосалон. Предусмотреть возможность добавления одной машины, нескольких машин.
//yandex
//    .add(toyota)
//    .add(bmw, audi);

CarDealer.prototype.add = function() {
	for (var i=0; i<arguments.length; i++) {
		this.cars.push(arguments[i]);
	}
}

yandex.add(toyota);
yandex.add(bmw, audi);

// @TODO: реализовать метод установки цены на машину
/**
 * Установить цену на машину
 * @param {string} car идентификатор машины
 * @param {string} price стоимость
 */
// идентификатор машины составляется следующим образом "производитель модель год"
// стоимость машины может быть задана в двух валютах: йена и евро.
//yandex
//    .setPrice('BMW X5 2010', '€2000')
//    .setPrice('Audi Q5 2012', '€3000')
//    .setPrice('Toyota Camry 2012', '¥3000');

CarDealer.prototype.setPrice = function(car, price) {
	for (var i=0; i<this.cars.length; i++) {
		if (this.cars[i].getInfo() === car) {
			this.cars[i]["price"] = price;
		}
	}
}

yandex.setPrice('BMW X5 2010', '€2000');
yandex.setPrice('Audi Q5 2012', '€3000');
yandex.setPrice('Toyota Camry 2012', '¥3000');

// @TODO: реализовать вывод списка автомобилей в продаже, с фильтрацией по стране производителю, используя метод getCountry:
function getCountry() {
    switch (this.manufacturer.toLowerCase()) {
        case 'bmw':
	case 'audi':
            return 'Germany';

        case 'toyota':
            return 'Japan';
	}
}

CarDealer.prototype.list = function() {
	return this.cars.join(", ");
}

CarDealer.prototype.listByCountry = function(country) {
	var carsList = [];
	for (var i=0; i<this.cars.length; i++) {
		if (getCountry.call(this.cars[i]) === country) carsList.push(this.cars[i]);
	}
	return carsList.join(", ");
}

yandex.list(); //BMW X5 2010, Audi Q5 2012, Toyota Camry 2012
yandex.listByCountry('Germany'); //BMW X5 2010, Audi Q5 2012

// @TODO: бонус! выводить список машин с ценой в рублях.

//Код для работы с курсами валют
(function () {
	var rateOfEUR = 0,
		rateOfJPY = 0;
/**
 * Установить текущий курс
 * @param {string} currency наименование валюты
 * @param {number} rate текущий курс 1 единицы валюты в рублях
 */
	function setCurrency(currency, rate) {
		switch (currency.toLowerCase()) {
		case 'eur':
			if (typeof(rate) === "number") rateOfEUR = rate;
			break;
		case 'jpy':
        	if (typeof(rate) === "number") rateOfJPY = rate;
			break;
		}
	}
/**
* Получить текущий курс
* @param {string} currency наименование валюты
*/	
	function getCurrency(currency) {
		switch (currency.toLowerCase()) {
		case 'eur':
			return rateOfEUR;
		case 'jpy':
        	return rateOfJPY;
		}
	}
	myCur = {set: setCurrency, get: getCurrency};
	window.myCur = myCur;
} ());

window.myCur.set('eur', 39.8);
window.myCur.set('jpy', 0.4139);

CarDealer.prototype.listPriceRUB = function() {
	var oneEUR = window.myCur.get('eur'),
		oneJPY = window.myCur.get('jpy'),
		carsList = [];
	for (var i=0; i<this.cars.length; i++) {
		var priceRUB = 0,
			carPrice = this.cars[i].price;
		if (getCountry.call(this.cars[i]) === 'Germany') {priceRUB = Math.round(carPrice.substring(1, carPrice.length) * oneEUR * 100) / 100}
		if (getCountry.call(this.cars[i]) === 'Japan') {priceRUB = Math.round(carPrice.substring(1, carPrice.length) * oneJPY * 100) / 100}
		carsList.push(this.cars[i].getInfo() + " " + priceRUB + "руб.");
	}
	return carsList.join(", ");
}
