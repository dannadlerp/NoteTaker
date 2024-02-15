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

let noteIdCounter = 0;
router.post("/api/notes", (req, res) => {
  const newNote = req.body;
newNote.id = ++noteIdCounter;
store.addNotes(newNote).then ((note) => {
  res.json(note);
}) //pass the request body through the addNotes funct

.catch((err) => {
  console.error(err);
  res.status(500).json({ error: `error: ${err}`});
});
  const notes = this.readNotes();
    notes.push(newNote);
    writeNotes(notes);
    res.json(newNote);
    console.log("posted to db");
});
  
router.delete('/api/notes/:id',  (req, res) => {
  const newNote = req.body;
newNote.id = --noteIdCounter;
  const noteId = parseInt(req.params.id);
  const notes = readNotes();
  const updatedNotes = notes.filter((note) => note.id !== noteId);
  writeNotes(updatedNotes);
  res.json({ success: true });
  
});

/* router.get("/", (req, res) => {
  //define what to do when using GET method
  res.send("server running");
}); */

router.get('/api/notes/',  (req, res) => {
  const notes = readNotes();
  res.json({ success: true });
});

module.exports = router;