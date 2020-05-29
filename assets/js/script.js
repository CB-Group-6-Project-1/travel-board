// Global Variables

// Functions

/**
 * As a User I can browse vacation destinations.
 * When I click or enter the search button I browse the city
 */
function browseDestination() {
  // code goes here
}
/**Develop a js function to search for a city in the popular travel destinations. */
function browseTopDestinations() {
  // code goes here
}
// On Document Ready (events)

//When I click or enter the search button I browse the city
$(document).ready(function () {
  // carousel init.
  $(".carousel").carousel();
  $(".search-button").on("click", browseDestination);
  // when I click suggested destinations i get city info
  $(".top-destinations").on("click", browseTopDestinations);
});
