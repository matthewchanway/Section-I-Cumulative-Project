"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

let navSubmit = document.getElementById("submit-nav");
window['navSubmit'] = navSubmit;
let submitStoryForm = document.getElementById("submit-form");
window['submitStoryForm'] = submitStoryForm;
let storySubmitter = document.getElementById("story-submit");
window['storySubmitter'] = storySubmitter;
let navFavorites = document.getElementById("favorites-nav");
window['navFavorites'] = navFavorites;
let allStoriesList = document.getElementById("all-stories-list");
window['allStoriesList'] = allStoriesList;
let favoriteStoriesList = document.getElementById("favorited-stories-list");
window['allStoriesList'] = favoriteStoriesList;
let favoritesHeading = document.getElementById("favorites-heading");
window['favoritesHeading'] = favoritesHeading;

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

navSubmit.addEventListener("click",function(){
submitStoryForm.classList.toggle("hidden");
})

navFavorites.addEventListener("click",function(){
  allStoriesList.classList.toggle("hidden-stories-list");
  favoriteStoriesList.classList.toggle("hidden-stories-list");
  appendFavoritesList(currentUser.favorites);
  })



submitStoryForm.addEventListener("submit", async function(){
 
  await submitNewStory()});

  //queryselector went beneath this
 

  
          
   








 
  function appendFavoritesList(favoritesArr){
    document.getElementById("favorited-stories-list").innerHTML = "";
    
    for(let favorite of favoritesArr){
      let parsedUrl = favorite.url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)
    let LI = document.createElement('LI');
    LI.innerHTML = `
      <li id="${favorite.storyId}">
      <span class ="favorite-icon">
        <i class = "fa-solid fa-star" data-storyId="${favorite.storyId}">
        </i>
      </span>
        <a href="${favorite.url}" target="a_blank" class="story-link">
          ${favorite.title}
        </a>
        <small class="story-hostname">${parsedUrl[1]}</small>
        <small class="story-author">by ${favorite.author}</small>
        <small class="story-user">posted by ${favorite.username}</small>
      </li>`
      favoriteStoriesList.append(LI);
    }

    

  
  }
  