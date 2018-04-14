console.log("javascript works")

$("#goButton").on("click", function () {
    //start OMDB API CALL **********
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


});


$("#showtimeButton").on("click", function () {

    var userZipCodeInput = $("#zipCodeField").val().trim();
    console.log(userZipCodeInput);

    $("#dateField").attr("pattern", "[0-9]{4}-[0-9]{2}-[0-9]{2}");
    var userDateInput = $("#dateField").val().trim();
    console.log(userDateInput);

    if ((userZipCodeInput === "") || (userDateInput === "")) {
        $("#missingInput").html("Missing input. Please input a zip code and a date.")
    } else {
        displayShowtimes();
    }

});

//   IN THIS BLOCK OF CODE I NEED TO CHANGE THE ID TO RECOGNIZE THE NAME OF THE MOVIE
$("#showtimeButton").on("click", function () {

    var userZipCodeInput = $("#zipCodeField").val().trim();
    console.log(userZipCodeInput);

    $("#dateField").attr("pattern", "[0-9]{4}-[0-9]{2}-[0-9]{2}");
    var userDateInput = $("#dateField").val().trim();
    console.log(userDateInput);

    if ((userZipCodeInput === "") || (userDateInput === "")) {
        $("#missingInput").html("Missing input. Please input a zip code and a date.")
    } else {
        displayShowtimes();
    }

});

function displayShowtimes() {
    $("#missingInput").remove();

    var userZipCodeInput = $("#zipCodeField").val().trim();
    var userDateInput = $("#dateField").val().trim();

    var queryShowtimeURL = "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + userDateInput + "&zip=" + userZipCodeInput + "&api_key=c8v7sma8c67xv5zkxcd7ndb6";

    $.ajax({
        url: queryShowtimeURL,
        method: "GET"
    }).then(function (results) {
        console.log(results)

        for (var i = 0; i < results.length; i++) {
            var title = results[i].title;
            console.log(title);
            for (j = 0; j < results[i].showtimes.length; j++){
                var theaterName = results[i].showtimes[j].theatre.name;
                var showtimesDisplay = results[i].showtimes[j].dateTime;

                console.log(theaterName);
                console.log(showtimesDisplay);
            }
            



            // var createTDtitle = $("<td>").html(title);

            // $("#showtimeTable").append(createTDtitle);
        }

        // for (i = 0; i < results.length; i++) {

        //     var movieName = results[i].title;
        //     var theaterName = results[i].showtimes[i].theatre.name;   // I think this line may cause a problem, b/c the number of showtimes will be less than the number of movies
        //     var showtimesDisplay = results[i].showtimes[i].dateTime;

        //     var createTDtitle = $("<td>").html(movieName);
        //     var createTDtheater = $("<td>").html(theaterName);
        //     var createTDtimes = $("<td>").html(showtimesDisplay);

        //     var createTRtitle = $("<tr>").append(createTDtitle, createTDtheater, createTDtimes);

        //     $("#showtimeTable").append(createTRtitle);


        // }
    });




};


    var userMovieInputYT = $("#movieInput").val().trim() + "official movie trailer";
    var youTubeAPI = {
        url: "https://www.googleapis.com/youtube/v3/search",
        part: "?part=snippet",
        results: "&maxResults=1",
        type: "&type=video",
        q: "&q=" + userMovieInputYT,
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


    //end youTube API CALL *************

});
//enter button code*************
function enter() {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("goButton").click();
    }

}

var input = document.getElementById("movieInput");
input.addEventListener("keyup", enter);
//end enter button function *********
