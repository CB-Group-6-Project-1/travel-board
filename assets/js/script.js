// Global Variables

// Functions

function loadPageSection(sectionId) {
	// hide all page sections
	$(".page-section").addClass("section-hide");
	// show desired section
	$(sectionId).removeClass("section-hide");
}

/**
 * As a User I can browse vacation destinations.
 * When I click or enter the search button I browse the city
 */

function loadCityFromSearch(e) {
	// get the city name
	e.preventDefault();
	let city = "";
	city = $("#searchId").val();
	console.log(city);
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
	// // load city todos
	// loadCityTodos(city);
	// // load city photos
	// loadCityPhotos(city);
	// // load city map
	// loadCityMap(city);
}

/**
 * When the user search a city or click on the suggested destinations this function load
 * the city info to display on the city details page given a parameter (city)
 */
function loadCityInfo(city) {
	var mapBoxPoi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?types=poi&access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ`;
	$.getJSON(mapBoxPoi, function (json) {
		var test = json.features;

		console.log(test);
	});
}

/**
 * Load city weather to display on the city details page given a parameter (city)
 */
function loadCityWeather(city) {
	//API key
	var key = "df00607ac86544829aa40423201905";
	//Days forecast
	var days = 2;
	//API Url
	var queryUrl = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${days}`;

	// ajax here (getting the json object)
	$.getJSON(queryUrl, function (json) {
		var cityName = json.location.name;
		var date = new Date(json.location.localtime).toDateString();
		var iconUrl = "https:" + json.forecast.forecastday[0].day.condition.icon;
		var uv = json.current.uv;

		//display the json data on the page (template to be used)
		$("#current-city").html(`${cityName} -- ${date}  <img src="${iconUrl}">`);
		$("#temp").text(" " + json.current.temp_f + " °F");
		$("#humidity").text(" " + json.current.humidity + " %");
		$("#wind").text(" " + json.current.wind_mph + " MPH");
		$("#uv-index").text("  " + uv);
	});
}

// function loadCityTodos(city) {}
// function loadCityPhotos(city) {}
// function loadCityMap(city) {}

// On Document Ready (events)
$(document).ready(function () {
	// carousel init.
	$(".carousel").carousel();
	// When I click or enter the search button I browse the city
	$(".search-button").on("click", loadCityFromSearch);
	// When I click suggested destinations I get city info
	$(".top-destinations").on("click", loadCityFromPopular);
});
