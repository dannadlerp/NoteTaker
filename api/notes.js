const sequelize = require('../config/connection');
const { Model, DataTypes} = require('sequelize');
const path = require('path');
const fs = require('fs');

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
    note_text: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 255],
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'notes',
  }
);

// Read data from db.json
const dbFilePath = "../../../db/db.json";
const data = fs.readFileSync(dbFilePath, "utf8");
const jsonData = JSON.parse(data);

jsonData.forEach(async (note) => {
  try {
    await Notes.create({
      note_title: note.title,
      note_text: note.text,
    });
  } catch (error) {
    console.error('Error inserting data into database:', error);
  }
});

module.exports = Notes;

