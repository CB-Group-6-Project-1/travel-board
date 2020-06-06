// Global Variables
var activeCityData;
var photoSrc = "";
var activeCity = "";
var vacationPlans = [];

if (localStorage.getItem("vacationPlans") !== null) {
	vacationPlans = JSON.parse(localStorage.getItem("vacationPlans"));
}

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
		$("#searchId").val("");
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

/**function to load POI info */
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

/**function load city map */
function loadCityMap(activeCityData) {
	mapboxgl.accessToken =
		"pk.eyJ1IjoieXN0YW1hcml0cSIsImEiOiJja2F0c3J4c3UwMGM4MzNxcmFzZXh4N2RhIn0.vnaQ1AHB9ra3v9k4RPecoQ";
	var map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/ystamaritq/ckb2py14o05y51it83sj4ulbr",
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
}

// function loadCityPhotos(city) {
function loadCityPhotos(activeCityData) {
	$(".carousel").empty();
	var pixelURL = `https://pixabay.com/api/?key=16859378-c1f5b589a2d6921a2b1b17090&q=${activeCityData.text}+city&image_type=photo&safesearch=true`;
	$.getJSON(pixelURL, function (json) {
		photoSrc = json.hits[0].largeImageURL;

		for (var i = 0; i < 20 && i < json.hits.length; i++) {
			$(".carousel").append(
				`<img src=${json.hits[i].largeImageURL} class="carousel-item">`
			);
		}
		$(".carousel").carousel();
	});
}

/**
 * plan vacation function
 */
function planVacation() {
	var currentDate = new Date();
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth();
	var day = currentDate.getDay();
	var defaultFromDate = new Date(year, month, day + 3);
	var defaultToDate = new Date(year, month, day + 10);

	// remove as this is a new plan
	$("#save-trip").removeAttr("data-plan-id");

	$(".datepicker").datepicker({
		minDate: new Date(year, month, day + 3),
		maxDate: new Date(year + 1, 12, 31),
		yearRange: [year, year + 1],
		autoClose: true,
		setDefaultDate: true,
		onClose: () => {
			console.log("date picker closed");
		},
	});

	$("#from_date")
		.datepicker("setDate", defaultFromDate)
		.datepicker("gotoDate", defaultFromDate);
	$("#to_date")
		.datepicker("setDate", defaultToDate)
		.datepicker("gotoDate", defaultToDate);

	loadPageSection("#plan-vacation-page");
}

/**
 * add activity input to list
 */
function addActivity(e) {
	e.preventDefault();
	var activity = $("#activity-input").val();
	$("#activity-list").append(
		`<li data-text="${activity}">${activity}<button class="material-icons cyan pulse" onclick="removeActivity(this, '${activity}')">clear</button></li>`
	);
	$("#activity-input").val("");
}

/**
 * remove activity
 */
function removeActivity(btn, activity) {
	btn.parentNode.remove();
}

function addGuest() {
	var guestName = $("#icon_prefix").val().trim();
	var guestPhone = $("#icon_telephone").val().trim();

	if (guestPhone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
		var guestInfo = guestName + " " + guestPhone;
		$("#guest-list").append(`<div class="chip" data-info="${guestInfo}">
						  <div class="guest-info">${guestInfo}<span><i class="close material-icons">close</i></span>
						  </div>
						</div>`);
		$("#icon_prefix").val("");
		$("#icon_telephone").val("");
	} else {
		$("#icon_telephone").val("not valid");
	}
}
function resetNumber() {
	$("#icon_telephone").val("");
}

function goHome() {
	loadPageSection("#home-page");
}

function getActivityList() {
	var activityList = [];
	$("#activity-list>li").each(function () {
		activityList.push($(this).attr("data-text"));
	});
	return activityList;
}

function getGuestList() {
	var guestList = [];
	$("#guest-list>.chip").each(function () {
		guestList.push($(this).attr("data-info"));
	});
	return guestList;
}

function saveTrip() {
	var vacationNotes = $("#myNotes").val();
	var fromVal = $("#from_date").val();
	var toVal = $("#to_date").val();
	var activityList = getActivityList();
	var guestList = getGuestList();

	if (
		(fromVal && toVal && guestList) !== "" &&
		Date.parse(fromVal) < Date.parse(toVal) &&
		guestList.length > 0
	) {
		var plan = {
			id: new Date().getTime(),
			activities: activityList,
			date: {
				from: fromVal,
				to: toVal,
			},
			guests: guestList,
			notes: vacationNotes,
			photo: photoSrc,
			city: activeCity,
		};
		// clean the data
		$("#myNotes").val("");
		$("#from_date").val("");
		$("#to_date").val("");
		$("#activity-list").empty();
		$("#guest-list").empty();

		//when the user click save trip after edit plan vacation
		var planId = $("#save-trip").attr("data-plan-id");

		if (planId) updatePlan(plan, planId);
		else vacationPlans.push(plan);

		localStorage.setItem("vacationPlans", JSON.stringify(vacationPlans));
		goTravelPlans();
	} else {
		alert(
			"you must to enter at least the dates and the guest for your trip in order to save your trip, if you did, check the from date is before the to date!"
		);
		return;
	}
}

function updatePlan(planData, planId) {
	for (var i in vacationPlans) {
		if (vacationPlans[i].id == planId) {
			vacationPlans[i].date = planData.date;
			vacationPlans[i].notes = planData.notes;
			vacationPlans[i].activities = planData.activities;
			vacationPlans[i].guests = planData.guests;
			break;
		}
	}
}

function loadTravelPlan(planListId, planData) {
	$(planListId).append(`<div class="row" id="plan-${planData.id}">
	<div class="col s12 m6">
	  <div class="card">
		<div class="card-image z-depth-3">
		  <img src=${planData.photo} />
		  <span class="card-title flow-text z-depth-3" id="active-city">${planData.city}</span>
		</div>
		<div class="card-content">
		  <p id="planNotes"><span><i class="material-icons">event_note</i>Notes:</span>${planData.notes}</p>
		  <p id="dateFromTo"><span><i class="material-icons">av_timer</i>Dates:</span>From:${planData.date.from} ---- To:${planData.date.to}</p>
		  <p id="guests-info"><span><i class="material-icons">account_circle</i>Guests:</span>${planData.guests}</p>
		  <p id="list-activity"><span><i class="material-icons">menu</i>Activities:</span>${planData.activities}</p>
		<button class="waves-effect waves-light btn edit-plans" onclick= "editPlan(${planData.id}, event)">Edit Plan</button>
		<button class="waves-effect waves-light btn" onclick= "deletePlan(${planData.id})">Delete Plan</button>
		</div>
	  </div>
	</div>
  </div>`);
}

function goTravelPlans() {
	// load active travel plans
	var activeTravelPlans = getActiveTravelPlans();
	$("#active-travel-plans-list").empty();
	if (activeTravelPlans.length == 0)
		$("#active-travel-plans-list").append(`<li>No Data</li>`);
	activeTravelPlans.forEach((plan) => {
		loadTravelPlan("#active-travel-plans-list", plan);
	});
	// load upcoming travel plans
	var upcomingTravelPlans = getUpcomingTravelPlans();
	$("#upcoming-travel-plans-list").empty();
	if (upcomingTravelPlans.length == 0)
		$("#upcoming-travel-plans-list").append(`<li>No Data</li>`);
	upcomingTravelPlans.forEach((plan) => {
		loadTravelPlan("#upcoming-travel-plans-list", plan);
	});
	// load past travel plans
	var pastTravelPlans = getPastTravelPlans();
	$("#past-travel-plans-list").empty();
	if (pastTravelPlans.length == 0)
		$("#past-travel-plans-list").append(`<li>No Data</li>`);
	pastTravelPlans.forEach((plan) => {
		loadTravelPlan("#past-travel-plans-list", plan);
	});
	// load the travel plan section
	loadPageSection("#travel-plans-page");
}

function getActiveTravelPlans() {
	return vacationPlans.filter((plan) => {
		return moment().isBetween(plan.date.from, plan.date.to);
	});
}

function getUpcomingTravelPlans() {
	return vacationPlans.filter((plan) => {
		return moment().isBefore(plan.date.from);
	});
}

function getPastTravelPlans() {
	return vacationPlans.filter((plan) => {
		return moment().isAfter(plan.date.to);
	});
}

function getTravelPlanById(planId) {
	return vacationPlans.find((plan) => plan.id == planId);
}

//** when user clicks edit plan button */
function editPlan(planId, e) {
	e.preventDefault();
	var plan = getTravelPlanById(planId);
	var listActivities = plan.activities;
	var listGuests = plan.guests;
	$("#myNotes").val(plan.notes);
	$("#from_date").val(plan.date.from);
	$("#to_date").val(plan.date.to);
	listActivities.forEach((act) => {
		$("#activity-list").append(
			`<li data-text="${act}">${act}<button class="material-icons cyan pulse" onclick="removeActivity(this, '${act}')">clear</button></li>`
		);
	});

	listGuests.forEach((guest) => {
		$("#guest-list").append(`<div class="chip" data-info="${guest}">
                      <div class="guest-info">${guest}<span><i class="close material-icons">close</i></span>
                      </div>
					</div>`);
	});

	// remove as this is a new plan
	$("#save-trip").attr("data-plan-id", planId);
	loadPageSection("#plan-vacation-page");
}

function deletePlan(planId) {
	$("#plan-" + planId).remove();
	for (var i in vacationPlans) {
		if (vacationPlans[i].id == planId) {
			vacationPlans.splice(i, 1);
			localStorage.setItem("vacationPlans", JSON.stringify(vacationPlans));
			break;
		}
	}
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
	// when user clicks add activities
	$("#add-activity").on("click", addActivity);
	//when the user clicks the add guest
	$("#add-guest").on("click", addGuest);
	//when the user click the save trip
	$("#save-trip").on("click", saveTrip);
	//when the user clicks the nav plane icon
	$("#plans").on("click", goTravelPlans);
});
