export default class NotesView {
    constructor(root, handlers) {
        this.root = root;//app

        const { onNoteAdd, onNoteEdit } = handlers;

        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;

        root.innerHTML = `
            <div class="notes__sidebar">
                <div class="notes__logo">NOTE APP</div>
                <div class="notes__list "></div>
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
}