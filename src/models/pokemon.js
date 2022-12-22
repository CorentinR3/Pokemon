const validTypes = ["Plantes","Poison","Feu","Eau","Glace","Foudre","Vol","Insecte","Electrik","Fée","Normal","Ténèbre"]

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: {
          msg: "Veuillez renseigner une valeur ! /nameEmpty "
        },
        notNull: {
          msg: "Renseignez une valeur ! / nameNull "
        },
          len: {
          args: [1,25],
          msg: "Le nom du pokémon n'est pas conforme /len"
        },
      },
      unique:{
        msg : "Le nom doit être unique, ce pokémon existe déjà /Unique"
      },
    },

    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Utilisez uniquement des nombres"
        },
        notNull: {
          msg: "Renseignez une valeur ! /hp "
        },
        min :{
          args : [0],
          message : "Uniquement des valeurs positives"
        },
        max :{
          args : [99],
          message : "Moins de 100"
        }
                
      }
    },

    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Utilisez uniquement des nombres"
        },
        notNull: {
          msg: "Renseignez une valeur ! /cp "
        },
        min :{
          args : [0],
          message : "Uniquement des valeurs positives"
        },
        max :{
          args : [999],
          message : "Moins de 1000"
        }
        
      }
    },

    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "Utilisez un URL"
        },
        notNull: {
          msg: "Renseignez une valeur ! /picture"
        }
      }
    },

    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate :{
        isTypesValid(value){
           if(!value){
            throw new Error("Un pokémon doit au moins avoir un type")
           }
           if(value.split(',').length > 3) {
            throw new Error("Un pokémon ne peut pas avoir plus de 3 types") 
           }
            value.split(',').forEach(type => {
              if (!validTypes.includes(type)){
                throw new Error(`Le type ${type} n'existe pas. Veuillez renseigner l'une des valeurs possibles : ${validTypes}`) ;
              }
            });
            
        }
      }
    }

  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}