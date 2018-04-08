console.log("test")

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
        $("#poster").append(posterDiv);

        var description = response.Plot;
        var descriptionDiv = $("<p>").html("Description: " + description);
        $("#movie-rating").append(descriptionDiv);

        var rating = response.Rated;
        var ratingDiv = $("<p>").html("Rating: " + rating);
        $("#movie-rating").append(ratingDiv);



    });

});