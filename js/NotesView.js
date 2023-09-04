export default class NotesView {
  constructor(root, handlers) {
    this.root = root; //app

    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;

    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;

    root.innerHTML = `
            <svg id="hamburger" class="notes__sidebar-hamBtn" viewbox="0 0 60 40">
                <g stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                <path id="top-line" d="M10,10 L50,10 Z"></path>
                <path id="middle-line" d="M10,20 L50,20 Z"></path>
                <path id="bottom-line" d="M10,30 L50,30 Z"></path>
                </g>
            </svg>
            <div class="notes__sidebar">
                <div class="notes__logo">NOTE APP</div>
                <div class="notes__list"></div>
                <button class="notes__add">ADD NOTE</button>
            </div>
            <div class="main">
              <div class="notes__preview">
                <input type="text" class="notes__title" placeholder="Note title">
                <textarea class="notes__body">Take Note ...</textarea>
              </div>
            </div>
            
        `;

    const addNoteBtn = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".notes__title");
    const inputBody = this.root.querySelector(".notes__body");
    const hamMenuBtn = this.root.querySelector(".notes__sidebar-hamBtn");
    const notesSidebar = this.root.querySelector(".notes__sidebar");

    //Toggle menu button
    function toggleSidebar() {
      hamMenuBtn.classList.toggle("menu-open");
      notesSidebar.classList.toggle("sidebar-open");
    }

    this.toggleSidebar = toggleSidebar;

    hamMenuBtn.addEventListener("click", this.toggleSidebar);

    //when user clicks the Add Note button
    addNoteBtn.addEventListener("click", () => {
      onNoteAdd();
      this.toggleSidebar();
    });

    [inputTitle, inputBody].forEach((inputField) => {
      //when user clicks outside of an input after clicking on it(focus)
      inputField.addEventListener("blur", () => {
        //trim the input values
        const newTitle = inputTitle.value.trim();
        const newBody = inputBody.value.trim();
        onNoteEdit(newTitle, newBody);
      });
    });

    //hide notes preview on first loading
    this.updateNotePreviewVisiblity(false);
  }

  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 50;
    return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-header">
                    <div class="notes__small-title">${title}</div>
                    <span class = "notes__list-trash" data-note-id="${id}"><i class="fa-regular fa-trash-can"></i></span>
                </div>
                <div class="notes__small-body">
                ${body.substring(0, MAX_BODY_LENGTH)}
                ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${new Date(updated).toLocaleString("en", {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
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
    notesContainer.querySelectorAll(".notes__list-item").forEach((noteItem) => {
      noteItem.addEventListener("click", (e) => {
        this.onNoteSelect(noteItem.dataset.noteId);
        this.toggleSidebar();
      });
    });

    notesContainer.querySelectorAll(".notes__list-trash").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        this.onNoteDelete(item.dataset.noteId);
      });
    });
  }

  //when a note is selected update the values
  updateActiveNote(note) {
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;

    //remove selected class from previous elements:
    this.root
      .querySelectorAll(".notes__list-item--selected")
      .forEach((item) => {
        item.classList.remove("notes__list-item--selected");
      });

    //add selected class to clicked list item
    this.root
      .querySelector(`.notes__list-item[data-note-id = "${note.id}"]`)
      .classList.add("notes__list-item--selected");
  }

  updateNotePreviewVisiblity(visible) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";

    //check for empty section
    const mainContent = this.root.querySelector(".main");
    if (visible === false) {
      const div = document.createElement("div");
      div.className = "empty-preview";
      div.innerHTML = `
      <h2>لطفا از قسمت منو یک یادداشت جدید ایجاد کنید 👉🏻</h2>`;
      mainContent.appendChild(div);
    } else {
      if (this.root.querySelector(".empty-preview")) {
        mainContent.removeChild(this.root.querySelector(".empty-preview"));
      }
    }
  }
}
