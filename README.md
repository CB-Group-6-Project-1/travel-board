<div align="center">
  <br>
  <img src="assets\images\misc-imgs\travel-board-rsz.png" alt="travel-board logo" width="250">
  <br>

# travel-board

> Your all in one travel dashboard.
> <br>

</div>

---

### Table of Contents

- [Value Proposal](#value-proposal)
- [User Stories](#user-stories)
- [Acceptance Criteria](#acceptance-criteria)
- [Concept](#concept)
  - [Design](#design)
  - [Installing / Getting Started](#inslalling-/-getting-started)
  - [MVP](#mvp)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
  - [APIs](#apis)
- [Team Members](#team-members)
- [Project Board](https://github.com/CB-Group-6-Project-1/travel-board/projects/1 "travel-board")

---

## Value Proposal

An easy to use, mobile first web application for browsing popular travel destinations and planning your perfect vacation. This application will allow you to find places of interest and organize your travel plans all in one place.

---

## User Stories

`As a User I can browse vacation destinations so I can choose where I want to travel this summer`

`As a User I see popular destinations suggested by system so I can choose a destination in case I don’t know what I want`

---

## Acceptance Criteria

- As a User I can browse vacation destinations
- As a User I see popular destinations suggested by system
- As a User I can see details of a travel destination
- As a User I can see common city information of a destination
- As a User I can see current weather of a destination
- As a User I can see 2 day forecast weather of a destination
- As a User I can see a map of a destination
- As a User I can see pictures of a destination
- As a User I can see restaurants in a destination
- As a User I can see shopping places in a destination
- As a User I can see things to do in a destination
- As a User I can create a Vacation plan for a chosen destination
- As a User I can choose Start and End data of my vacation plan
- As a User I can add notes to my vacation plan
- As a User I can add/remove guests to my vacation plan
- As a User I can add/remove TODOs to my vacation plan
- As a User I can save my vacation plan
- As a User I can browse my vacation plans previously created on the site
- As a User I can edit my future vacation plans
- As a User I can see active vacation plans
- As a User I can see upcoming vacation plans
- As a User I can see past vacation plans
- As a User I can delete upcoming vacation plans

---

## Concept

This application will leverage APIs to gather information, images, weather and other valuable data about your desired desitination. travel-board allows you to keep all of your travel plans organized by date in cards for easy comparison.

#### Design

Phase one design features basic functionality and style for multiple features.

<details>
<summary>Phase One: whiteboard and wireframe </summary>
<img src="assets\images\readme-imgs\whiteboard.png">
<img src="assets\images\readme-imgs\home-page.png">
<img src="assets\images\readme-imgs\city-page.png">
<img src="assets\images\readme-imgs\add-vacation-page.png">
<img src="assets\images\readme-imgs\vacation-calendar-page.png">
</details>

In phase two, we have introduced an updated UI, style, and responsive design. City search feature has been enhanced as well as a function that displays relevant alternative images if there are none for a given city. We have also developed functionality for saving, editing, and deleting the user's vacation plans. Vacation plans are saved to local storage and organized by date.

<details>
<summary>Phase two design </summary>
<img src ="assets\images\readme-imgs\travel-board-mockup-final-1.png">
<img src ="assets\images\readme-imgs\travel-board-mockup-final-2.png">
<img src="assets\images\readme-imgs\Travel Board - 1.png">
<img src="assets\images\readme-imgs\Travel Board - 2.png">
<img src="assets\images\readme-imgs\Travel Board - 3.png">
<img src="assets\images\readme-imgs\Travel Board - 4.png">
<img src="assets\images\readme-imgs\Travel Board - 5.png">
</details>

---

### Installing / Getting Started

To test this project, simply clone project into a your local file system and open `index.html` in your favorite browser.

```
git clone https://github.com/CB-Group-6-Project-1/travel-board.git
cd travel-board
open index.html
```

---

#### Initial Configuration

No additional setup required.

#### Developing

Below is a summary of the key files for this project and their purpose:

- **index.html** travel board html page
- **assets** folder that contains all files
- **assets/js/script.js** main js file with initialization code
- **assets/js/core.js** common functionality used by the site
- **assets/js/city.js** city specific functions
- **assets/js/vacation.js** vacation specific functions
- **assets/images/..** images used by the page
- **assets/css/style.css** main site custom stylesheet

---

#### MVP

- Allow user to search for travel destinations, save favorites and other information while providing weather data for a given location.
- Travel-board suggests popular travel desitinations
- Displays high quality images associated with a given location.
- Interactive map of destination.
- The user is able to save, edit, and compare multiple vacation cards in order to make it easy to decide whether to turn a plan into your next vacation or save it for another time.

---

#### Demo

<img src ="assets\images\readme-imgs\travel-board-demo-gif2.gif" width = "700px">

<div align="center">

[travel-board](https://cb-group-6-project-1.github.io/travel-board/ "Try it out!") </div>

---

## Tech Stack

| Tools                   | Tech       |
| ----------------------- | ---------- |
| V.S.Code                | HTML       |
| Postman                 | CSS        |
| draw\.io                | Javascript |
| Browser Developer Tools | AJAX       |
|                         | Jquery     |
|                         | Pure.css   |
|                         |            |

#### APIs

- [Mapbox](https://docs.mapbox.com/api/)
- [PixaBay](https://pixabay.com/api/docs/)
- [Weatherapi.com](https://www.weatherapi.com/)

---

#### Our Experience

```
---> Insert lessons learned here <---
```

---

## Team Members

- [Yadira Tamarit](https://github.com/ystamaritq)
- [Stephen Guzman](https://github.com/steveo9219)
- [William Hanna](https://github.com/wrhcodecamp)
- [Joshua Martinez](https://github.com/JDMartinez1531)

---

[Table of Contents](#table-of-contents)
