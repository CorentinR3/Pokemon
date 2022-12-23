const bcrypt = require('bcrypt')
const {
  Sequelize,
  DataTypes
} = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')

let sequelize



if (process.env.NODE_ENV === 'production'){
  sequelize = new Sequelize('c5glcbs6z6rpryo9', 'riogcfo4rlzyj3ol', 'lt334xgaa7z70urq', {
    host: 'iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-6',
    },
    logging: true
  })
}else{
 sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-6',
  },
  logging: false
})
}



const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return   sequelize.sync({
    force : true
  }).then(_ => {
    console.log(`La base de donnée Pokedex est bien initialisée`)
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(`Table Pokemon créée ${pokemon.toJSON()}`))
    }),
    bcrypt.hash('I<3Pika',10)
    .then(hash => {User.create({ username : `Sacha`, password: hash})
    .then(user => console.log(`Table User créée ${user.toJSON()}`))
   
    console.log('La base de donnée a bien été initialisée !')
  })
})
} 

sequelize.authenticate()
.then(_ =>  console.log('connexion établie'))
.catch(error => console.error(`Connexion impossible : ${error}`))


module.exports = {
  initDb,
  Pokemon,
  User
}