import { Component } from 'react';
import NewNoteForm from './NewNoteForm';
import NotesList from './NotesList';

export default class NotesApp extends Component{
  constructor(props) {
    super(props);
    this.state = {notesArray: []};
    this.getNotes = this.getNotes.bind(this);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  async getNotes() {
    let array = [];
    await fetch('http://localhost:7070/notes').then(r => r.json())
    .then(result => result.forEach(note => array.push(note)));

    if (this.state.notesArray.length === array.length) {
      return;
    }

    this.setState({notesArray: array})
  }

  async addNote(e) {
    e.preventDefault();

    const noteText = e.target[0].value;
    
    await fetch('http://localhost:7070/notes', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({text: noteText})
    })

    e.target[0].value = '';

    this.getNotes();
  }

  async removeNote(e) {
    if (e.target.classList.contains('remove-btn')) {
      await fetch(`http://localhost:7070/notes/${e.currentTarget.id}`, {method: 'DELETE'})
    }

    this.getNotes();
  }

  render() {
    return (
      <main className="main">
        <div className="header__wrapper">
          <h1 className="notes-header">Notes</h1>
          <button className="btn refresh-btn" onClick={this.getNotes}>
            <img className='refresh__img' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Ic_refresh_48px.svg/1200px-Ic_refresh_48px.svg.png' onClick={this.getNotes}></img>
          </button>
        </div>
        <div className="notes__wrapper">
          <NotesList notesArray={this.state.notesArray} getNotes={this.getNotes} removeNote={this.removeNote}/>
        </div>
        <div className="form__wrapper">
          <NewNoteForm addNote={this.addNote}/>
        </div>
      </main>
    )
  }
}