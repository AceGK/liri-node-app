const axios = require('axios');
const fs = require("fs");
const keys = require("./keys.js");
var moment = require('moment');

moment().format();

fs.readFile('random.txt', "utf-8", function(err, res, data){
});

const userInput = process.argv[2];
const userQuery = process.argv.slice(3).join(" ");;


// OMDB
const movieThis = function (userQuery) {
    axios.get(`http://www.omdbapi.com/?t=${userQuery}&y=&plot=short&apikey=trilogy`).then(
        function (response) {
            let movieData = [
                "Title: " + response.data.Title,
                "Year: " + response.data.Year,
                "Rated: " + response.data.Rated,
                "Released: " + response.data.Released,
                "Runtime: " + response.data.Runtime,
                "Director: " + response.data.Director,
                "Writer: " + response.data.Writer,
                "Actors: " + response.data.Actors,
                "Plot: " + response.data.Plot,
                "Country: " + response.data.Country,
                "Awards: " + response.data.Awards,
                "imdbRating: " + response.data.imdbRating,
            ];
            console.log(movieData);
            fs.appendFile("log.txt", movieData, function (err) {
                if (err) throw err;
            });
        });
};


//BANDS IN TOWN 
const concertThis = function (userQuery) {
    axios.get(`https://rest.bandsintown.com/artists/${userQuery}/events?app_id=codingbootcamp`).then(
        function (response) {
            let concertData = [
                "Band: " + userQuery,
                "Venue: " + response.data[0].venue.name,
                "Venue: " + response.data[0].venue.country,
                "Venue: " + response.data[0].venue.city,
                "Date: " + response.data[0].datetime,
                "URL: " + response.data[0].url,
            ];
            console.log(concertData);
            fs.appendFile("log.txt", concertData, function (err) {
                if (err) throw err;
            });
        });
};




// RANDOM
const doWhatItSays = function(){
    fs.readFile('random.txt', 'utf-8', function(err, res, data) {
        movieThis(res);
    });
};



switch (userInput) {

    case 'movie-this':
        movieThis(userQuery);
        break;

    case 'concert-this':
        concertThis(userQuery);
        break;

    case 'do-what-it-says':
        doWhatItSays();
        break;

}


