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
var newClozeArray = [];

//round logic variables;
var currentIndex = 0;
var currentScore = 0;

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
};// end play or create()

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
};//end basicCardPush function

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

							clozeCardPush();
						}
					})//end then 2
		})//end then 1
};//end Cloze Function

//takes flashcards and moves them to a text file
var clozeCardPush = function() {
	// creates the string to append to the txt file cleaner
	var logString = '';

	//loops throught the basic card array of basic card constructors
	for (var i in clozeCardArray) {

		if (i < clozeCardArray.length) {
			//this takes the front and back and puts it on one line, os.EOL creates a linebreak
			logString += clozeCardArray[i].partial + "," + clozeCardArray[i].cloze + os.EOL;

		}
		else {
			logString += clozeCardArray[i].partial + "," + clozeCardArray[i].cloze;
		}
	}

	// the npms fs call to append the logstring to the txt file
	fs.appendFile("clozeCard.txt", logString, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("=========Content Added!=========");
			//if there's no error this will essentially send the user to the beginging of the app
			playOrCreate();
		}
	})
};//end clozeCardPush

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
				clozeGame();
			} else {
				console.log("WTF DID YOU DO!?!?!?")
			}
		})//end then 1

};//end playGame()

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
			//runs basic round with newBasicArray infor added
			playBasicRound(newBasicArray, currentIndex, currentScore);
		})
		
};//ends basicGame function

//this keeps track of the current index and score from the basic array
var playBasicRound = function (newBasicArray, currentIndex, currentScore) {

	//if the index is less than the array length then keep playing
	if (currentIndex < newBasicArray.length) {
		basicLogic(newBasicArray, currentIndex, currentScore);

	}
	//once the index reaches the end of the array, run end game function
	else {
		console.log("end of round");
		console.log("//////////////////           /////////////////");
		endBasicGame(newBasicArray, currentIndex, currentScore);
	}
};//ends playBasicRound function

//asks an indivual question for each index in the array (front), and compares it to the answer (back)
var basicLogic = function(newBasicArray, currentIndex, currentScore) {

	console.log("current Index: " + currentIndex + " | current Score: " + currentScore);

	inquirer.prompt([

	{
		name: "question",
		type: "input",
		//current index moves through array and asks the question using (.front)
		message: newBasicArray[currentIndex].front
	}
		]).then(function(answers) {
			//if answer from user imput matches the back from the same index in the array = correct
			if (answers.question === newBasicArray[currentIndex].back) {
				console.log("======== CORRECT!! ========");
				currentScore++;
			} else {
				console.log("======== WRONG!!! =======");
			}
			//this moves index to loop through next card
			currentIndex++;
			//reruns basic round logic with new index and score
			playBasicRound(newBasicArray, currentIndex, currentScore);

		})
};//ends basicLogic function

//once every question from the array is answered, run this
var endBasicGame = function(newBasicArray, currentIndex, currentScore) {

	console.log("======== END OF GAME!! HERE'S HOW YOU DID =======");
	console.log("Current Score: " + currentScore);
	//runs reset function to play set index and score back to 0
	resetBasic(newBasicArray, currentIndex, currentScore);

};//ends endBasicGame function

//resetting index and score
var resetBasic = function(newBasicArray, currentIndex, currentScore) {

	console.log("====== RESETTING INDEX AND SCORE ======")
	currentIndex = 0;
	currentScore = 0;
	//once everthing's reset, run user back to the beggining
	playOrCreate()

};//ends resetBasic function

//this is the function to play a game with created cloze cards
var clozeGame = function() {

	//reads from the clozeCard.txt file
	fs.readFile("clozeCard.txt", "utf8", function(err, data) {

		if(err) {
			console.log(err);
		}

		else if (!err) {

			// splits the txt file string at linebreaks (os.EOL)
			data = data.split(os.EOL);

			//loops through data at split (- 1) to get rid of last space
			for (var i = 0; i < data.length - 1; i++) {
				//creating a new array to split all data at line break
				var savedClozeCardArray = data[i].split(os.EOL);
				//setting the array to a variable by splitting at ","
				var createdCard = savedClozeCardArray[0].split(",");
				//recreating the cloze card object with the new data from txt file
				var newCard = new Clozecard(
					createdCard[0],
					createdCard[1]);

				//pushing the newCard data to a scopped newClozeArray
				newClozeArray.push(newCard);

			}
		}
		//runs basic round with newBasicArray infor added
		playClozeRound(newClozeArray, currentIndex, currentScore);
	})
};//ends clozeGame function

//this keeps track of the current index and score from the basic array
var playClozeRound = function (newClozeArray, currentIndex, currentScore) {

	//if the index is less than the array length then keep playing
	if (currentIndex < newClozeArray.length) {
		clozeLogic(newClozeArray, currentIndex, currentScore);

	} else {
		console.log("end of round");
		console.log("//////////////////           /////////////////");
		//once the index reaches the end of the array, run end cloze game
		endClozeGame(newClozeArray, currentIndex, currentScore);
	}
};//ends playClozeRound function

//asks an indivual question for each index in the array (front), and compares it to the answer (back)
var clozeLogic = function(newClozeArray, currentIndex, currentScore) {

	console.log("current Index: " + currentIndex + " | currentScore: " + currentScore);

	inquirer.prompt([

	{
		name: "question",
		type: "input",
		//current index moves through array and asks the question using (.partial)
		message: newClozeArray[currentIndex].partial
	}
		]).then(function(answers) {

			//if answer from user imput matches the back from the same index in the array = correct
			if (answers.question === newClozeArray[currentIndex].cloze) {
				console.log("======== CORRECT!! ========");
				currentScore++;
			} else {
				console.log("======== WRONG!!! =======")
			}

			//this moves index to loop through next card
			currentIndex++;

			//reruns basic round logic with new index and score
			playClozeRound(newClozeArray, currentIndex, currentScore);

		})
};//ends clozeLogic function

//once every question from the array is answered, run this
var endClozeGame = function(newClozeArray, currentIndex, currentScore) {

	console.log("======== END OF GAME!! HERE'S HOW YOU DID =======");
	console.log("Current Score: " + currentScore);
	//runs reset function to play set index and score back to 0
	resetCloze(newClozeArray, currentIndex, currentScore);

};//ends endClozeGame function

//resetting index and score
var resetCloze = function(newClozeArray, currentIndex, currentScore) {
	console.log("====== RESETTING INDEX AND SCORE ======")
	currentIndex = 0;
	currentScore = 0;
	//once everthing's reset, run user back to the beggining
	playOrCreate()

};//ends resetCloze function

//function to "put on for my city"-Jeeze? maybe lil wayne? idk it starts the app
playOrCreate();