const main = document.querySelector('main')

const fetchMovies = async() =>{
    try{    
        const { data } = await axios.get('/api/movies')
        //console.log(data)
        const movies = data.data.map(elem =>{
            return `<h1> ${elem.title} </h1>`
        })

        main.innerHTML = movies.join('')
    }catch (error){
        main.innerHTML = `<h1>Can't Fetch Data</h1>`
    }
}

fetchMovies()