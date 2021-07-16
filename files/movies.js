const express = require('express');
const path = require('path');
const {movies} = require('./database')
const app = express();

app.use('/public',express.static(path.join(__dirname,'static')));
app.use(express.static(__dirname + '/views'));

app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index', {filter:'ALL', movies: movies})
});

app.get('/movies',(req,res)=>{
    const {genre} = req.query

    let movieGenre = movies.filter(elem =>{
        return elem.genre === genre.toUpperCase()
    })

    if(movieGenre.length < 1){
        return res.status(400).send(`<h1 style="color:red"> Can't Find your Search Request </h1>
                                    <a href="/"> Back </a>`)
    }
    return res.render('index' , {
        filter : "Genre: " + genre,
        movies : movieGenre
    })
});

app.post('/movies',(req,res)=>{
    let newMovie = {id: movies.length + 1}
    newMovie["title"] = req.body.title
    newMovie["year"] = parseInt(req.body.year)
    newMovie["genre"] = req.body.genre.toUpperCase()
    movies.push(newMovie)
    console.log(movies)

    return res.render('index' , {
        filter : "POST: ",
        movies : movies
    })

});

app.get('/movies/:id',(req,res)=>{
    let movieID = []
    movieID.push(movies.find(elem => elem.id === parseInt(req.params.id)))
    if(!movieID[0]) return res.status(400).send(`No movie ID of ${req.params.id}`)

    return res.render('index' , {
        filter : "ID: " + req.params.id,
        movies : movieID
    })
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening to port ${port}`));