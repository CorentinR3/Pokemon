const {
    Pokemon
} = require('../db/sequelize')
const {
    ValidationError
} = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemon/:id',  auth, (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemons => {
                console.log(pokemons);
                if (pokemons == null) {
                    const message = `Le pokémon ayant l'identifiant demandé - ${req.params.id} - n'existe pas.`
                    return res.status(404).json({
                        message
                    })
                }
                const message = `Le pokemon ${pokemons.name} a bien été trouvé`;
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
                const message = `La requête pour récupérer le pokemon a échoué. Veuillez réssayer plus tard`
                res.status(500).json({
                    message,
                    data: error
                })
            })
    })
}