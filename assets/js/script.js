// Global Variables
var activeCityData;

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
	e.preventDefault();
	// get the city name
	let city = "";
	city = $("#searchId").val();
	//removing white spaces from start and end
	var cityTrim = city.trim();
	//force the user to enter string
	if (
		cityTrim !== "" &&
		typeof cityTrim === "string" &&
		cityTrim.toLowerCase().match(/^[a-z ]+$/)
	) {
		// call function to display all city data
		loadCityData(city);
	} else {
		//remove the invalid input entered by user
		$("#searchId").val("");
		// send an error message through the placeholder attr
		$("#searchId").removeAttr("placeholder");
		//message through the placeholder
		$("#searchId").attr("placeholder", "You must enter a valid city name");
		//	And class to change the placeholder color
		$("#searchId").addClass("placeColor");
	}
}
/**
 * Develop a js function to search for a city in the popular travel destinations.
 */
function loadCityFromPopular() {
	// get the city name
	let city = "";
	city = $(this).attr("data-name");
	// call function to display all city data
	loadCityData(city);
}

function loadCityData(city) {
	var mapBoxPoi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ&types=place`;
	$.getJSON(mapBoxPoi, function (json) {
		if (json.features.length == 0) {
			alert("Please enter a valid city");
			return;
		}
		activeCityData = json.features[0];
		// show page html section
		loadPageSection("#city-details-page");
		// load city info
		loadCityInfo(activeCityData);
		// load city weather
		loadCityWeather(activeCityData);
		// load city POIs
		loadPoiData(activeCityData);
		// load city photos
		loadCityPhotos(activeCityData);
		// load city map
		loadCityMap(activeCityData);
	}).fail(function (err) {
		alert(
			"Please enter a valid city. Error: " + err.responseJSON.error.message
		);
	});
}

/**
 * When the user search a city or click on the suggested destinations this function load
 * the city info to display on the city details page given a parameter (city)
 */
function loadCityInfo(cityData) {
	// set city name
	$("#current-city-data").text(`${cityData.place_name}`);
}

/**
 * Load city weather to display on the city details page given a parameter (city)
 */
function loadCityWeather(activeCityData) {
	//API key
	var key = "df00607ac86544829aa40423201905";
	//Days forecast
	var days = 2;
	//API Url
	var queryUrl = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${activeCityData.place_name}&days=${days}`;

	// ajax here (getting the json object)
	$.getJSON(queryUrl, function (json) {
		var cityName = json.location.name;
		var date = new Date(json.location.localtime).toDateString();
		var iconUrl = "https:" + json.forecast.forecastday[0].day.condition.icon;
		var uv = json.current.uv;

		//display the json data on the page
		$("#icon").append(`<img src="${iconUrl}">`);
		$("#current-city").html(`${cityName}`);
		$("#current-date").text(`${date}`);
		$("#temp").text(" " + json.current.temp_f + " °F");
		$("#humidity").text(" " + json.current.humidity + " %");
		$("#uv-index").text("  " + uv);
	});
}

/**function to load POI info */
function loadPoiData(activeCityData) {
	// get restaurant data within boundry box
	var restaurantSearch = `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurants.json?access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ&types=poi&bbox=${activeCityData.bbox}`;
	$.getJSON(restaurantSearch, function (json) {
		for (var i = 0; i < 3 && i < json.features.length; i++) {
			$("#restaurant-" + (i + 1)).html(json.features[i].text);
		}
	});

	// get shopping data within boundry box
	var shopSearch = `https://api.mapbox.com/geocoding/v5/mapbox.places/clothing.json?access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ&types=poi&bbox=${activeCityData.bbox}`;
	$.getJSON(shopSearch, function (json) {
		for (var i = 0; i < 3 && i < json.features.length; i++) {
			$("#shop-" + (i + 1)).html(json.features[i].text);
		}
	});

	// get todo data from boundry box
	var todoSearch = `https://api.mapbox.com/geocoding/v5/mapbox.places/nightclub.json?access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ&types=poi&bbox=${activeCityData.bbox}`;
	$.getJSON(todoSearch, function (json) {
		for (var i = 0; i < 3 && i < json.features.length; i++) {
			$("#todo-" + (i + 1)).html(json.features[i].text);
		}
	});
}

/**function load city map */
function loadCityMap(activeCityData) {
	mapboxgl.accessToken =
		"pk.eyJ1IjoieXN0YW1hcml0cSIsImEiOiJja2F0c3J4c3UwMGM4MzNxcmFzZXh4N2RhIn0.vnaQ1AHB9ra3v9k4RPecoQ";
	var map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/streets-v11",
		center: activeCityData.center,
		zoom: 5,
		pitch: 45,
		antialias: true,
	});
	//added the marker
	var marker = new mapboxgl.Marker()
		.setLngLat(activeCityData.center)
		.addTo(map);

	// added full screen control to the user
	map.addControl(new mapboxgl.FullscreenControl());

	// added directions
	map.addControl(
		new MapboxDirections({
			accessToken: mapboxgl.accessToken,
		}),
		"top-left"
	);
}

// function loadCityPhotos(city) {
function loadCityPhotos(activeCityData) {
	// remove previous photos, if any
	$(".carousel").empty();
	var flickerURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=bfab214383112313808fbee8bd7fad3e&tags=${activeCityData.place_name}+city%2C+${activeCityData.place_name}+monuments%2C+${activeCityData.place_name}+sunset%2C+${activeCityData.place_name}+beach%2C&safe_search=1&content_type=1&geo_context=2&format=json&nojsoncallback=1`;
	// ajax here (getting the json object)
	$.getJSON(flickerURL, function (json) {
		for (var i = 0; i < 5; i++) {
			var flickerPictureFarmIdOne = json.photos.photo[i].farm;
			var flickerServerIdOne = json.photos.photo[i].server;
			var flickerPictureIdOne = json.photos.photo[i].id;
			var flickerSecretIdOne = json.photos.photo[i].secret;

			var imageURL = `https://farm${flickerPictureFarmIdOne}.staticflickr.com/${flickerServerIdOne}/${flickerPictureIdOne}_${flickerSecretIdOne}.jpg`;

			$(".carousel").append(`<img src=${imageURL} class="carousel-item">`);
		}
		$(".carousel").carousel();
	});
}
/**
 * plan vacation function
 */
function planVacation() {
	loadPageSection("#plan-vacation-page");
}
/**Date picker function */
$(function () {
	var dateFormat = "mm/dd/yy",
		from = $("#from")
			.datepicker({
				defaultDate: "+1w",
				changeMonth: true,
				numberOfMonths: 3,
			})
			.on("change", function () {
				to.datepicker("option", "minDate", getDate(this));
			}),
		to = $("#to")
			.datepicker({
				defaultDate: "+1w",
				changeMonth: true,
				numberOfMonths: 3,
			})
			.on("change", function () {
				from.datepicker("option", "maxDate", getDate(this));
			});

	function getDate(element) {
		var date;
		try {
			date = $.datepicker.parseDate(dateFormat, element.value);
		} catch (error) {
			date = null;
		}

		return date;
	}
});
/**get textarea input for vacation notes */

$("input#my-notes").click(function(e) {
	e.preventDefault();
    var vacationNotes = $('textarea#myNotes').val();
   console.log(vacationNotes)
});

function goHome() {
	loadPageSection("#home-page");
}

// On Document Ready (events)
$(document).ready(function () {
	// When I click or enter the search button I browse the city
	$(".search-button").on("click", loadCityFromSearch);
	// When I click suggested destinations I get city info
	$(".top-destinations").on("click", loadCityFromPopular);
	//When I click the plan vacation button
	$("#plan-vacation-btn").on("click", planVacation);
	//When I click home on nav bar
	$("#home").on("click", goHome);
});
