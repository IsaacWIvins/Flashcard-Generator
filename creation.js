var inquirer = require("inquirer");
var BasicCard = require("./basiccard.js");
var Clozecard = require("./clozecard.js");

var whichType = function() {
	inquirer.prompt([
	{
		name: "typeOfFlashcard",
		type: "list",
		message: "Which type of flashcards are you creating?",
		choices: ["Basic Flashcards", "Clozecard Flashcards"]
	}
		]).then(function(answers) {
			if (answers.typeOfFlashcard === "Basic Flashcards") {

				console.log("======== Basic ========");
				basicFLashcards();

			} else {

				console.log("======== Cloze ========");
				clozeCardFlashcards();

			}

		});
}

var basicFLashcards = function() {
	inquirer.prompt([
	{
		name: "front",
		message: "What is the question for the front?"
	}, {
		name: "back",
		message: "What is the answer for the back?"
	}
		]).then(function(answers) {
			var newCard = new BasicCard(
				answers.front,
				answers.back);

				console.log(newCard);
			})

}

var clozeCardFlashcards = function() {
	inquirer.prompt([
	{
		name: "full",
		message: "What is the sentence you need to remember?"
	}, {
		name: "cloze",
		message: "Which part would you like to be removed?"
	}
		]).then(function(answers) {

			var partial = answers.full.replace(answers.cloze, "...");
			var newCard = new Clozecard(
				answers.full,
				answers.cloze,
				answers.partial)

			console.log(newCard);
		})
}

whichType();




















