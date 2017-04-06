var inquirer = require("inquirer");

var Flashcard = require("./flashcard.js");

var count = 0;

var correct = 0;

var incorrect = 0;

var questionsArray = [];

var flashcardLogic = function() {

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

				//store answers into variables/maybe array idk yet
				questionsArray.push(newCard);

				count++;
				//loop this inquirer twice for now to see if it's working (two questions)
				flashcardLogic();
			})
	} else {

			inquirer.prompt([
			{
				name: "first",
			 	message: questionsArray[0].front
			},
			{
				name: "second",
			 	message: questionsArray[1].front
			}
				]).then(function(answers) {
					if(answers.first === questionsArray[0].back){
						correct++;
					} else{
						incorrect++;
					}
					if(answers.second === questionsArray[1].back){
						correct++;
					} else {
						incorrect++;
					}
					console.log("correct: " + correct + " incorrect: " + incorrect);
				})
	}//ends else
};//ends Flashcardlogic


flashcardLogic();