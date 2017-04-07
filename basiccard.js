//constructs basicCard
//====================
//front = question;
//back = answer;

var BasicCard = function(front, back) {
	this.front = front;
	this.back = back;
}

BasicCard.prototype.printInfo = function() {
	console.log("Front: " + this.front + ", Back: " + this.back);
};

var tester = new BasicCard("this is gonna be a?", "TESTER");
console.log(tester);

module.exports = BasicCard;