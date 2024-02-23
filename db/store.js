//talks to files (db.json) and routes
const util = require("util");
const fs = require("fs");

const uuidv1 = require("uuid/v1")

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
class Store {
  read() { //no argument needed as it just reads whatever i passed through
    return readFileAsync("db/db.json", "utf8");
  }
  write(note) {
    //argument because item exists to writeNotes
    return writeFileAsync("db/db.json", JSON.stringify(note)); //has to be sent as raw data
  }
  getNotes() {
    return this.read().then((notes) => {
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
    const {title,text} = note;
    const newNote = {title, text, id:uuidv1()}
  return this.getNotes().then((notes) => [...notes,newNote]).then((updatedNotes) => this.write(updatedNotes))
  .then(() => newNote);
}
removeNote(id) {
  // Get all notes, remove the note with the given id, write the filtered notes
  return this.getNotes()
    .then((notes) => notes.filter((note) => note.id !== id))
    .then((filteredNotes) => this.write(filteredNotes));
}
}

module.exports = new Store();