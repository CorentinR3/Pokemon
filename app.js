const express = require('express');
const {success} = require('./helper');
const pokemons = require('./mock-pokemon');
const morgan = require('morgan');
// console.log(express());
const app = express();
const port = 3000;


app.use(morgan('dev'));

// Route 1 : homePage
app.get('/', (req,res) =>{
    res.send('Hello World');
});
// Route 2 : Bibliothèque pokemon

app.get('/api/pokemon/:id', (req,res)=>{
    const id = parseInt(req.params.id) ;
    const pokemon = pokemons.find(pokemon => pokemon.id === id );
    const message = '200 : Pokemon trouvé';
    res.json(success(message,pokemon));
})

app.get('/api/pokemons', (req,res)=>{
    const message = 'La liste des pokemon a bien été récupérée.';
    res.json(success(message,pokemons));
})

app.listen(port);
console.log(`L'application est lancée sur le port ${port}`);