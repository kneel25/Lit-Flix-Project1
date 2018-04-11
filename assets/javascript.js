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
        var descriptionDiv = $("<p>").html(description);
        $("#movie-rating").append(descriptionDiv);

        var rating = response.Rated;
        var ratingDiv = $("<p>").html(rating);
        $("#movie-rating").append(ratingDiv);
    });


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

            $('#trailer').html(trailerDiv);
        }

    });
    });


