"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  if(currentUser.favorites.some(val => val.storyId === story.storyId)){
    const hostName = story.getHostName();
    return $(`
        <li id="${story.storyId}">
        <span class ="favorite-icon">
          <i class = "fa-solid fa-star" data-storyId="${story.storyId}">
          </i>
        </span>
          <a href="${story.url}" target="a_blank" class="story-link">
            ${story.title}
          </a>
          <small class="story-hostname">(${hostName})</small>
          <small class="story-author">by ${story.author}</small>
          <small class="story-user">posted by ${story.username}</small>
          <button class = "remove-story-button" data-Id="${story.storyId}">Remove Story</button>
        </li>
      `);
  }

  
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <span class ="favorite-icon">
        <i class = "fa-regular fa-star" data-storyId="${story.storyId}">
        </i>
      </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <button class = "remove-story-button" data-Id="${story.storyId}">Remove Story</button>
      </li>
    `);
}



/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  document.querySelectorAll(".fa-star").forEach(item =>{
    item.addEventListener('click', async function(evt){
      let id = evt.target.getAttribute("data-storyId")
      if(currentUser.favorites.some(val => val.storyId === evt.target.getAttribute("data-storyId"))){
        evt.target.classList.toggle("fa-solid");
          evt.target.classList.toggle("fa-regular");
        let removeFavoritesArr = currentUser.removeFromFavorites(id);
          appendFavoritesList(removeFavoritesArr);
      }else{
        evt.target.classList.toggle("fa-regular");
        evt.target.classList.toggle("fa-solid");
        let favoritesArr = await currentUser.addToFavorites(id);
        appendFavoritesList(favoritesArr);

      }

        
    } )
  })

  document.querySelectorAll(".remove-story-button").forEach(item =>{
    item.addEventListener('click', async function(evt){
      let id =evt.target.getAttribute("data-Id");
      await deleteStory(id);
    
    })})


    





  $allStoriesList.show();
}

async function submitNewStory(){

  let author = document.getElementById("author-name").value;
  let storyTitle = document.getElementById("story-title").value; 
  let storyUrl = document.getElementById("story-url").value; 


  

  return await storyList.addStory(currentUser, {"author": author, "title": storyTitle,"url": storyUrl});

}

async function deleteStory(id){

try{const res = await axios.delete(`https://hack-or-snooze-v3.herokuapp.com/stories/${id}?token=${currentUser.loginToken}`);
alert('Story deleted!');
await getAndShowStoriesOnStart();

}
catch{alert('You can only delete stories you have posted.')}

}




