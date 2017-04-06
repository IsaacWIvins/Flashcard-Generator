//this page is to gather user input for greating flashcards with answers
var inquirer = require("inquirer");

var Flashcard = function(front, back) {
	this.front = front;
	this.back = back;
}

Flashcard.prototype.printInfo = function() {
	console.log("Front: " + this.front + ", Back: " + this.back);
};

var count = 0;

var getFlashcard = function() {

	if (count < 2) {

		console.log("NEW FLASHCARD");

		inquirer.prompt([
		{
			name: "front",
			message: "What is the question for the front?"
		}, {
			name: "back",
			message: "What is the answer for the back?"
		}
			]).then(function(answers) {
				var newCard = new Flashcard(
					answers.front,
					answers.back);

				count++;
				getFlashcard();
			})
	}
};

getFlashcard()

module.exports = Flashcard;
//inquirer.prompt
	//gather user input for (front) --question
	//gather user input for (back) --answer

	//store answers into variables/maybe array idk yet

//loop this inquirer twice for now to see if it's working (two questions)

//module.export Questions to index.js page