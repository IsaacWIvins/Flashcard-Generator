//npm dependencies 
var fs = require("fs");
var os = require("os");
var inquirer = require("inquirer");

//module imports of constructors
var BasicCard = require("./basiccard.js");
var Clozecard = require("./clozecard.js");

//arrays pre append to txt file
var basicCarArray = [];
var clozeCardArray = [];

//arrays after imported from txt file
//array to have the new cards (post txt file) pushed to
var newBasicArray = [];

//function to see which type of flashcard is going to be created
var whichType = function() {
	//terminal responce for user input
	inquirer.prompt([
	{
		name: "typeOfFlashcard",
		type: "list",
		message: "Which type of flashcards are you creating?",
		choices: ["Basic Flashcards", "Clozecard Flashcards"]
	} 
		//once the user choses, run this part
		]).then(function(answers) {
			if (answers.typeOfFlashcard === "Basic Flashcards") {

				console.log("======== Basic ========");
				//calls basic flash card function
				basicFLashcards();

			} else {

				console.log("======== Cloze ========");
				//calls clozecard flash card function
				clozeCardFlashcards();
			}
		});//ends then
};//ends which card function

//function for creating basic cards
var basicFLashcards = function() {
	//terminal responce for user input
	inquirer.prompt([
	{
		name: "front",
		message: "What is the question for the front?"
	}, {
		name: "back",
		message: "What is the answer for the back?"
	}
		//once the user choses, run this part
		]).then(function(answers) {
			//constructs BasicCard as a flashcard with (front and back)
			var newCard = new BasicCard(
				answers.front,
				answers.back);

				console.log("======== Card Created =======")
				basicCarArray.push(newCard);
				console.log(basicCarArray);
				//after cards created, asks user if they want to create another
				inquirer.prompt([
				{
					name: "createAgain",
					type: "list",
					message: "Create another Basic Flashcard?",
					choices: ["yes", "no"]
				}
					]).then(function(answers) {

						if (answers.createAgain === "yes") {
							//re runs the function if user wants to create more than one card
							basicFLashcards();
						} else {
							console.log("====== Basic Flashcards ========")
							console.log(basicCarArray)
							//takes flashcards and moves them to a text file
							basicCardPush();

						}
					})//end then 2
			})//end then 1
};//end Basic function

//takes flashcards and moves them to a text file
var basicCardPush = function() {
	// creates the string to append to the txt file cleaner
	var logString = '';

	//loops throught the basic card array of basic card constructors
	for (var i in basicCarArray) {

		if (i < basicCarArray.length){
			//this takes the front and back and puts it on one line, os.EOL creates a linebreak
			logString += basicCarArray[i].front + ',' + basicCarArray[i].back + os.EOL;
		}
		else {
			logString += basicCarArray[i].front + ',' + basicCarArray[i].back;
		}

		
	}
	// the npms fs call to append the logstring to the txt file
	fs.appendFile("basicCard.txt", logString, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("=========Content Added!=========");
			//if there's no error this will essentially send the user to the beginging of the app
			playOrCreate();
		}
	})
};//end basicCardPush()

//function for creating cloze cards
var clozeCardFlashcards = function() {
	//terminal responce for user input
	inquirer.prompt([
	{
		name: "full",
		message: "What is the sentence you need to remember?"
	}, {
		name: "cloze",
		message: "Which part would you like to be removed?"
	}
		// once you gather input run this
		]).then(function(answers) {
			//this creates partial from the rull and cloze answers
			var partial = answers.full.replace(answers.cloze, "...");
			//uses the Clozecard constructor to create Clozecard Flashcards
			var newCard = new Clozecard(
				answers.full,
				answers.cloze,
				answers.partial)

				console.log("======== Card Created =======")
				clozeCardArray.push(newCard);
				console.log(clozeCardArray);
				// after construction this asks if the want to make more than one
				inquirer.prompt([
				{
					name: "createAgain",
					type: "list",
					message: "Create another Clozecard Flashcard?",
					choices: ["yes", "no"]
				}
					]).then(function(answers) {

						if (answers.createAgain === "yes") {
							//if the user wants more than one, re-run this function
							clozeCardFlashcards();
						} else {
							console.log("======== Clozecard Flashcards ========")
							console.log(clozeCardArray)
							console.log("======================================")
							//this is subject to change for once i figure out how to do basic
							clozeCardArray = JSON.stringify(clozeCardArray);
							//pushed the flashcard constructors to a txt file
							clozeCardPush();
						}
					})//end then 2
		})//end then 1
}//end Cloze Function

//ALMOST ALL OF THIS WILL CHANGE, LIKE 85% SO KEEP THAT IN MIND
var clozeCardPush = function() {
	fs.appendFile("clozeCard.txt", "&" + clozeCardArray, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("=========Content Added!=========");
		}
	})
};//end clozeCardPush

//this is the money function, first function run, asks to play or create flashcards
var playOrCreate = function() {
	//asks play game or create flashcards
	inquirer.prompt([
	{
		name: "start",
		type: "list",
		message: "Would you like to Play Game or Create Flashcards?",
		choices: ["Play Game", "Create Flashcards"]
	}	
		//after we know what to do run this
		]).then(function(answers) {

			if (answers.start === "Create Flashcards") {
				//if they want to create flashcards, this function will ask what type
				whichType();
			} else if (answers.start === "Play Game") {
				//underconsturction at the moment, but also needs to specify what cards for game
				playGame();
			} else {
				console.log("WTF DID YOU DO!?!?!?")
			}
		})//end then 1
}// end play or create()

//fucntion to text users knowledge of flashcards
var playGame = function() {
	//first we ask if the user is playing with Basic or Clozecard Flashcards
	inquirer.prompt([
	{
		name: "BasicOrCloze",
		type: "list",
		message: "Which cards would you like to play with?",
		choices: ["Basic Flashcards", "Clozecard Flashcards"]
	}
		]).then(function(answers) {


			if (answers.BasicOrCloze === "Basic Flashcards") {
				//if they answer basic flashcards, run the game logic with basic
				basicGame();
			} else if (answers.BasicOrCloze === "Clozecard Flashcards") {
				console.log("working CLOZECARD flashcards");
				//this is under construction for the near future
				//clozeGame();
			} else {
				console.log("WTF DID YOU DO!?!?!?")
			}
		})//end then 1

}//end playGame()

//this is the function to play a game with created basic cards
var basicGame = function() {

	//fs npm to read the basic txt file to gather flashcard data
	fs.readFile("basicCard.txt", "utf8", function(error, data) {

		if (error) {
			console.log(error);

		} else if (!error) {

			// splits the txt file string at linebreaks (os.EOL)
			data = data.split(os.EOL);

				//loops through data at split (- 1) to get rid of last space
				for (var i = 0; i < data.length - 1; i++) {
					//creating a new array to split all data at line break
					var savedBasicCardArray = data[i].split(os.EOL);
					//setting the array to a variable by splitting at ","
					var createdCard = savedBasicCardArray[0].split(",");
					//recreating the basic card object with the new data from txt file
					var newCard = new BasicCard(
						createdCard[0],
						createdCard[1]);
					//pushing the newCard data to a scopped newBasicArray
					newBasicArray.push(newCard);
					
				}

			}
			basicLogic();
		})
		
};
//this is like 90% working as of now
//the problem is i can only ask one question and answer, scoring isn't set up yet
//ask Rony for help
var basicLogic = function() {
	//settign arrays for front and back of card
	var basicQuestionArray = [];
	var basicAnswerArray = [];
	//looping through the array built from (basicGame())
	for (var i = 0; i < newBasicArray.length; i++) {
		//pushes front and back respectivly
		basicQuestionArray.push(newBasicArray[i].front);
		basicAnswerArray.push(newBasicArray[i].back);
	}
	//asking user the question (grabbed from the basicQuestionArray)
	inquirer.prompt([
		{
			name: "question",
			type: "input",
			message: function() {
				//looping through the questions array and displaying the first one unfortunatley
				for (var i = 0; i < basicQuestionArray.length; i++) {
				return basicQuestionArray[i];
				}
			}
		}	//this part does work.. kinda
			]).then(function(answers) {
				//looping through the questions array and displaying the first one unfortunatley
				for (var i = 0; i < basicAnswerArray.length; i++) {
					if (answers.question === basicAnswerArray[i]) {
						console.log("working");
					} else {
						console.log("not working=========");
					}
				} 

			})

}
//underconstruction
var clozeGame = function() {
		//just fuckin mimic the basic card one once you figure it out
};

//function to "put on for my city"-Jeeze? maybe lil wayne? idk it starts the app
playOrCreate();
