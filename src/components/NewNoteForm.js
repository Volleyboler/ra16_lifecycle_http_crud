import { Component } from 'react';

export default class NewNoteForm extends Component {
  
  render() {
    return (
      <form className="note-form" onSubmit={this.props.addNote}>
        <textarea className='form__textarea' rows="3" cols="30" required></textarea>
        <button className='btn form__btn'>Add</button>
      </form>
    )
  }
}