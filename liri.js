var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var twitter = require("twitter");
var opn = require("opn");

var userInput = "";
var movieInput = "";
var songInput = "";

if (process.argv[2] === "my-tweets") {
process.argv[3] = userInput;

//Tried to get the information from twitter but I keep getting a bad authentication data error

//I know I have to pass the tokens into the get request to authorize myself, but with no API key parameter in the URL I can add to it
//I am getting the keys object from the keys.js file but twitter cannot see that. I have to set it to a variable maybe that twitter can see? Although I've tried that. 

//Once I receive the tweets from the twitter API, I would console log them if there are 20 of them.  
request("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=Noble_Bomba&count=5", function(error, response, body) {
	console.log("error: ", error);
	console.log("statusCode: ", response && response.statusCode);
	console.log(body);
});
}

else if (process.argv[2] === "movie-this") {
	getMovieInfo();
}

else if(process.argv[2] === "spotify-this-song") {
spotifySong();

}

else if (process.argv[2] === "do-what-it-says") {
	doWhatItSays();
}

function getMovieInfo() {
movieInput = process.argv[3];

request('http://www.omdbapi.com/?apikey=5ef9051d&t=' + movieInput, function (error, response, body) {
	body = JSON.parse(body);

	// I know I need to add the default movie function here. 
	// Tried to find test for "undefined" and if data.Ratings === "undefined"
	// If "user doesn't input a movie" gets "mr. nobody" back instead
	// else they get whatever the entered 
	// parameter check would come before the else statement just in case 

	

	console.log('error:', error); 
	console.log('statusCode:', response && response.statusCode); 
	console.log(body.Ratings);
	
	console.log("Title: ", body.Title); 
	console.log("Year: ", body.Year); 
	console.log("IMDB Rating: ", body.imdbRating);
	console.log("Rotten Tomatoes Rating: ", body.Ratings[1].Value);
	console.log("Country Where it was Produced: " + body.Country);
	console.log("Language: ", body.Language);
	console.log("Plot: ", body.Plot);
	console.log("Actors: ", body.Actors); 


	
});
}

function defaultMovie() {
	movieInput = "Mr. Nobody";

	request('http://www.omdbapi.com/?apikey=5ef9051d&t=' + movieInput, function (error, response, body) {
	console.log('error:', error); 
	console.log('statusCode:', response && response.statusCode); 
	console.log(body);
	body = JSON.parse(body);	
	console.log("Title: ", body.Title); 
	console.log("Year: ", body.Year); 
	console.log("IMDB Rating: ", body.imdbRating);
	console.log("Rotten Tomatoes Rating: ", body.Ratings[1].Value);
	console.log("Country Where it was Produced: " + body.Country);
	console.log("Language: ", body.Language);
	console.log("Plot: ", body.Plot);
	console.log("Actors: ", body.Actors);  
});
}

function spotifySong() {
var spotify = new Spotify({
id: "912e609d77634af097fba3cd0adbcaa7",
secret: "70fa7563ec214530926433560598bd40"
});

songInput = process.argv[3];

spotify.search({ type: 'track', query: songInput, limit: 1}, function(err, data) {
if (err) {
return console.log('Error occurred: ' + err);
}

if (data.tracks.items.length === 0){
defualtSpotify();
return false;
}

console.log("Song: ", data.tracks.items[0].name);
for(i=0; i<data.tracks.items[0].album.artists.length; i++){
	console.log("Artist: ", data.tracks.items[0].album.artists[0].name);
	

	

}
	console.log("Link to Song: ", data.tracks.items[0].external_urls.spotify);
	console.log("Album: " + data.tracks.items[0].album.name);
	opn(data.tracks.items[0].external_urls.spotify, {wait: false});
});
}


function defualtSpotify() {
var spotify = new Spotify({
id: "912e609d77634af097fba3cd0adbcaa7",
secret: "70fa7563ec214530926433560598bd40"
});

songInput = "The Sign Ace Of Base";

spotify.search({ type: 'track', query: songInput, limit: 1}, function(err, data) {
if (err) {
return console.log('Error occurred: ' + err);
}

console.log("Song: ", data.tracks.items[0].name);
for(i=0; i<data.tracks.items[0].album.artists.length; i++){
	console.log("Artist: ", data.tracks.items[0].album.artists[0].name);
	

}
	console.log("Link to Song: ", data.tracks.items[0].external_urls.spotify);
	console.log("Album " + data.tracks.items[0].album.name);
	opn(data.tracks.items[0].external_urls.spotify, {wait: false});
});
}

function doWhatItSays() {
	 fs.readFile("random.txt", "utf8", function(error, data) {
      console.log(data);
      data = data.split(",");
      console.log(data);
      process.argv[2] = data[0];
      process.argv[3] = data[1];
      spotifySong();
    });
}





