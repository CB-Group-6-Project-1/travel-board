// Global Variables
var activeCityData;
var photoSrc = "";
var activeCity = "";
var vacationPlans = [];
var map; // city map

/**
 * load vacation plan from the local storage
 */
function loadLocalStorageData() {
	if (localStorage.getItem("vacationPlans") !== null) {
		vacationPlans = JSON.parse(localStorage.getItem("vacationPlans"));
	}
}

/**
 * load the page section
 * @param {*} sectionId // sections id to hide or show the section when is needed
 */
function loadPageSection(sectionId) {
	// hide all page sections
	$(".page-section").addClass("section-hide");
	// show desired section
	$(sectionId).removeClass("section-hide");
}

/**
 * show modal
 * @param {string} title
 * @param {string} content
 */
function showModal(title, content) {
	// empty modal content
	$("#main-modal-content").empty();
	// set new content
	$("#main-modal-content").append(`<h4>${title}</h4><p>${content}</p>`);
	// show modal
	$("#main-modal").modal("open");
}
/**
 * go home using by nav bar when the user wants to come back to the main section
 */
function goHome() {
	loadPageSection("#home-page");
}
