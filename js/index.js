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
    .then(result => tvShowSearchResults(result))
    .catch(error => console.log(error.message))
  }

  function searchByCharacterName(name)  {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`https://api.tvmaze.com/search/people?q=${name}`, requestOptions)
      .then(response => response.json())
      .then(result => characterShowResults(result))
      .catch(error => console.log(error.message))
    }

    function characterShowResults(result) {
      for(item of result) {
        const tableCharacterResult = document.createElement('table')
        tableCharacterResult.classList.add('character-search-result')
        tableCharacterResult.innerHTML = `
        <h3>Character Information</h3>
        <table>
      <tr>
        <th>${item.person.name}</th>
        <th>${item.person.country.name}</th>
      </tr>
        <td><img src="${item.person.image.medium}"/></td>
        <td>${item.person.gender}</td>
    </table>
        `
        searchDivContainer.innerHTML = ''
    searchDivContainer.appendChild(tableCharacterResult);
      }
  }


function tvShowSearchResults(result) {
  result.forEach(item => {
    const tableSearchResults = document.createElement('table');
    tableSearchResults.classList.add('table-search-results')
    tableSearchResults.innerHTML = `
    <h3>TV Show Information</h3>
    <table>
      <tr>
        <th>${item.show.name}</th>
        <th>${item.show.type}</th>
        <th>Description: ${item.show.summary}</th>
      </tr>
        <td><img src="${item.show.image.medium}"></td>
        <td>${item.show.language}</td>
        <td>imdb id: ${item.show.externals.imdb}</td>
      <tr>
        <td>Network:${item.show.network.name}</td>
        <td>Language:${item.show.language}</td>
        <td>Premiered:${item.show.premiered}</td>
      </tr>
    </table>
    `
    searchDivContainer.innerHTML = ''
    searchDivContainer.appendChild(tableSearchResults);
})
}


searchButton.addEventListener('click', () => {
  if(tvCheckbox.checked == true) {
    searchByTvShowName(inputBox.value);
  }else {
    searchByCharacterName(inputBox.value)
  }
})















document.addEventListener('DOMContentLoaded', () => {
  tvCheckbox.defaultChecked
  displayMovieCards(1);
  scheduledTodayShows("US");
  displaySearchInput();
})