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

ClozeCard.prototype.showFull = function() {
	return this.full;
}

ClozeCard.prototype.showCloze = function() {
	return this.cloze;
}

ClozeCard.prototype.showCard = function() {
	console.log("Full: " + this.full + ", Cloze: " + this.cloze + ", Partial: " + this.partial);
}

module.exports = ClozeCard;