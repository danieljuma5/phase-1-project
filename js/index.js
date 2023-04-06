const imageContainer = document.getElementById('image-container')
const uListMovie = document.querySelector('#list-scheduled')
const imageDescription = document.querySelector('.middle')
const searchButton = document.getElementById('search-btn')
const inputBox = document.querySelector("#site-search")
const tvCheckbox = document.querySelector("#tv-show-name")
const characterCheckbox = document.querySelector('#character-name')
const tmdbImdb = document.querySelector('#tmdb-imdb-value')
const searchDivContainer = document.querySelector('.flex-container')

//Fetch Display Movie cards
function displayMovieCards(id) {
  id = Math.floor(Math.random() * 10) + 1
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://api.tvmaze.com/shows?page=${id}`, requestOptions)
    .then(response => response.json())
    .then(result => addingDisplayMovieCards(result))
    .catch(error => console.log('error', error));
}

function addingDisplayMovieCards(result) {
  result.forEach(card => {
    let imageCard = document.createElement('img');
    imageCard.classList.add("image-container")
    imageCard.src = card.image.medium
    imageContainer.appendChild(imageCard)
    })
  }
function scheduledTodayShows(country) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://api.tvmaze.com/schedule?country=${country}`, requestOptions)
    .then(response => response.json())
    .then(result => renderingTodayScheduledShows(result))
    .catch(error => console.log('error', error));
}

function renderingTodayScheduledShows(result) {
  result.forEach(item => {
    const listTable = document.createElement('table');
    listTable.innerHTML = `
    <table>
  <tr>
    <th>${item.show.schedule.time}</th>
    <th>${item.show.name}</th>
  </tr>
  <tr>
    <td>${item.show.network.name}</td>
    <td>${item.name}</td>
  </tr>
</table>
    `
    listTable.setAttribute('id', 'schedule-table')
    uListMovie.appendChild(listTable)
    
  })
}
//Added functionsality so that one checkbox is selected at a time
function displaySearchInput() {
  // Get all checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Add event listener to each checkbox
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    // If this checkbox is checked, uncheck all other checkboxes
    if (this.checked) {
      checkboxes.forEach(function(otherCheckbox) {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false;
        }
      });
    }
  });
});
}

function searchByTvShowName(name)  {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(`https://api.tvmaze.com/search/shows?q=${name}`, requestOptions)
    .then(response => response.json())
    .then(result => tvShowSearchResults(result.show))
    .catch(error => console.log(error.message));
}

function searchbyImdbTmdbName(queryParam,queryValue)  {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
    fetch(`https://api.tvmaze.com/lookup/shows?${queryParam}=${queryValue}`, requestOptions)
      .then(response => response.json())
      .then(result => 
        // Process the data here
        tvShowSearchResults(result.show))
      .catch(error => {
        // Handle any errors here
        console.error(error);
        alert('error')
      });
  }



function tvShowSearchResults(results) {
  results.forEach(result => {
    const tableSearchResults = document.createElement('table');
    tableSearchResults.classList.add('table-search-results')
    tableSearchResults.innerHTML = `
    <h3>TV Show Information</h3>
    <table>
      <tr>
        <th>${result.show.name}</th>
        <th>${result.show.type}</th>
        <th></th>
      </tr>
        <td>${result.show.image.medium}</td>
        <td>${result.show.language}</td>
        <td></td>
      <tr>
        <td>${result.show.network.name}</td>
        <td>${result.show.language}</td>
        <td>${result.show.premiered}</td>
      </tr>
    </table>
    `
    searchDivContainer.innerHTML.replace(tableSearchResults);

  })
}

function checkedCheckboxes(value) {
  searchButton.addEventListener( 'click',(e) => {
  if(tvCheckbox.checked == true) {
    searchByTvShowName(inputBox.value)
  }else if(characterCheckbox.checkbox == true) {
    searchByTvShowName(inputBox.value)
  }
}
)}

















document.addEventListener('DOMContentLoaded', () => {
  tvCheckbox.defaultChecked
  displayMovieCards(1);
  scheduledTodayShows("US");
  displaySearchInput();
})