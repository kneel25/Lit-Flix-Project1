console.log("javascript works")

$("#goButton").on("click", function () {

    var userMovieInput = $("#movieInput").val().trim();
    console.log(userMovieInput);


    var queryURL = "https://www.omdbapi.com/?t=" + userMovieInput + "&y=&plot=full&apikey=6c0bb571";
    //ajax function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        var imgPoster = response.Poster;
        var posterDiv = $("<img>").attr("src", imgPoster);
        $("#poster").html(posterDiv);

        var description = response.Plot;
        var descriptionDiv = $("<p>").html("Description: " + description);
        $("#description").html(descriptionDiv);
        console.log(descriptionDiv)

        var rating = response.Rated;
        var ratingDiv = $("<p>").html("Rating: " + rating);
        $("#rating").html(ratingDiv);

        var runTime = response.Runtime;
        var runTimeDiv = $("<p>").html("Run Time: " + runTime);
        $("#runtime").html(runTimeDiv);

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



