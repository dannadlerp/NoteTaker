const express = require("express");
const fs = require("fs");
const path = require("path");
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const app = express();
const PORT = process.env.PORT || 3001; //set to 3001 if none exist

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  //current version of express requires the extended option to be present
app.use(express.static("public"));

// Serve index.html from the root directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.use("/api", apiRoutes)
app.use("/", htmlRoutes)



app.listen(PORT, () => {
//listening for port
console.log(`Serving static asset routes at http://localhost:${PORT}`)
});