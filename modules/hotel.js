
var eventEmitter = require('events');
var eventsConfig = require('./config');
var util = require('util');

//log array to print in the html file
var log = [];

//class definition
function Hotel(name) {
	this.name = name;
	this.stars = 0;
	this.likes = 0;
	this.reviews = [];
	log.push('Hotel: '+this.name);
};

//inheritance to events
util.inherits(Hotel,eventEmitter);


//add star
Hotel.prototype.addStar = function () {
	if(this.stars<5){
		this.stars++;
		this.emit(eventsConfig.events.STAR_ADD,'Star has been added (current: '+this.stars+')');
		log.push('Star has been added (current: '+this.stars+')');
	}
	else{
		this.emit(eventsConfig.errors.MAX_STARS,'Add failed: Reached the maximum amount of stars (current: '+this.stars+')');
		log.push('Add failed: Reached the maximum amount of stars (current: '+this.stars+')');
	}

};

//remove star
Hotel.prototype.removeStar = function () {
   	if(this.stars>0){
   		this.stars--;
   		this.emit(eventsConfig.events.STAR_REMOVE,'Star has been removed (current: '+this.stars+')');
   		log.push('Star has been removed (current: '+this.stars+')');
   	}
   	else{
		this.emit(eventsConfig.errors.MIN_STARS,'Remove failed: Reached the minimum amount of stars (current: '+this.stars+')');
		log.push('Remove failed: Reached the minimum amount of stars (current: '+this.stars+')');
   	}
};


//set amout of stars
Hotel.prototype.setStars = function (num) {
	if(num>=0 && num<=5){
   		this.stars=num;
   		this.emit(eventsConfig.events.STAR_SET,'Stars amount has been set to '+num+' (current: '+this.stars+')');
   		log.push('Stars amount has been set to ' +num+ ' (current: '+this.stars+')');
	}
	else{
		this.emit(eventsConfig.errors.RANGE_STARS,'Set failed: Wrong amount of stars ' +num+ ' (current: '+this.stars+')');
		log.push('Set failed: Wrong amount of stars ' +num+ ' (current: '+this.stars+')');
	}
};

//add review
Hotel.prototype.addReview = function (name,review) {
	var rev = {
		"reviewer" : name,
		"data" : review
	};
	this.reviews.push(rev);
	this.emit(eventsConfig.events.REVIEW_ADD,'Review has been added (current: '+this.reviews.length+')');
	log.push('Review has been added (current: '+this.reviews.length+'), ' +rev.reviewer+" says: "+rev.data);
};

//remove last review
Hotel.prototype.removeLastReview = function () {
	if(this.reviews.length>0){
		this.reviews.pop();
		this.emit(eventsConfig.events.REVIEW_REMOVE,'Review has been removed (current: '+this.reviews.length+')');
		log.push('Last review has been removed');
	}
	else{
		this.emit(eventsConfig.errors.MIN_REVIEWS,'Remove failed: Reached the minimum amount of reviews (current: '+this.reviews.length+')');
		log.push('Remove failed: Reached the minimum amount of reviews (current: '+this.reviews.length+')');
	}
};

//remove like
Hotel.prototype.removeLike = function () {
   	if(this.likes>0){
   		this.likes--;
   		this.emit(eventsConfig.events.LIKE_REMOVE,'Like has been removed (current: '+this.likes+')');
   		log.push('Like has been removed (current: '+this.likes+')');
   	}
   	else{
		this.emit(eventsConfig.errors.MIN_LIKES,'Remove failed: Reached the minimum amount of likes (current: '+this.likes+')');
		log.push('Remove failed: Reached the minimum amount of likes (current: '+this.likes+')');
   	}
};

//add like
Hotel.prototype.addLike = function () {
	this.likes++;
	this.emit(eventsConfig.events.LIKE_ADD,'Like has been added (current: '+this.likes+')');
	log.push('Like has been added (current: '+this.likes+')');
};

//print the log file
Hotel.prototype.printLog = function(){
	//split it to lines
	return log.toString().split(',').join("\n");
}


module.exports = Hotel;



