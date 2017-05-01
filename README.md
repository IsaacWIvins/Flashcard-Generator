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

After entering the Front part of the Flashcard, the user then has to enter the Back or (Answer)

![Creating Flashcard](readme_images/EnteringFirstBasicBack.png)

The new Flashcard gets pushed into a basic flashcard array, this array can have any amount of cards, entered at any given time without deleting pre existing cards. Also after entering the new Flashcard the user is prompted with option to either "Create Another Card" or not. Selecting no will bring the user to the "Play or Create" prompt from the begining.

![Creating Flashcard](readme_images/ShowCardCreateAnotherBasic.png)