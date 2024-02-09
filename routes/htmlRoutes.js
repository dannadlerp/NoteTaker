const router = require("express").Router(); //traffic cop :)
const path = require('path');

//comes before *
app.get("/notes", (req, res) => { //retrieves notes page when /notes is called
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get("*", (req, res) => { //retrieves landingpage when * is called
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  module.exports = router;