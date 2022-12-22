const {
    Pokemon
} = require('../db/sequelize')
const {
    ValidationError,
    where,
    Op
} = require('sequelize')

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
            if (req.query.name) {
                const name = req.query.name; 
                const limit = parseInt(req.query.limit) || 5   
                
                if (req.query.name.length < 2) {
                    const message = `Le terme de la recherche doit contenir au minimum 2 caractères`
                    return res.status(404).json({message})
                }   
            return Pokemon.findAndCountAll({
                where: { name:{ [Op.like]: `%${name}%`}}
            ,
        limit : parseInt(limit),
        order:['name']
    })

            .then(({count, rows}) => {
                if (!count == 0){
                    const message = `Il y a ${count} ${name} dans la base`
                    res.json({message,data:rows});
                }
                else{
                    const message = `Le pokemon ${name} est introuvable en base;`
                    return res.status(404).json({
                        message,
                        data: null})                        
            }})
            .catch(error =>{
                    const message = `Le pokemon ${name} est introuvable en base`
                    return res.status(404).json({
                        message: error.message,
                        data: error
                    })
            })
        }
        else{
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
    }
    })
}