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
          msg: "Veuillez renseigner une valeur ! nameEmpty "
        },
        notNull: {
          msg: "Renseignez une valeur ! / name "
        },
        max: {
          args: [32],
          msg: "Maximum 32 caractères"
        },
        min: {
          args: [4],
          msg: "Minimum 4 caractères"
        }
      }
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
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}