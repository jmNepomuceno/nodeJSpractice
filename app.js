const express = require('express')
const {students} = require('./sortDatabase')
const app = express()

app.use(express.static(__dirname + '/views'));
app.set('view engine','ejs');

function compare( a, b ) {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0;
}

app.get('/', (req,res)=>{
    const {from} = req.query
    const {end} = req.query
    let temp_students = students
    temp_students.sort(compare);
    res.render('sort',{
        from : from,
        end : end,
        db : temp_students
    })
})
  
const port = process.env.PORT || 3000
app.listen(port , ()=> console.log(`Listening to port ${port}`))
