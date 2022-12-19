const { Pokemon } = require('../db/sequelize')
module.exports = (app) => {
    app.get('/api/pokemon/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
    .then(pokemons => {
        const message = `Le pokemon ${pokemons.name} a bien été trouvé`;
        res.json({message, data: pokemons});
    })
})
}