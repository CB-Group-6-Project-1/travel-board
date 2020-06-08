// Global Variables
var activeCityData;
var photoSrc = "";
var activeCity = "";
var vacationPlans = [];

function loadLocalStorageData() {
	if (localStorage.getItem("vacationPlans") !== null) {
		vacationPlans = JSON.parse(localStorage.getItem("vacationPlans"));
	}
}

function loadPageSection(sectionId) {
	// hide all page sections
	$(".page-section").addClass("section-hide");
	// show desired section
	$(sectionId).removeClass("section-hide");
}

function showModal(title, content) {
	// empty modal content
	$("#main-modal-content").empty();
	// set new content
	$("#main-modal-content").append(`<h4>${title}</h4><p>${content}</p>`);
	// show modal
	$("#main-modal").modal("open");
}

function goHome() {
	loadPageSection("#home-page");
}
