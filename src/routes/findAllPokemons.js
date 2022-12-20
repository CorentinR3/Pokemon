const {
    Pokemon
} = require('../db/sequelize')
const {
    ValidationError
} = require('sequelize')

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        Pokemon.findAll()
            .then(pokemons => {
                const message = 'La liste des pokemons a bien été récupérée.';
                res.json({
                    message,
                    data: pokemons
                });
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({
                        message: error.message,
                        data: error
                    })
                }
                const message = `La liste des pokémons n'a pas pu être récupérée. Ressayer dans quelques instants.`
                res.status(500).json({
                    message,
                    data: error
                })
            })
    })
}