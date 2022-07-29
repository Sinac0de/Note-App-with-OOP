export default class NotesAPI {
    //get all the notes in the local storage
    static getAllNotes() {
        const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
        //return sorted saved notes list:
        return savedNotes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    //save the note
    static saveNote(noteToSave) {
        const notes = NotesAPI.getAllNotes();

        const existedNote = notes.find((n) => n.id == noteToSave.id);

        if (existedNote) { // if the note already exists
            existedNote.title = noteToSave.title;
            existedNote.body = noteToSave.body;
            existedNote.updated = new Date().toISOString();
        } else { //if the note dosn't exist
            //set an unique number for the id:
            noteToSave.id = new Date().getTime();
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave); // add new note
        }

        localStorage.setItem("notes-app", JSON.stringify(notes));
    }

    //delete note with a specific id
    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        //filter the notes with id not equal to what user entered
        const filteredNotes = notes.filter(n => n.id !== parseInt(id));
        //update local storage 
        localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
    }
}
