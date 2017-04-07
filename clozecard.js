//constructs ClozeCard
//===================
//full = full text
//cloze = answer
//partial = full text - answer (full - cloze) aka: question

var ClozeCard = function(full, cloze) {
	this.full = full;
	this.cloze = cloze;
	this.partial = this.full.replace(this.cloze, "...");
}

ClozeCard.prototype.showPartial = function() {
	return this.partial;
};

// var tester = new ClozeCard("This is gonna be a TESTER", "TESTER");
// console.log(tester);

module.exports = ClozeCard;