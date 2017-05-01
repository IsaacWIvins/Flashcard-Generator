# Flashcard-Generator

Once starting the app you're prompted with a (Play or Create) option in the terminal

![Creating Flashcard](readme_images/CreateFlashcards.png)

By Selecting "Create Flashcards" you're given the option to create "Basic" or "Clozecard" Flashcards

**Basic Flashcards Example:**
Front: "Who is the 20th President of the United States?"
Back: "James A. Garfield"

Front = Question || Back = Answer

**Clozecard Flashcard Example:**
Full: "James A. Garfield was the 20th President of the United States."
Partial: "James A. Garfield"
Cloze: "... was the 20th President of the United States."

Cloze = Question || Partial = Answer

![Creating Flashcard](readme_images/CreateBasic.png)

Once Selecting "Create Basic Flashcards" you are first prompted to enter the Front of the Flashcard (Question).

![Creating Flashcard](readme_images/EnteringFirstBasicFront.png)

After entering the Front part of the Flashcard, the user is then propmted to enter the Back or the (Answer).

![Creating Flashcard](readme_images/EnteringFirstBasicBack.png)

After entering the new Flashcard the user is prompted with option to either "Create Another Card" or not. Selecting no will bring the user to the "Play or Create" prompt from the begining.


![Creating Flashcard](readme_images/ShowCardCreateAnotherBasic.png)

The process for creating Clozecard Flashcards is almost exactly the same. The only difference is instead of the user inputting the "front"(questioin) and the "back"(answer), the user enters a full sentence and then the part of that sentence they would like to be removed. The full sentence minus the part they wanted removed appears as the "question" and the part removed is used at the "answer".

![Creating Flashcard](readme_images/CreateFlashcards.png)

![Creating Flashcard](readme_images/CreatingClozeCard.png)

![Creating Flashcard](readme_images/clozeCardCreationRemoveExample.png)

The first part of the user input is the sentence they need to remember. The second input from the user is the part of the first sentece they wish to remove for their clozecard flashcard.

![Creating Flashcard](readme_images/firstClozeCardCreatedCompletely.png)

There are 3 parts of the Clozecard Flashcard: "Full" is the entire sentence, "Cloze" is the part removed from full (answer), "Partial" the remaining sentence i.e full - cloze (question).

![Creating Flashcard](readme_images/clozeCardSecondExample.png)

This is an example to show multiple clozecards created.

Creating new cards at any time will add to the existing Flashcards, not override them. The card information is currently stored on a txt file sheet, using node "fs" npm package to read and write to the file. Later on I will use MYSQL to porperly store to a database.



















