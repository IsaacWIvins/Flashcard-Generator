var fs = require("fs");
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
		});//ends then
};//ends which card function

var basicCarArray = [];

var basicFLashcards = function() {
	inquirer.prompt([
	{
		name: "front",
		message: "What is the question for the front?"
	}, {
		name: "back",
		message: "What is the answer for the back?"
	}, 
		]).then(function(answers) {
			var newCard = new BasicCard(
				answers.front,
				answers.back);

				console.log("======== Card Created =======")
				basicCarArray.push(newCard);
				console.log(basicCarArray);

				inquirer.prompt([
				{
					name: "createAgain",
					type: "list",
					message: "Create another Basic Flashcard?",
					choices: ["yes", "no"]
				}
					]).then(function(answers) {

						if (answers.createAgain === "yes") {
							basicFLashcards();
						} else {
							console.log("====== Basic Flashcards ========")
							console.log(basicCarArray)
							console.log("================================")

							basicCarArray = JSON.stringify(basicCarArray);
							basicCardPush();
						}
					})//end then 2
			})//end then 1
};//end Basic function

var clozeCardArray = [];

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

				console.log("======== Card Created =======")
				clozeCardArray.push(newCard);
				console.log(clozeCardArray);
				//push the new card into a text file here

				inquirer.prompt([
				{
					name: "createAgain",
					type: "list",
					message: "Create another Clozecard Flashcard?",
					choices: ["yes", "no"]
				}
					]).then(function(answers) {

						if (answers.createAgain === "yes") {
							clozeCardFlashcards();
						} else {
							console.log("======== Clozecard Flashcards ========")
							console.log(clozeCardArray)
							console.log("======================================")
						}
					})//end then 2
		})//end then 1
}//end Cloze Function

var basicCardPush = function() {
	fs.appendFile("basicCard.txt", "&" + basicCarArray, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Content Added!");
		}
	})
};


whichType();