let mainContainer = document.querySelector(".main-container");
let gridMovies = document.querySelector(".grid-movies");
let overlay=document.querySelector(".overlay");
let next = document.querySelectorAll(".btn");
let txt = document.querySelector("#text");


txt.addEventListener("input",handleChange);
window.onload =()=>{
    fetchMovies();
};
// for(const button of next){
// button.addEventListener("click",nextPage);
// }

function handleChange(e) {
    fetchMovies(e.target.value);
}
// function nextPage(e){
//     gridMovies.innerHTML="";
//     fetchMovies(e.target.value);
// }

function fetchMovies(q="") {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=38ecaa1d09833d7e1f0a81003c6f4cbe&sort_by=popularity.desc")
        .then((res) => res.json())
        .then((data) => {    
            q=q.toLowerCase();
            data=data.results;
            if(q!==""){
                data=data.filter((movie)=>{
                    return movie.original_title.toLowerCase().includes(q);
                })
            }
                loadMovies(data);
        })
}
function loadMovies(movie) {
    gridMovies.innerHTML="";
    for (let i = 0; i < movie.length; i++) {
        
        let movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        let image = document.createElement("div");
        image.className = "image";
        let img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/w500" + movie[i].poster_path;
        let title = document.createElement("div");
        title.className = "title";
        let movieName = document.createElement("p");
        movieName.className = "movie-name";
        movieName.innerHTML = movie[i].original_title;
        let moviePoint = document.createElement("p");
        moviePoint.className = "movie-point";
        if(movie[i].vote_average<5.5){
            moviePoint.style.color="#AD0C0C";
        }
        else if(movie[i].vote_average>=5 && movie[i].vote_average<7){
            moviePoint.style.color="#4287EF";
        }
        else if(movie[i].vote_average>=7){
            moviePoint.style.color="#199F47";
        }
        moviePoint.innerHTML = movie[i].vote_average;
        let year = document.createElement("div");
        year.className = "year";
        let movieYear = document.createElement("p");
        movieYear.className = "movie-year";
        movieYear.innerHTML = movie[i].release_date.slice(0, 4);

        movieCard.appendChild(image);
        image.appendChild(img);
        movieCard.appendChild(title);
        title.appendChild(movieName);
        title.appendChild(moviePoint);
        movieCard.appendChild(year);
        year.appendChild(movieYear);
        gridMovies.appendChild(movieCard);
    }
}
