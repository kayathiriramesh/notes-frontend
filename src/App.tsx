import './App.css';
import {useState} from 'react';


 type Note ={
  id:number;
  title:string;
  content:string;
 };

 
function App() {
  const [notes,setNotes] = useState([
    {
      id:1,
      title:"note title 1",
      content:"content",
    },
    {
      id:2,
      title:"note title 2",
      content:"content",
    },
    {
      id:3,
      title:"note title31",
      content:"content",
    },
    {
      id:4,
      title:"note title 4",
      content:"content",
    },
  ]);
  const [title,setTitle]= useState<string>("");
  const [content,setContent] = useState<string>("");

  const[selectedNote, setSelectedNote] = useState<Note |null> (null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };
  

  const handleAddNote =(
    task:React.FormEvent
    )=> {
      task.preventDefault();
      console.log("title:",title)
      console.log("content:",content)
      const newNote: Note = {
        id: notes.length + 1,
        title: title,
        content: content,
      };
      
    setNotes([newNote , ...notes]);
    setTitle("");
    setContent("");
    };

    const handleUpdateNote =(
      task:React.FormEvent
      )=> 
      {
        task.preventDefault();
        if(!selectedNote){
          return;
        }
      const updatedNote :Note ={
        id:selectedNote.id,
        title: title,
        content:content,
      }
      
      const updatedNotesList =notes.map((note)=>
      note.id === selectedNote . id
        ? updatedNote
        :note
      )
      setNotes(updatedNotesList)
      setTitle("")
      setContent("")
      setSelectedNote(null);
    };
      const handleDelete=() =>{
      setTitle("")
      setContent("")
      setSelectedNote(null);
      };

      const deleteNote =(
        event:React.MouseEvent,
        noteId:number
       ) => {
        event.stopPropagation();
        const updatedNotes=notes.filter(
          (note) => note.id !== noteId
        )
        setNotes(updatedNotes);
      };

    
  return (
    <div className="app-container">
      <form className="note-form" onSubmit={(event) => 
      selectedNote ? handleUpdateNote(event) : handleAddNote(event)}>
        <input 
          value={title}
          onChange={(task)=> setTitle(task.target.value)} 
          placeholder="title"
          required 
        ></input>
        <textarea
          value={content}
          onChange={(task)=> setContent(task.target.value)} 
          placeholder="content"
          rows={10}
          required
        ></textarea>
        { selectedNote ? (
          <div className='edit-buttons'>
            <button type="submit">Save</button>
            <button onClick={handleDelete}>Delete</button>
          </div>) :(
            <button type="submit">Add Note</button>
          )}
        
      </form>
      <div className='notes-grid'>
        {notes.map((note)=>(
          <div className="notes-item" onClick={() => handleNoteClick(note)}>
          <div className='notes-header'>
            <button onClick={(event) =>
            deleteNote(event,note.id)}>x</button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
        ))}
        
      </div>
    </div>
  );
}

export default App;
