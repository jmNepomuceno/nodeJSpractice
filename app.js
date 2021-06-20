const express = require('express');
const path = require('path');
const {movies} = require('./database')
const app = express();

app.use('/public',express.static(path.join(__dirname,'static')));
app.use(express.static(__dirname + '/views'));

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./static/index.html'))
});

app.get('/api/movies',(req,res)=>{
    res.json({success:true, data:movies})
});

app.get('/api/movies/:id',(req,res)=>{
    const movieID = movies.find(elem => elem.id === parseInt(req.params.id))
    if(!movieID) return res.status(400).send(`No movie ID of ${req.params.id}`)
    console.log(movieID)
    res.render('second' , {data :{
        userParams: req.params.id
    }})
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening to port ${port}`));