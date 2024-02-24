const { DataTypes } = require('sequelize');
const db = require('../db');

const property = db.Sequelize.define('property', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      postcode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: ['apartment', 'landed', 'unit'],
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
});


module.exports = property;