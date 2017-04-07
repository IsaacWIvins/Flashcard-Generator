//constructs basicCard
//====================
//front = question;
//back = answer;

var BasicCard = function(front, back) {
	this.front = front;
	this.back = back;
}

BasicCard.prototype.showFront = function() {
	return this.front;
};

BasicCard.prototype.showBack = function() {
	return this.back;
}

BasicCard.prototype.showCard = function() {
	console.log("Front: " + this.front + ", Back: " + this.back);
};

module.exports = BasicCard;