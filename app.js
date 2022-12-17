const express = require('express');
const {success, getUniqueId} = require('./helper');
let pokemons = require('./mock-pokemon');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const { cp } = require('fs');

// console.log(express());
const app = express();
const port = 3000;
const pathIcon = '/images/favicon.ico'


app
.use(favicon(__dirname + pathIcon))
.use(morgan('dev'))
.use(bodyParser.json());

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

app.post('/api/pokemons', (req,res)=>{
    const id = getUniqueId(pokemons);
    const pokemonCreated ={  ...{id:id, ...req.body,created:new Date()} };
    pokemons.push(pokemonCreated);
    // console.log(pokemons);
    const message = `Le pokémon ${pokemonCreated.name} est crée`;
    res.json(success(message,pokemonCreated));
})

app.put('/api/pokemons/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const pokemonUpdated ={  id:id, ...req.body };
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    });
    const message = `Le pokémon ${pokemonUpdated.name} est modifié`;
    res.json(success(message,pokemonUpdated)); 
});
 
app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
  });
   
 
app.listen(port);
console.log(`L'application est lancée sur le port ${port}`);