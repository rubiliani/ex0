var eventEmitter = require('events');
var eventsConfig = require('./modules/config');
var Hotel = require("./modules/hotel");
var http = require('http');

//create new hotel instance
var myHotel = new Hotel("crown plaza");

//stars events listeners
myHotel.on(eventsConfig.events.STAR_ADD,function(data){
	console.log(data);
});
myHotel.on(eventsConfig.events.STAR_REMOVE,function(data){
	console.log(data);
});
myHotel.on(eventsConfig.events.STAR_SET,function(data){
	console.log(data);
});
myHotel.on(eventsConfig.errors.MAX_STARS,function(data){
	console.log(data);
});
myHotel.on(eventsConfig.errors.MIN_STARS,function(data){
	console.log(data);
});
myHotel.on(eventsConfig.errors.RANGE_STARS,function(data){
	console.log(data);
});

//review events listeners
myHotel.on(eventsConfig.events.REVIEW_ADD,function(data){
	console.log(data);
});
myHotel.on(eventsConfig.events.REVIEW_REMOVE,function(data){
	console.log(data);
});
myHotel.on(eventsConfig.errors.MIN_REVIEWS,function(data){
	console.log(data);
});

//likes events listeners
myHotel.on(eventsConfig.events.LIKE_ADD,function(data){
	console.log(data);
});
myHotel.on(eventsConfig.events.LIKE_REMOVE,function(data){
	console.log(data);
});
myHotel.on(eventsConfig.errors.MIN_LIKES,function(data){
	console.log(data);
});



// some operations
myHotel.addStar();
myHotel.removeStar();
myHotel.removeLike();
myHotel.removeStar();
myHotel.setStars(6);
myHotel.setStars(5);
myHotel.addReview("Rubi","Really great hotel");
myHotel.addReview("Moshe","Nice and clean");
myHotel.addReview("Ran","No booze!");
myHotel.removeLastReview();
myHotel.addLike();
myHotel.addStar();
myHotel.removeStar();


//creating server and send the log data as response
http.createServer(function(req, res){
	res.writeHead(200); //status OK
	res.write(myHotel.printLog());
	res.end();
}).listen(8080);


