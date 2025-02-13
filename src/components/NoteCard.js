import { Component } from 'react';

export default class NoteCard extends Component {

  render() {
    return (
      <li className='note-item' id={this.props.id} onClick={this.props.removeNote}>
        <p className='note-text'>{this.props.text}</p>
        <button className='btn remove-btn'>X</button>
      </li>
    )
  }
}