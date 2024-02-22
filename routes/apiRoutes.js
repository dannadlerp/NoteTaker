const router = require("express").Router(); //traffic cop :)
const store = require("../db/store.js");


router.get("/notes", (req, res) => {
  //res.send("retrieved all from db");  //cannot have 2 "res." commands in same .get
  
  store
  .getNotes()
  .then((notes) => {
    return res.json(notes)
  })
    
});

//let noteIdCounter = 0;
router.post("/notes", (req, res) => {
  const newNote = req.body;
//newNote.id = ++noteIdCounter;
store.addNotes(newNote).then ((note) => {
  res.json(note);
}) //pass the request body through the addNotes funct

.catch((err) => {
  console.error(err);
  res.status(500).json({ error: `error: ${err}`});
});

});
  
router.delete('/notes/:id',  (req, res) => {
  
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));

});

router.get('/api/notes/',  (req, res) => {
  const notes = readNotes();
  res.json({ success: true });
});

module.exports = router;