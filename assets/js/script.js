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
	// call function to display all city data
	loadCityData(city);
	loadRestaurantData(city);
}
/**
 * Develop a js function to search for a city in the popular travel destinations.
 */
function loadCityFromPopular() {
	// get the city name
	let city = "";
	city = $(this).attr("data-name");
	console.log("Hi" + city);
	// call function to display all city data
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
	loadCityMap(city);
}

/**
 * When the user search a city or click on the suggested destinations this function load
 * the city info to display on the city details page given a parameter (city)
 */
function loadCityInfo(city) {
	var mapBoxPoi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ&types=place`;
	$.getJSON(mapBoxPoi, function (json) {
		//TODOs
		var cityDataName = json.features[0].place_name;
		$("#current-city-data").html(`${cityDataName}`);
			
	});
}
/**get latitude and longitude from query */
function getLatLon(city) {
	var mapBoxPoi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ&types=place`;
	$.getJSON(mapBoxPoi, function (json) {
		//TODOs
		var lat = json.features[1].center[0];
		var lon = json.features[1].center[1];
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

		//display the json data on the page
		$("#current-city").html(`${cityName} -- ${date}  <img src="${iconUrl}">`);
		$("#temp").text(" " + json.current.temp_f + " °F");
		$("#humidity").text(" " + json.current.humidity + " %");
		$("#uv-index").text("  " + uv);
	});
}
/**function to load restaurant info */
function loadRestaurantData(city) {
	var mapBoxPoi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ&types=place`;
	$.getJSON(mapBoxPoi, function (json) {
		var cityBbox1 = json.features[0].bbox[0]
		var cityBbox2 = json.features[0].bbox[1]
		var cityBbox3 = json.features[0].bbox[2]
		var cityBbox4 = json.features[0].bbox[3]
		var bBox = [cityBbox1, cityBbox2, cityBbox3, cityBbox4]
	
		var restaurantSearch = `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurants.json?access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ&types=poi&bbox=${bBox}`;
		$.getJSON(restaurantSearch, function (json) {
			var restaurant1 = json.features[0].text;
			var restaurant2 = json.features[1].text;
			var restaurant3 = json.features[2].text;
			
			$("#restaurant-1").html(restaurant1);
			$("#restaurant-2").html(restaurant2);
			$("#restaurant-3").html(restaurant3);
		})
		var shopSearch = `https://api.mapbox.com/geocoding/v5/mapbox.places/clothing.json?access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ&types=poi&bbox=${bBox}`;
		$.getJSON(shopSearch, function (json) {
			var shop1 = json.features[0].text;
			var shop2 = json.features[1].text;
			var shop3 = json.features[2].text;
			
			$("#shop-1").html(shop1);
			$("#shop-2").html(shop2);
			$("#shop-3").html(shop3);
		})
	});
	
}
// function loadCityTodos(city) {}
// function loadCityPhotos(city) {}
function loadCityMap(city) {
	mapboxgl.accessToken =
		"pk.eyJ1IjoieXN0YW1hcml0cSIsImEiOiJja2F0c3J4c3UwMGM4MzNxcmFzZXh4N2RhIn0.vnaQ1AHB9ra3v9k4RPecoQ";
	var map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/streets-v11",
	});
}

// On Document Ready (events)
$(document).ready(function () {
	// carousel init.
	$(".carousel").carousel();
	// When I click or enter the search button I browse the city
	$(".search-button").on("click", loadCityFromSearch);
	// When I click suggested destinations I get city info
	$(".top-destinations").on("click", loadCityFromPopular);
});
