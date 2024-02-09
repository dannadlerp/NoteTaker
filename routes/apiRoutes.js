const router = require("express").Router(); //traffic cop :)
const store = require("../db/store.js");
router.get("/api/notes", (req, res) => {
  //res.send("retrieved all from db");  //cannot have 2 "res." commands in same .get
  
  store
  .getNotes()
  .then((notes) => {
    return res.json(notes)
  })
  /* const notes = readNotes();
  res.json({message: "notes retrieved", notes}); */
  
});

router.post("/api/notes", (req, res) => {
  const newNote = req.body;
newNote.id = ++noteIdCounter;
  const notes = readNotes();
    notes.push(newNote);
    writeNotes(notes);
    res.json(newNote);
    //  res.send("posted to db");
    console.log("posted to db");
  });
  
router.delete('/api/notes/:id',  (req, res) => {
  const noteId = parseInt(req.params.id);
  const notes = readNotes();
  const updatedNotes = notes.filter((note) => note.id !== noteId);
  writeNotes(updatedNotes);
  res.json({ success: true });
  //res.send("deleted from db");
  
});

router.get("/", (req, res) => {
  //define what to do when using GET method
  res.send("server running");
});
/* app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);  //having this app.listen at end of code was causing "addressinuse" errors with the port being busy
}); */


const { Model, DataTypes} = require('sequelize');
const path = require('path');
const fs = require('fs');
//const sequelize = require("sequelize");
const sequelize = require('../config/connection.js');

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
    sequelize, //TODO need to resolve sequelize instance issue
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

