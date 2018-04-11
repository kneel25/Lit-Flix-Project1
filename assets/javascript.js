console.log("test")

$("#goButton").on("click", function () {

    var userMovieInput = $("#movieInput").val().trim();
    console.log(userMovieInput);

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
