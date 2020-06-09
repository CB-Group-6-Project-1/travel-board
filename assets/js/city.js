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
		$("#searchId").val("");
	} else {
		//remove the invalid input entered by user
		$("#searchId").val("");
		// send an error message through the placeholder attr
		$("#searchId").removeAttr("placeholder");
		//message through the modal
		showModal("Invalid city", "Please enter a valid city name");
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
/**
 * load the data for the city from the API
 * @param {string} city
 */
function loadCityData(city) {
	var mapBoxPoi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ&types=place`;
	$.getJSON(mapBoxPoi, function (json) {
		if (json.features.length == 0) {
			showModal("Invalid city", "Please enter a valid city name");
			return;
		}

		var json_city = json.features[0].place_name.toLowerCase();

		if (!json_city.includes(city.toLowerCase())) {
			showModal("Invalid city", "No city name matches your search");
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
		showModal("Invalid city", "Please enter a valid city name");
	});
}

/**
 * When the user search a city or click on the suggested destinations this function load
 * the city info to display on the city details page given a parameter (city)
 */
function loadCityInfo(cityData) {
	// set city name
	activeCity = cityData.place_name;
	$("#current-city-data").text(`${cityData.place_name}`);
	$("#select-city").text(`${cityData.place_name}`);
}

/**
 * Load city weather to display on the city details page given a parameter (city)
 */
function loadCityWeather(activeCityData) {
	$("#icon").empty();
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

/**
 * loads POI info
 * @param {object} activeCityData
 */
function loadPoiData(activeCityData) {
	//empty the list before append
	$("#restaurants-list").empty();
	$("#shopping-list").empty();
	$("#todo-list").empty();

	// get restaurant data within boundry box
	var restaurantSearch = `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurants.json?access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ&types=poi&bbox=${activeCityData.bbox}`;
	$.getJSON(restaurantSearch, function (json) {
		for (var i = 0; i < 5 && i < json.features.length; i++) {
			$("#restaurants-list").append(
				`<div class="mt-3">${json.features[i].text}</div>`
			);
		}
	});

	// get shopping data within boundry box
	var shopSearch = `https://api.mapbox.com/geocoding/v5/mapbox.places/clothing.json?access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ&types=poi&bbox=${activeCityData.bbox}`;
	$.getJSON(shopSearch, function (json) {
		for (var i = 0; i < 5 && i < json.features.length; i++) {
			$("#shopping-list").append(
				`<div class="mt-3">${json.features[i].text}</div>`
			);
		}
	});

	// get todo data from boundry box
	var todoSearch = `https://api.mapbox.com/geocoding/v5/mapbox.places/nightclub.json?access_token=pk.eyJ1Ijoic3RldmVvOTIxOSIsImEiOiJja2FpbGJtcjYwMjg4MnpxdXVxNHdhaTltIn0.7ggPMksLsnum5sjGqnC4gQ&types=poi&bbox=${activeCityData.bbox}`;
	$.getJSON(todoSearch, function (json) {
		for (var i = 0; i < 5 && i < json.features.length; i++) {
			$("#todo-list").append(
				`<div class="mt-3">${json.features[i].text}</div>`
			);
		}
	});
}

/**
 * loads city map
 * @param {object} activeCityData
 */
function loadCityMap(activeCityData) {
	mapboxgl.accessToken =
		"pk.eyJ1IjoieXN0YW1hcml0cSIsImEiOiJja2F0c3J4c3UwMGM4MzNxcmFzZXh4N2RhIn0.vnaQ1AHB9ra3v9k4RPecoQ";
	var map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/ystamaritq/ckb2py14o05y51it83sj4ulbr",
		center: activeCityData.center,
		zoom: 15,
		pitch: 45,
		antialias: true,
	});
	//added the marker
	var marker = new mapboxgl.Marker()
		.setLngLat(activeCityData.center)
		.addTo(map);

	// added full screen control to the user
	map.addControl(new mapboxgl.FullscreenControl());
	// disable map zoom when using scroll
	map.scrollZoom.disable();
}

/**
 * loads city photos
 * @param {object} activeCityData
 */
function loadCityPhotos(activeCityData) {
	$(".carousel").empty();
	var pixelURL = `https://pixabay.com/api/?key=16859378-c1f5b589a2d6921a2b1b17090&q=${activeCityData.text}+city&image_type=photo&safesearch=true`;
	// var pixelURL = `https://pixabay.com/api/?key=16859378-c1f5b589a2d6921a2b1b17090&q=${activeCityData.text}+city&image_type=photo&safesearch=true&tags=${activeCityData.text}`;
	$.getJSON(pixelURL, function (json) {
		if (json.total == 0) {
			$(".carousel").append(
				"<h5 class='headers'>Sorry, there is no data for your search.<div class='img_msg'>Ensure you enter a valid city name</div></h5>"
			);
			return;
		}
		photoSrc = json.hits[0].largeImageURL;

		for (var i = 0; i < 20 && i < json.hits.length; i++) {
			$(".carousel").append(
				`<img src=${json.hits[i].largeImageURL} class="carousel-item">`
			);
		}
		$(".carousel").carousel();
	});
}
