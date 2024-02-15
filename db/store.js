//talks to files (db.json) and routes
const util = require("util");
const fs = require("fs");

//TODO look it up :)
//const uuid = require("uuid/v1")

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
class Store {
  readNotes() { //no argument needed as it just reads whatever i passed through
    return readFileAsync("db/db.json", "utf8");
  }
  writeNotes(notes) {
    //argument because item exists to writeNotes
    return writeFileAsync("db/db.json", JSON.stringify(notes)); //has to be sent as raw data
  }
  getNotes() {
    return this.readNotes().then((notes) => {
      let parseNotes;
      try {
        parseNotes = [].concat(JSON.parse(notes));
      } catch (error) {
        parseNotes = [];
      }
      return parseNotes; //so it can be used in other func.
    });
  }
  addNotes(note) {//has to have note bc nothing exists yet
  return this.readNotes().then((notes) => {
    let parseNotes;
    try {
      this.writeNotes(note)
      parseNotes = JSON.parse(notes);
      parseNotes.push(note);
      return this.writeNotes(parseNotes); //write the updated notes
      return parseNotes; //so it can be used in other func.
    } catch (error) {
      console.error(`error: ${error}`);
      return [];
    }
  });
}
  
  //removeNotes


}

module.exports = new Store();

/* const dbFilePath = `../../../db/db.json`;
//console.log(`${dbFilePath}`);
function readNotes() {
  //function to readNotes notes from db
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
const writeNotes = (notes) => {
  //writefile function from fs
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
 */