// Global Variables
var cityValue;
// Functions

function loadPageSection(sectionId) {
	debugger;
	// hide all page sections
	$(".page-section").addClass("section-hide");
	// show desired section
	$(sectionId).removeClass("section-hide");
}

/**
 * As a User I can browse vacation destinations.
 * When I click or enter the search button I browse the city
 */

function loadCityFromSearch() {
	// code goes here
	// get the city name
	let city = "";
	// call function to display city
	loadCityData(city);
}
/**Develop a js function to search for a city in the popular travel destinations. */
function loadCityFromPopular() {
	// code goes here
	// get the city name
	let city = "";
	// call function to display city
	loadCityData(city);
}

function loadCityData(city) {
	// show page html section
	loadPageSection("#city-details-page");
	// load city info
	loadCityInfo(city);
	// load city weather
	loadCityWeather(city);
	// load city todos
	loadCityTodos(city);
	// load city photos
	loadCityPhotos(city);
	// load city map
	loadCityMap(city);
}

function loadCityInfo(city) {}
function loadCityWeather(city) {}
function loadCityTodos(city) {}
function loadCityPhotos(city) {}
function loadCityMap(city) {}

// On Document Ready (events)

//When I click or enter the search button I browse the city
$(document).ready(function () {
	// carousel init.
	$(".carousel").carousel();
	$(".search-button").on("click", loadCityFromSearch);
	// when I click suggested destinations i get city info
	$(".top-destinations").on("click", loadCityFromPopular);

	//upon click and value given. inputs the city they would like to vacation to and the cityValue
	//would be entered into the URL and a specific query could be made
	var mapBoxPoi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?types=poi&access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ`;

	$.ajax({
		url: mapBoxPoi,
		method: "GET",
	}).then(function (response) {
		console.log(response);
	});
});
