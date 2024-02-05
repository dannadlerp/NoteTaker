const { Model, DataTypes} = require('sequelize');
const Sequelize = require('../config/connection');

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
    Sequelize,
    freezeTableName: true,
    modelName: 'notes',
  }
);


// Read data from db.json
const dbFilePath = path.join(__dirname, 'db.json');
const data = fs.readFileSync(dbFilePath, 'utf8');
const jsonData = JSON.parse(data);

// Assuming jsonData is an array of notes objects like [{ "title": "Test Title", "text": "Test text" }]
// Insert data into the database
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

