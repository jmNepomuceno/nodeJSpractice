const movie_list_lbl = document.querySelector('.search-section form .movies-list #movie-lbl')

if(movie_list_lbl.textContent.length > 15){
    movie_list_lbl.style.left = '5%'
    movie_list_lbl.style.fontSize = '1vw'
}