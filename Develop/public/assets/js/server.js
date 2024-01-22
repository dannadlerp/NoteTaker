const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const PORT =process.env.PORT || 3001; //check for environmental PORT or default to 3001

app.use(express.static('public')); //allow user access to public files using middleware
app.use(express.json());

app.get('/', (req, res) =>{
    res.send(console.log('not server running'))
})

app.listen(PORT, () =>
  console.log(`Serving static asset routes at http://localhost:${PORT}!`)
);

/*

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const dbFilePath = path.join(__dirname, 'db.json');

const readNotesFromFile = async () => {
  try {
    const data = await fs.readFile(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeNotesToFile = async (notes) => {
  await fs.writeFile(dbFilePath, JSON.stringify(notes), 'utf8');
};

app.get('/api/notes', async (req, res) => {
  const notes = await readNotesFromFile();
  res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  const newNote = req.body;
  const notes = await readNotesFromFile();
  newNote.id = Date.now(); // Assign a unique ID (this could be more sophisticated)
  notes.push(newNote);
  await writeNotesToFile(notes);
  res.json(newNote);
});

app.delete('/api/notes/:id', async (req, res) => {
  const noteId = parseInt(req.params.id);
  const notes = await readNotesFromFile();
  const updatedNotes = notes.filter((note) => note.id !== noteId);
  await writeNotesToFile(updatedNotes);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})*/