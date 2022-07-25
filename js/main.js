const notes = [
    {
        id: 1,
        title: "FIRST NOTE",
        body: "this is first note",
        updated: "2022-07-24T23:33:21.923Z"
    },
    {
        id: 2,
        title: "SECOND NOTE",
        body: "this is second note",
        updated: "2022-07-24T23:33:54.138Z"
    },
    {
        id: 3,
        title: "THIRD NOTE",
        body: "this is third note",
        updated: "2022-07-24T23:34:19.666Z"
    }
];

class NotesAPI {
    static getAllNotes() {
        const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
        //return sorted saved notes list:
        return savedNotes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

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

    static deleteNote() { }
}

console.log(NotesAPI.getAllNotes());