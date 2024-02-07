const express = require("express");
const mysql = require('mysql2');
const fs = require("fs");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001; //set to 3001 if none exist
const Notes = require('../../../api/notes');

//express middleware
app.use(express.urlencoded({ extended: true }));  //current version of express requires the extended option to be present
app.use(express.json());
app.use(express.static("public"));


app.listen(PORT, () =>
//listening for port
console.log(`Serving static asset routes at http://localhost:${PORT}`)
);

const dbFilePath = `../../../db/db.json`;
//console.log(`${dbFilePath}`);
function readNotes() {
  //function to read notes from db
  try {
    const data = fs.reaFile(dbFilePath, (err, data) => {
      if (err) {
        console.log(`error: ${err}`);
      } else {
        console.log(`Data is: ${data}`);
      }
    }); //readfile function from fs
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
let noteIdCounter = 0;
const writeNotes = (notes) => { //writefile function from fs
  try {
    
    fs.writeFile(dbFilePath, (err, data) => {
      if (err) {
        console.log(`error: ${err}`);
      } else {
        console.log(`Data is: ${data}`);
      }
    }); 
    return JSON.parse(data); //pass data through json to make readable
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

app.get("/*", (req, res) => { //retrieves landingpage when * is called
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/notes", (req, res) => { //retrieves notes page when /notes is called
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get("/api/notes", async (req, res) => {
  //res.send("retrieved all from db");  //cannot have 2 "res." commands in same .get
  const notes = readNotes();
  res.json({message: "notes retrieved", notes});
  
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
newNote.id = ++noteIdCounter;
  const notes = readNotes();
    notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
//  res.send("posted to db");
  console.log("posted to db");
});

app.delete('/api/notes/:id',  (req, res) => {
  const noteId = parseInt(req.params.id);
  const notes = readNotes();
  const updatedNotes = notes.filter((note) => note.id !== noteId);
  writeNotes(updatedNotes);
  res.json({ success: true });
  //res.send("deleted from db");
  
});

app.get("/", (req, res) => {
  //define what to do when using GET method
  res.send("server running");
});
/* app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);  //having this app.listen at end of code was causing "addressinuse" errors with the port being busy
}); */
