const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {    
    const id = req.params.id ;
    Pokemon.findByPk(id).then(pokemon => {
        if (pokemon === null){
            const message = `Le pokemon avec l'identifiant suivant n'existe pas en base de donnée.`
            return res.status(404).json({message})
        }
        const pokemonDeleted = pokemon ;   
    return Pokemon.destroy({
        where: { id : pokemon.id }    
     })
    
    .then(_ => {
          const message = `Le pokémon ${pokemonDeleted.id} a bien été supprimé.`
          res.json({message, data: pokemonDeleted })
        })
      })
      .catch(error => {
        const message = `La requête pour supprimer le pokemon a échoué. Veuillez réssayer plus tard`
        res.status(500).json({message, data : error})
          })
    })
}