// On Document Ready (events)
$(document).ready(function () {
	// load previous data from storage
	loadLocalStorageData();
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
	// initialize modals
	$(".modal").modal();
});
