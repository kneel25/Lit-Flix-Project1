console.log("javascript works")
$("#goButton").on("click", function () {
    //start OMDB API CALL -kn **********
    var userMovieInput = $("#movieInput").val().trim();
    console.log(userMovieInput);
    var queryURL = "https://www.omdbapi.com/?t=" + userMovieInput + "&y=&plot=full&apikey=6c0bb571";
    //ajax function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        //poster
        var imgPoster = response.Poster;
        var posterDiv = $("<img>").attr("src", imgPoster);
        $("#image-poster").html(posterDiv);
        //description
        var description = response.Plot;
        var descriptionDiv = $("<p>").html("Description: " + description);
        $("#description").html(descriptionDiv);
        console.log(descriptionDiv)
        //rating
        var rating = response.Rated;
        var ratingDiv = $("<p>").html("Rating: " + rating);
        $("#rating").html(ratingDiv);
        //runtime
        var runTime = response.Runtime;
        var runTimeDiv = $("<p>").html("Run Time: " + runTime);
        $("#runtime").html(runTimeDiv);
        //release date
        var releaseDate = response.Released;
        var releaseDateDiv = $("<p>").html("Release Date: " + releaseDate);
        $("#releasedate").html(releaseDateDiv);
    });
    // youTube API call for all movie trailers entered from search bar. -cr ******************
    var userMovieInputYT = $("#movieInput").val().trim() + "official movie trailer";
    youtubeFunc(userMovieInput);
    // end youTube API call************
}); // end of gobutton onclick function
$("#showtimeButton").on("click", function () {
    var userZipCodeInput = $("#zipCodeField").val().trim();
    console.log(userZipCodeInput);
    $("#dateField").attr("pattern", "[0-9]{4}-[0-9]{2}-[0-9]{2}");
    var userDateInput = $("#dateField").val().trim();
    console.log(userDateInput);
    if ((userZipCodeInput === "") || (userDateInput === "")) {
        $("#missingInput").html("Missing input. Please input a zip code and a date.")
    } else {
        findMovies();
    }
}); // end of showtimeButton onclick function
function findMovies() {
    $("#missingInput").html("");
    var newSearchButton = $("<button>").attr("class", "btn btn-default");
    $(newSearchButton).attr("type", "button");
    $(newSearchButton).attr("id", "searchNewMovie");
    $(newSearchButton).html("Search for a new movie");
    $("#searchButtons").append(newSearchButton);
    var userZipCodeInput = $("#zipCodeField").val().trim();
    var userDateInput = $("#dateField").val().trim();
    var queryShowtimeURL = "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + userDateInput + "&zip=" + userZipCodeInput + "&api_key=c8v7sma8c67xv5zkxcd7ndb6";
    $.ajax({
        url: queryShowtimeURL,
        method: "GET"
    }).then(function (results) {
        console.log(results)
        var infoLeftSide = results.slice(0, (results.length / 2));
        var infoRightSide = results.slice((results.length / 2));
        console.log(infoLeftSide);
        console.log(infoRightSide);
        for (h = 0; h < infoLeftSide.length; h++) {
            var titleDisplayLeft = infoLeftSide[h].title;
            var createPtagLeft = $("<p>").html(titleDisplayLeft);
            $(createPtagLeft).attr("class", "moviesForList");
            $(createPtagLeft).attr("id", infoLeftSide[h].title);
            $("#leftSide").append(createPtagLeft);
        };
        for (w = 0; w < infoRightSide.length; w++) {
            var titleDisplayRight = infoRightSide[w].title;
            var createPtagRight = $("<p>").html(titleDisplayRight);
            $(createPtagRight).attr("class", "moviesForList");
            $(createPtagRight).attr("id", infoRightSide[w].title);
            $("#rightSide").append(createPtagRight);
        };
        $(document).on('click', '.moviesForList', function () {
            var clicked = this.id; // creates a variable to represent the value of the id of the movie clicked on from the currently in theaters list
            console.log(clicked);
            console.log(results);
            for (r = 0; r < results.length; r++) {
                if (results[r].title === clicked) {
                    console.log("found a match")
                    console.log(r);
                    for (z = 0; z < results[r].showtimes.length; z++) {
                        var theatreDisplay = results[r].showtimes[z].theatre.name;
                        var showtimesDisplay = results[r].showtimes[z].dateTime;
                        console.log(theatreDisplay);
                        console.log(showtimesDisplay);
                        var timeDisplay = showtimesDisplay.slice(11);
                        var dateDisplay = showtimesDisplay.slice(0, 10);

                        console.log(dateDisplay);

                        function convert(input) {
                            return moment(input, 'HH:mm:ss').format('h:mm A');
                        }
                        console.log(convert(timeDisplay));
                        var createTDtheatre = $("<td>").html(theatreDisplay);
                        var createTDshowtimes = $("<td>").html(convert(timeDisplay));
                        var createTR = $("<tr>").append(createTDtheatre, createTDshowtimes);
                        $("#showtimeTable").append(createTR);
                    };

                    $("#theatresLabel").html("Theatres Playing " + clicked + " in " + userZipCodeInput);
                    var dateLabel = moment(userDateInput).format("MMMM Do YYYY");
                    console.log(dateLabel);
                    $("#showtimesLabel").html("Showtimes on " + dateLabel);
                } else {
                    continue;
                }
            };

        });
    });
}; // end of findMovies function
$(document).on('click', '#searchNewMovie', function () {
    $("#zipCodeField").val("");
    $("#dateField").val("");
    $("#searchNewMovie").remove();
    $("#leftSide").html("");
    $("#rightSide").html("");
    $("#showtimeTable").html("");
});
//enter button code -az *************
function enter() {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("goButton").click();
    }
}
var input = document.getElementById("movieInput");
input.addEventListener("keyup", enter);
//end enter button function *********
//this is the yuotTube API call for the top 8 posters from the header -kn*************
$('.trailer-image').on('click', function (e) {
    e.preventDefault();
    var userMovieInputYT = this.title;
    youtubeFunc(userMovieInputYT);
    //end second youTube API call for header movies **************
})
//This is stating the function for YouTube API once, so we can use "youtubefunc" in multiple places. -kn ************
function youtubeFunc(input) {
    var youTubeAPI = {
        url: "https://www.googleapis.com/youtube/v3/search",
        part: "?part=snippet",
        results: "&maxResults=1",
        type: "&type=video",
        q: "&q=" + input + " official movie trailer",
        videoEmbed: "&videoEmbeddable=true",
        key: "&key=AIzaSyA48DgSrZgc7HxXqMqf1nwRIgn7pfYq_Ig"
    };
    $.ajax({
            url: youTubeAPI.url + youTubeAPI.part + youTubeAPI.results + youTubeAPI.type + youTubeAPI.q + youTubeAPI.videoEmbed + youTubeAPI.key,
            method: "GET"
        })
        .done(function (response) {
            console.log(response);
            for (var i = 0; i < response.items.length; i++) {
                var trailerDiv = $("<div>");
                trailerDiv.addClass('column box youtubeBox');
                var videoFrameDiv = $('<div>');
                var videoFrame = $('<iframe>');
                var videoUrl = 'https://www.youtube.com/embed/';
                videoFrame.attr({
                    src: videoUrl + response.items[i].id.videoId + "?version=3",
                    width: 400,
                    height: 320,
                    frameborder: 0
                });
                trailerDiv.html(videoFrameDiv);
                videoFrameDiv.html(videoFrame);
                $('.trailer').html(trailerDiv);
            }
        });
}
// END YOUTUBE API FUNCTION CALL STATEMENT -kn ****************