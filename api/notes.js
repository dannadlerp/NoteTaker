
const { Model, DataTypes } = require('sequelize');

class Notes extends Model {}

Notes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      
    },
    note_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1, 255],
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'notes',
  }
);

module.exports = Notes;

