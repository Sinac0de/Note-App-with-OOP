import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

const app = document.getElementById("app");

const view = new NotesView(app, {
    onNoteAdd() {
        console.log("note added!");
    },
    onNoteEdit(newTitle, newBody) {
        console.log(newTitle, newBody);
    },
    onNoteSelect(noteId) {
        console.log("onNoteSelect", noteId);
    },
    onNoteDelete(noteId) {
        console.log("onNoteDelete", noteId);
    }
});

view.updateNoteList(NotesAPI.getAllNotes());