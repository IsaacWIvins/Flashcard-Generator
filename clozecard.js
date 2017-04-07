//constructs ClozeCard
//===================
//full = full text
//cloze = answer
//partial = full text - answer aka: question

var ClozeCard = function(full, cloze) {
	this.full = full;
	this.cloze = cloze;
	this.partial = this.full.replace(this.cloze, "...");
}

var tester = new ClozeCard("This is gonna be a TESTER", "TESTER");
console.log(tester);

module.exports = ClozeCard;