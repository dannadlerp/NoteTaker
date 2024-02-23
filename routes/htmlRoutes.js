const router = require("express").Router(); //traffic cop :)
const path = require('path');

//comes before "*"
router.get("/notes", (req, res) => { //retrieves notes page when /notes is called
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get("*", (req, res) => { //retrieves landingpage when * is called
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  module.exports = router;