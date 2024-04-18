export default class NotesView {
  constructor(root, handeler) {
    this.root = root;

    // دسترسی به یک متد از سطح بالاتر
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handeler;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;

    // add HTML elements
    this.root.innerHTML = `
        <div class="notes__sidebar ">
        <div class="notes__logo">برنامه یادداشت</div>
        <div class="notes__list"></div>
        <button class="notes__add">اضافه کردن یادداشت</button>
      </div>
      <div class="notes__preview">
        <input type="text" class="notes__title" placeholder="عنوان یادداشت ..." />
        <textarea name="" class="notes__body" placeholder="یادداشت خودت رو بنویس ..."   ></textarea>
      </div>
    `;

    // access
    const addNoteBtn = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".notes__title");
    const inputBody = this.root.querySelector(".notes__body");

    // listeners
    addNoteBtn.addEventListener("click", () => {
      // run add note method
      this.onNoteAdd();
    });

    [inputBody, inputTitle].forEach((inputfield) => {
      inputfield.addEventListener("blur", () => {
        // update the value of the input fields
        const newTitle = inputTitle.value.trim();
        const newBody = inputBody.value.trim();

        // edited title and body
        this.onNoteEdit(newTitle, newBody);
      });
    });



    // hide notes previow in first loading
    this.updateNotePreviowVisibility(false);
  }

  // for show privet method -> "_"
  // create list of notes in DOM
  _createListItemHtml(id, title, body, updated) {
    const MAX_BODY_LENGTH = 50;

    return `
    <div class="notes__list-item" data-note-id="${id}">
      <div class="notes__item-header">
        <div class="notes__small-title">${title}</div>
        <span class="notes__list-trash" data-note-id="${id}">
          <i class="fa-solid fa-trash-can"></i>
        </span>
      </div>
      <div class="notes__small-body">
      ${body.substring(0, MAX_BODY_LENGTH)}
      ${body.length > MAX_BODY_LENGTH ? "..." : ""} 
      </div>
      <div class="notes__small-updated"> 
      ${new Date(updated).toLocaleString("fa", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      })}
      </div>
    </div>
    `;
  }

  // update notes
  updateNoteList(notes) {
    // access to notes container
    const notesContainer = this.root.querySelector(".notes__list");

    // empty notes list
    notesContainer.innerHTML = "";

    // show note lists in DOM
    let notesList = "";
    notes.forEach((note) => {
      const { id, title, body, updated } = note;
      const html = this._createListItemHtml(id, title, body, updated);
      notesList += html;
    });
    notesContainer.innerHTML = notesList;

    // select note items and add event listener to call onNoteSelect method
    notesContainer.querySelectorAll(".notes__list-item").forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        this.onNoteSelect(noteItem.dataset.noteId);
      });
    });

    // select note delete icons and add event listener to call onNoteDelete method
    notesContainer.querySelectorAll(".notes__list-trash").forEach((item) => {
      item.addEventListener("click", (e) => {
        // for stop when click on child element don'n call parent
        e.stopPropagation();
        this.onNoteDelete(item.dataset.noteId);
      });
    });
  }

  updateActiveNotes(note) {
    // console.log(note)
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;

    // remove active selected class
    this.root.querySelectorAll(".notes__list-item").forEach((item) => {
      item.classList.remove("notes__list-item--selected");
    });

    // add selected class
    this.root
      .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add("notes__list-item--selected");
  }

  updateNotePreviowVisibility(visible) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
