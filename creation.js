var fs = require("fs");
var os = require("os");
var inquirer = require("inquirer");
var BasicCard = require("./basiccard.js");
var Clozecard = require("./clozecard.js");
var basicCarArray = [];
var savedBasicCardArray = [];

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

							basicCardPush();

						}
					})//end then 2
			})//end then 1
};//end Basic function

var basicCardPush = function() {

	var logString = '';


	for (var i in basicCarArray) {

		if (i < basicCarArray.length){
			logString += basicCarArray[i].front + ',' + basicCarArray[i].back + os.EOL;
		}
		else {
			logString += basicCarArray[i].front + ',' + basicCarArray[i].back;
		}

		
	}
		// basicCardString = JSON.stringify(basicCarArray);
		// console.log("first: " + basicCardString);

	fs.appendFile("basicCard.txt", logString, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("=========Content Added!=========");
			playOrCreate();
		}
	})
};//end basicCardPush()

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

							clozeCardArray = JSON.stringify(clozeCardArray);
							clozeCardPush();
						}
					})//end then 2
		})//end then 1
}//end Cloze Function


var clozeCardPush = function() {
	fs.appendFile("clozeCard.txt", "&" + clozeCardArray, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("=========Content Added!=========");
		}
	})
};//end clozeCardPush

var playOrCreate = function() {
	inquirer.prompt([
	{
		name: "start",
		type: "list",
		message: "Would you like to Play Game or Create Flashcards?",
		choices: ["Play Game", "Create Flashcards"]
	}
		]).then(function(answers) {

			if (answers.start === "Create Flashcards") {
				whichType();
			} else if (answers.start === "Play Game") {
				playGame();
			} else {
				console.log("WTF DID YOU DO!?!?!?")
			}
		})//end then 1
}// end play or create()

var playGame = function() {

	inquirer.prompt([
	{
		name: "BasicOrCloze",
		type: "list",
		message: "Which cards would you like to play with?",
		choices: ["Basic Flashcards", "Clozecard Flashcards"]
	}
		]).then(function(answers) {


			if (answers.BasicOrCloze === "Basic Flashcards") {
				basicGame();
			} else if (answers.BasicOrCloze === "Clozecard Flashcards") {
				console.log("working CLOZECARD flashcards");
				//clozeGame();
			} else {
				console.log("WTF DID YOU DO!?!?!?")
			}
		})//end then 1

}//end playGame()

var basicGame = function() {


	fs.readFile("basicCard.txt", "utf8", function(error, data) {

		if (error) {
			console.log(error);

		} else if (!error) {

			var savedBasicCardArray = data.split(os.EOL);

			console.log("==================")

				for (var i = 0; i < savedBasicCardArray.length - 1; i++) {
					console.log(savedBasicCardArray[i].split(','));
					console.log(savedBasicCardArray[i][0])
				}

			}
		})
		
};

var clozeGame = function() {

		//looop through cards and have (partial be question, cloze be answer)
		//randomize card order and ask sequentially untill no cards are left
};




playOrCreate();



