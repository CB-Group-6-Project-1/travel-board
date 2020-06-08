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

	if (activity !== "") {
		$("#activity-list").append(
			`<li data-text="${activity}">${activity}<button class="material-icons cyan pulse" onclick="removeActivity(this, '${activity}')">clear</button></li>`
		);
	} else {
		showModal("Error: Empty activity", "Please enter a valid activity");
	}

	$("#activity-input").val("");
}

/**
 * remove activity
 */
function removeActivity(btn, activity) {
	btn.parentNode.remove();
}

/**
 * add guest to the vacation plan
 */
function addGuest() {
	var nameValue = $("#icon_prefix").val().trim();
	var phoneValue = $("#icon_telephone").val().trim();

	if (
		!nameValue ||
		nameValue === "" ||
		typeof nameValue !== "string" ||
		!nameValue.toLowerCase().match(/^[a-z ]+$/)
	) {
		$("#icon_prefix").val("");
		showModal("Invalid Name", "Please, enter a valid name");
		return;
	}

	if (
		!phoneValue ||
		phoneValue === "" ||
		!phoneValue.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
	) {
		$("#icon_telephone").val("");
		showModal("Invalid Phone", "Please, enter a valid phone number");
		return;
	}

	var guestInfo = nameValue + " " + phoneValue;

	$("#guest-list").append(`<div class="chip" data-info="${guestInfo}">
							  <div class="guest-info">${guestInfo}<span><i class="close material-icons">close</i></span>
							  </div>
							</div>`);
	$("#icon_prefix").val("");
	$("#icon_telephone").val("");
}

/**
 * gets the list of activities from the UI
 */
function getActivityList() {
	var activityList = [];
	$("#activity-list>li").each(function () {
		activityList.push($(this).attr("data-text"));
	});
	return activityList;
}

/**
 * gets the list of guests from the UI
 */
function getGuestList() {
	var guestList = [];
	$("#guest-list>.chip").each(function () {
		guestList.push($(this).attr("data-info"));
	});
	return guestList;
}

/**
 * saves the travel plan form
 */
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
		showModal(
			"Missing values",
			"You must to enter valid From and To dates, as well as at least one Guest"
		);
		return;
	}
}

/**
 * Updates a travel plan with new infor from planData
 * @param {object} planData the travel plan data object
 * @param {string} planId the plan id been updated
 */
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

/**
 * Loads a travel plan into the UI
 * @param {*} planListId the id of the section where the travel plan will be added
 * @param {*} planData the data of the travel plan
 */
function loadTravelPlan(planListId, planData) {
	$(planListId).append(`
<div id="plan-${planData.id}" class="col s12 m4">
  <div class="card custom-cards">
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
</div>`);
}

/**
 * Displays a default card showing there is no data available
 * @param {*} planListId the id of the section where the travel plan will be added
 */
function addNoDataCard(planListId) {
	$(planListId).append(`
<div class="col s12 m4">
  <div class="card custom-cards">
    <div class="card-image z-depth-3">
      <img src="./assets/images/misc-imgs/travel-board-rsz.png" />
    </div>
    <div class="card-content">
      <p>There is no data for this section</p>
    </div>
  </div>
</div>`);
}

/**
 * Navigates to the travel plans view
 */
function goTravelPlans() {
	// load active travel plans
	var activeTravelPlans = getActiveTravelPlans();
	$("#active-travel-plans-list").empty();
	if (activeTravelPlans.length == 0) addNoDataCard("#active-travel-plans-list");
	activeTravelPlans.forEach((plan) => {
		loadTravelPlan("#active-travel-plans-list", plan);
	});
	// load upcoming travel plans
	var upcomingTravelPlans = getUpcomingTravelPlans();
	$("#upcoming-travel-plans-list").empty();
	if (upcomingTravelPlans.length == 0)
		addNoDataCard("#upcoming-travel-plans-list");
	upcomingTravelPlans.forEach((plan) => {
		loadTravelPlan("#upcoming-travel-plans-list", plan);
	});
	// load past travel plans
	var pastTravelPlans = getPastTravelPlans();
	$("#past-travel-plans-list").empty();
	if (pastTravelPlans.length == 0) addNoDataCard("#past-travel-plans-list");
	pastTravelPlans.forEach((plan) => {
		loadTravelPlan("#past-travel-plans-list", plan);
	});
	// load the travel plan section
	loadPageSection("#travel-plans-page");
}

/**
 * Gets list of active travel plans
 */
function getActiveTravelPlans() {
	return vacationPlans.filter((plan) => {
		return moment().isBetween(plan.date.from, plan.date.to);
	});
}

/**
 * Gets list of upcoming travel plans
 */
function getUpcomingTravelPlans() {
	return vacationPlans.filter((plan) => {
		return moment().isBefore(plan.date.from);
	});
}

/**
 * Gets list of past travel plans
 */
function getPastTravelPlans() {
	return vacationPlans.filter((plan) => {
		return moment().isAfter(plan.date.to);
	});
}

/**
 * Gets a travel plan by the id
 */
function getTravelPlanById(planId) {
	return vacationPlans.find((plan) => plan.id == planId);
}

/**
 * action when user clicks edit plan button
 */
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

/**
 * deletes a travel plan by id
 * @param {*} planId travel plan id to be deleted
 */
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
