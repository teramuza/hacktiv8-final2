'use strict';
const {
  Model, ForeignKeyConstraintError
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title required',
        }
      }
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Caption required',
        }
      }},
    poster_image_url:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Poster image required'
        },
        isUrl: {
          msg: 'Poster image url invalid'
        }
      }
    },
    user_id:{
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id'
    }
  }, {
    sequelize,
    modelName: 'Photo',
  });

  Photo.associate = models => {
    Photo.belongsTo(models.User, {foreignKey : 'user_id', ForeignKeyConstraint: true})
  }
  return Photo;
};
