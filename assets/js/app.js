var searchTerms = ["BMW", "Tesla", "Lamborghini"];

$(document).ready(function(){
    initButtons();
});

function initButtons(){
    for(i = 0; i < searchTerms.length; i++){
        newButton(searchTerms[i]);
    }
}

function newButton(text){
    var newButton = $("<button>");
    newButton.addClass("btn search");
    newButton.attr("data-car", text);
    newButton.text(text);
    $(".search-buttons").append(newButton);
}

$(document).on("click", ".search", function () {
    $("#car-gifs").empty();
    var car = $(this).attr("data-car");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        car + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var carDiv = $("<div>");

            var p = $("<p>").text("Rating: " + results[i].rating);

            var carImage = $("<img>");
            carImage.attr("src", results[i].images.fixed_height.url);
            carImage.attr("data-still", results[i].images.fixed_height_still.url );
            carImage.attr("data-animate", results[i].images.fixed_height.url);
            carImage.addClass("gif");
            carDiv.addClass("d-inline-block p-2");
            carDiv.append(p);
            carDiv.append(carImage);

            $("#car-gifs").prepend(carDiv);
        }
    });
});

$(".submit-button").click(function () {
    newButton($(".new-car").val());
});

$(document).on("click", ".gif", function() {

    var state = $(this).attr("data-state");
    console.log(state);

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });