// Global Variables
var cityValue;
// Functions

/**
 * As a User I can browse vacation destinations.
 * When I click or enter the search button I browse the city
 */
function browseDestination() {
	// code goes here
}
/**Develop a js function to search for a city in the popular travel destinations. */
function browseTopDestinations() {
	// code goes here
}
// On Document Ready (events)

//When I click or enter the search button I browse the city
$(document).ready(function () {
	$(".search-button").on("click", browseDestination);
	// when I click suggested destinations i get city info
	$(".top-destinations").on("click", browseTopDestinations);
});

//upon click and value given. inputs the city they would like to vacation to and the cityValue
//would be entered into the URL and a specific query could be made
var mapBoxPoi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityValue}.json?types=poi&access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ`;

$.ajax({
	url: mapBoxPoi,
	method: "GET",
}).then(function (response) {
	console.log(response);
});
