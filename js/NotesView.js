export default class NotesView {
    constructor(root, handlers) {
        this.root = root;//app

        const { onNoteAdd, onNoteEdit, onNoteSelect } = handlers;

        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteSelect = onNoteSelect;

        root.innerHTML = `
            <div class="notes__sidebar">
                <div class="notes__logo">NOTE APP</div>
                <div class="notes__list"></div>
                <button class="notes__add">ADD NOTE</button>
            </div>
            <div class="notes__preview">
                <input type="text" class="notes__title" placeholder="Note title">
                <textarea class="notes__body">Take Note ...</textarea>
            </div>
        `;

        const addNoteBtn = this.root.querySelector(".notes__add");
        const inputTitle = this.root.querySelector(".notes__title");
        const inputBody = this.root.querySelector(".notes__body");

        //when user clicks the Add Note button
        addNoteBtn.addEventListener("click", () => {
            onNoteAdd();
        });

        [inputTitle, inputBody].forEach(inputField => {
            //when user clicks outside of an input after clicking on it(focus)
            inputField.addEventListener("blur", () => {
                //trim the input values
                const newTitle = inputTitle.value.trim();
                const newBody = inputBody.value.trim();
                onNoteEdit(newTitle, newBody);
            });
        });

    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 50;
        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                ${body.substring(0, MAX_BODY_LENGTH)}
                ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${new Date(updated).toLocaleDateString("en")}
                </div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesContainer = this.root.querySelector(".notes__list");
        //empty the container
        notesContainer.innerHTML = "";
        let notesList = "";
        for (const note of notes) {
            const { id, title, body, updated } = note;
            const html = this._createListItemHTML(id, title, body, updated);
            notesList += html;
        }
        notesContainer.innerHTML = notesList;
        notesContainer.querySelectorAll(".notes__list-item").forEach(noteItem => {
            noteItem.addEventListener("click", (e) => {
                this.onNoteSelect(noteItem.dataset.noteId);
            });
        });



    }

}