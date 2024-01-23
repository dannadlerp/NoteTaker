const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const PORT =process.env.PORT || 3001; //check for environmental PORT or default to 3001

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) =>{ //define what to do when using GET method
    res.send(console.log('not server running'))
})

app.listen(PORT, () => //listening for port
  console.log(`Serving static asset routes at http://localhost:${PORT}!`)
);




const dbFilePath = `${__dirname}/db.json`; //defining path for database

const readNotes =  () => {  //function to read notes from db
  try {
    const data = fs.readFile(dbFilePath, 'utf8');   //readfile function from fs
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeNotes =  (notes) => {
  fs.writeFile(dbFilePath, JSON.stringify(notes), 'utf8');
};

app.get('/api/notes',  (req, res) => {
  const notes = await readNotes();
  res.json(notes);
  console.log("retrieved from db");
});

app.post('/api/notes',  (req, res) => {
  const newNote = req.body;
  const notes = await readNotesFromFile();
  newNote.id = Date.now();
  notes.push(newNote);
  writeNotesToFile(notes);
  res.json(newNote);
  console.log("posted to db");
});

/* app.delete('/api/notes/:id',  (req, res) => {
  const noteId = parseInt(req.params.id);
  const notes = await readNotes();
  const updatedNotes = notes.filter((note) => note.id !== noteId);
  await writeNotesToFile(updatedNotes);
  res.json({ success: true });
  console.log("deleted from db");
});
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})