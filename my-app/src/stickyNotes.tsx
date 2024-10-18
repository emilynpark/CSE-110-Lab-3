import React, { useState, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";
import { Label, Note } from "./types";
import { ClickCounter } from "./hooksExercise";
import { dummyNotesList } from "./constants";

import './App.css';

export const StickyNotes = () => {
  const themeContext = useContext(ThemeContext);
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const [notes, setNotes] = useState(dummyNotesList);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isFavorite: false,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const toggleFavorite = (noteId: number) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note
    );
    setNotes(updatedNotes);

    const favoriteNotes = updatedNotes
      .filter((note) => note.isFavorite)
      .map((note) => note.title);
    setFavorites(favoriteNotes);
  };

  const deleteNotes = (noteId: number) => {
    const deletedNote = notes.find(note => note.id === noteId);
    const updatedNotes = notes.filter(note => note.id !== noteId);
  
  if (deletedNote && deletedNote.isFavorite) {
    const updatedFavorites = favorites.filter(title => title !== deletedNote.title);
    setFavorites(updatedFavorites);
  }

  setNotes(updatedNotes);
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <div className='app-container' style={{
      background: currentTheme.background,
      color: currentTheme.foreground
    }}>
  	  <form className="note-form" onSubmit={createNoteHandler}>
    	<div>
      	<input
        	placeholder="Note Title"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required>
      	</input>
    	</div>
      <div>
      	<textarea
          placeholder="Note Content"
          className="note-content-textarea"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required>
      	</textarea>
    	</div>
      <div>
     	<select
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label})}
        className="create-note-dropdown"
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>
    	<div><button type="submit">Create Note</button></div>
      <button type="button" onClick={toggleTheme} className="toggle-theme-button">
        Toggle Theme
      </button>
      <div className="favorites-list">
        <h2 className="favorites-list-header">List of favorites:</h2>
        <ul>
          {favorites.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
    </form>
      <div className="notes-grid">
      {notes.map((note) => (
         <div
           key={note.id}
           className="note-item"
           >
           <div className="notes-header">
            <button onClick={() => toggleFavorite(note.id)} className="favorites-button">
              {note.isFavorite ? '❤️' : '♡'}
              </button>
              <button data-testid={`delete-note-${note.id}`} onClick={() => deleteNotes(note.id)}>X</button>
           </div>
           <h2 contentEditable="true"> {note.title} </h2>
           <p contentEditable="true"> {note.content} </p>
           <p contentEditable="true"> {note.label} </p>
         </div>
        ))}
      </div>
    </div>
  );
}