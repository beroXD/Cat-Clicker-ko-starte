var initialCats = [
	{
		clickCount: 0,
		name: 'Snow',
		imgSrc: 'img/Cat.jpg',
		nickNames: [
			{
				catname: 'Snow',
				nickname: ['ice', 'blue']
			}
		]
	},
	{
		clickCount: 0,
		name: 'Blue',
		imgSrc: 'img/Cat2.jpg',
		nickNames: [
			{
				catname: 'Blue',
				nickname: ['B', 'Sea']
			}
		]
	},
	{
		clickCount: 0,
		name: 'Twin',
		imgSrc: 'img/Cat3.jpg',
		nickNames: [
			{
				catname: 'Twin',
				nickname: ['cute', 'cuddles']
			}
		]
	},
	{
		clickCount: 0,
		name: 'Sleepy',
		imgSrc: 'img/Cat4.jpeg',
		nickNames: [
			{
				catname: 'Sleepy',
				nickname: ['zZZ', 'Sweet']
			}
		]
	},
	{
		clickCount: 0,
		name: 'Sulking',
		imgSrc: 'img/Cat5.jpg',
		nickNames: [
			{
				catname: 'Sulking',
				nickname: ['Needy', 'Gray']
			}
		]
	}
];

var Cat = function (data) {
	this.clickCount = ko.observable(data.clickCount);
	this.name = ko.observable(data.name);
	this.levelOne = ko.observable('Baby');
	this.levelTwo = ko.observable('Teen');
	this.levelThree = ko.observable('Adult');
	this.imgSrc = ko.observable(data.imgSrc);
	this.nickNames = ko.observableArray(data.nickNames);

	// using computed observables
	this.level = ko.computed(function () {
		if (this.clickCount() < 10) {
			return this.levelOne();
		}
		if (this.clickCount() >= 10 && this.clickCount() < 20) {
			return this.levelTwo();
		}
		if (this.clickCount() >= 20) {
			return this.levelThree();
		}
	}, this);
};


var viewModel = function () {
	var self = this;
	this.catList = ko.observableArray([]); // we don't need []

	// make new cat out of each of the objects in the array.
	initialCats.forEach(function (catItem) {
		self.catList.push(new Cat(catItem)); //self
	});

	this.currentCat = ko.observable(this.catList()[0]);
	//access the first cat
	//		new Cat({
	//		clickCount: 0,
	//		name: 'Snow',
	//		levelOne: 'Baby',
	//		levelTwo: 'Teen',
	//		levelThree: 'Adult',
	//		imgSrc: 'img/Cat.jpg',
	//		nickNames: [
	//			{
	//				name: 'Snow',
	//				nickname: ['ice', 'blue']
	//			}
	//		]
	//	}));
	// increment count then store it in this.clickCount
	// similar too var count = 0; count ++;
	this.incrementCounter = function () {
		self.currentCat().clickCount(self.currentCat().clickCount() + 1);
		// we add currentCat() cuz this is refering to clickcount in Cat function.
		// we removed it after adding with.
		// or we can add var self = this; // we use self insted of this to represent the viewModel.
	};

	this.setCat = function (clickedCat) {
		self.currentCat(clickedCat); //self
	};
};

ko.applyBindings(new viewModel());
