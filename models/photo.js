'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
    }
  };
  Photo.init({
    title: {type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'tittle required',
        }
      }
    },
    caption: { type: DataTypes.TEXT,  allowNull: false,
      validate: {
        notNull: {
          msg: 'caption required',
        }
      }},
    poster_image_url:{type : DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'image required'
        },
        isUrl: {
          msg: 'image url invalid'
        }
      }
    },
    user_id:{type : DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id'
    }
  }, {
    sequelize,
    modelName: 'Photo',
  });

  return Photo;
};