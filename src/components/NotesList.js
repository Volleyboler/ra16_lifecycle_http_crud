import { Component } from 'react';
import NoteCard from './NoteCard';

export default class NotesList extends Component {
  
  componentDidMount() {
    this.props.getNotes()
  }

  render() {
    if (this.props.notesArray.length < 1) {
      return ( null );
    }

    return (
      <ul className='notes-list'>
        {this.props.notesArray.map(note => <NoteCard key={note.id} {...note} removeNote={this.props.removeNote}/>)}
      </ul>
    )
  }
}