//constructs flashcard
var BasicCard = function(front, back) {
	this.front = front;
	this.back = back;
}

BasicCard.prototype.printInfo = function() {
	console.log("Front: " + this.front + ", Back: " + this.back);
};

module.exports = BasicCard;