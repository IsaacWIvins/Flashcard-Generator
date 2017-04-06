//constructs flashcard
var Flashcard = function(front, back) {
	this.front = front;
	this.back = back;
}

Flashcard.prototype.printInfo = function() {
	console.log("Front: " + this.front + ", Back: " + this.back);
};

module.exports = Flashcard;