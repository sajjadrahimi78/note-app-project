import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNotes = null;
    this.view = new NotesView(root, this._handlers());

    this._refreshNotes();
  }

  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote ={
          title : "",
          body : ""
        }

        NotesAPI.saveNote(newNote)
        this._refreshNotes()
      },

      onNoteEdit: (newTitle, newBody) => {
        NotesAPI.saveNote({
          id : this.activeNotes.id,
          title : newTitle,
          body: newBody,
        })
        
        this._refreshNotes()
      },

      onNoteSelect: (noteId) => {
        // selected class add
        // update title and body in preview
        const selectedNote = this.notes.find((n) => n.id == noteId);
        this.activeNotes = selectedNote;
        this.view.updateActiveNotes(selectedNote);
      },

      onNoteDelete: (noteId) => {
        NotesAPI.deleteNote(noteId)

        this._refreshNotes()
      },
    };
  }

  _refreshNotes() {
    // get all notes
    const notes = NotesAPI.getAllNotes();

    // set notes
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviowVisibility(notes.length > 0);

    // set active note
    this.activeNotes = notes[0];
    this.view.updateActiveNotes(notes[0]);
  }
}
