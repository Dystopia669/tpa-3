const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = "c94c62079ff0f5aa5d3f5b6ba1254c2d"
const URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}`
const inputMovie = document.getElementById('input-group')
const movieHtml = document.getElementById("section-film")
const buttonSubmit = document.getElementById("btnSubmit")
const buttonPopDesc = document.getElementById("pop-desc")

//Show Data
function showData(list) {

    movieHtml.innerHTML +=
    `
    <div class="card">
    <img src="https://image.tmdb.org/t/p/w500/` + list.poster_path +`" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">`+ list.original_title +`</h5>
    <div class= "rating"><strong>`+ list.vote_average +`</strong></div>          
    <p class="card-text">`+ list.release_date +`</p>
    </div>
    </div>
    `
}

const option = {
    method: "GET"
}

// deklarasi api
const getDataAPI = () => {

    fetch(URL, option)
    
    .then((response) => response.json())
    .then((result) => {
        
        let movieData = result.results
        
        movieData.forEach((list) => {
            showData(list)
        });

    })
    
    .catch((error) => console.log(error, "ERROR"))
}

getDataAPI()

//Search Movie

function searchMovie(event) {
    const inputText = document.getElementById('input-text')
    const filter = inputText.value.toLowerCase()
    const searchResult = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${filter}&page=1`
    movieHtml.innerHTML = ''
    fetch(searchResult, option)
    .then((response) => response.json())
    .then((result) => {
        let movieData = result.results    
        movieData.forEach((list) => {   
            showData(list)
        });

    })
    
    .catch((error) => console.log(error, "ERROR"))
    event.preventDefault()
}


buttonSubmit.addEventListener("click", searchMovie)

function popularityDesc(event) {

    const popDescResult = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1`
    movieHtml.innerHTML = ''
    fetch(popDescResult, option)
    .then((response) => response.json())
    .then((result) => {
        let movieData = result.results    
        movieData.forEach((list) => {   
            showData(list)
        });

    })

    .catch((error) => console.log(error, "ERROR"))
    event.preventDefault()
}

buttonPopDesc.addEventListener("click", popularityDesc)