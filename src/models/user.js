module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      userName: {
        type: DataTypes.STRING,
        unique : {
            msg : "Utilisateur déjà existant"
        }
      },

      password: {
        type: DataTypes.STRING,
        // crypter le mdp
      },
    })
}