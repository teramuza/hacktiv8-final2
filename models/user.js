'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Full name required',
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email address already used!',
      },
      validate: {
        notNull: {
          msg: 'Email address required',
        },
        isEmail: {
          msg: 'Email address invalid!',
        },
      },

    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Username already used!',
      },
      validate: {
        notNull: {
          msg: 'Username required',
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password required',
        }
      }
    },
    profile_image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Profile image required',
        },
        isUrl: {
          msg: 'Profile image invalid url',
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Age required'
        },
        isNumeric: {
          msg: 'Age must be a number',
        },
      }
    },
    phone_number: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Phone number required'
        },
        isNumeric: {
          msg: 'Phone number must be a number',
        },
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
