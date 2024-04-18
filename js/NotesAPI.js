// cose notes is in list we saved it in array
const notes = [
    {
      id: 2,
      title: "second note",
      body: "some dummy text second",
      updated: "2021-10-31T15:03:23.556Z",
    },
    {
      id: 1,
      title: "first note",
      body: "some dummy text first",
      updated: "2021-10-31T15:02:00.411Z",
    },
  ];
  
  export default class NotesAPI {
    // healper methods -> static methods
    static getAllNotes() {
      const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
      // const savedNotes = notes|| [];
      return savedNotes.sort((a, b) => {
        return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
      }); //?
    } 
  
    static saveNote(noteToSave) {
      // یا نوت های ما وجود داره که باید تایتل و بادی اون اپدیت بشه یا اصلا وجود نداره که باید با یک آی دی و تایم جدید ساخته بشه
      const notes = NotesAPI.getAllNotes();
  
      const existedNote = notes.find((n) => n.id == noteToSave.id);
  
      if (existedNote) {
        // update the note
        existedNote.title = noteToSave.title;
        existedNote.body = noteToSave.body;
        existedNote.updated = new Date().toISOString();
      } else {
        // create a new note
        noteToSave.id = new Date().getTime();
        noteToSave.updated = new Date().toISOString();
        // title , body , id , updated => new note
        notes.push(noteToSave);
      }
      // save to local storage
      localStorage.setItem("notes-app", JSON.stringify(notes));
    }
  
    static deleteNote(id) {
      const notes = NotesAPI.getAllNotes();
  
      const filteredNotes = notes.filter((n) => n.id != id);
  
      // save to local storage
      localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
    }
  }
  
//   NotesAPI.saveNote({ title: "third note", body: "this is a new note", id: 2 });
  // NotesAPI.saveNote({ title: "third note", body: "this is a new note" });
  // NotesAPI.saveNote({
  //   title: "third note-edited",
  //   body: "some dummy text third-edited note",
  // });
  
  // console.log(NotesAPI.deleteNote(1713029670675));
  