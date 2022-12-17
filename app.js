const express = require('express');
let pokemons = require('./mock-pokemon');
// console.log(express());
const app = express();
const port = 3000;

// Route 1 : homePage
app.get('/', (req,res) =>{
    res.send('Hello World');
});
// Route 2 : Bibliothèque pokemon

app.get('/api/pokemon/:id', (req,res)=>{
    const id = parseInt(req.params.id) ;
    const pokemon = pokemons.find(pokemon => pokemon.id === id );
    res.json(pokemon);
})

app.get('/api/pokemons', (req,res)=>{
    const nbPokemon = pokemons.length;
    res.send(`Il y a ${nbPokemon} pokémons dans le pokedex, pour le moment`);
})

app.listen(port);
console.log(`L'application est lancée sur le port ${port}`);