const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001; //set to 3001 if none exist

app.use(express.urlencoded({ extended: true }));  //current version of express requires the extended option to be present
app.use(express.json());
app.use(express.static("public"));


app.listen(PORT, () =>
//listening for port
console.log(`Serving static asset routes at http://localhost:${PORT}`)
);

const dbFilePath = `${__dirname}/db.json`; //defining path for database
//console.log(`${dbFilePath}`);
function readNotes() {
  //function to read notes from db
  try {
    const data = fs.readFile(dbFilePath, (err, data) => {
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
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

app.get("/api/notes", (req, res) => {
  //res.send("retrieved all from db");  cannot have 2 "res." commands in same .get
  const notes = readNotes();
  res.json(notes);
  console.log("retrieved all from db");
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
  console.log("deleted from db");
});

app.get("/", (req, res) => {
  //define what to do when using GET method
  res.send("server running");
});
/* app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);  //having this app.listen at end of code was causing "addressinuse" errors with the port being busy
}); */
