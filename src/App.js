import React from 'react';
import './index.css';
import Header from './components/Header'
import List from './components/Lists';
import Note from './components/Note';
import { generateId } from './utils';


class App extends React.Component {
  state = {
    notes: [
      {
        id: 'initial',
        title: 'Welcome to note app!',
        contents: 'Add note'
      }
    ],
    activeId: 'initial'
  }

  
  handleListItemClick = (id) => {
    this.setState({ activeId: id });
  }

  handleAddNote = () => {
    const id = generateId();
    this.setState({
      notes: [
        ...this.state.notes,
        {
          id,
          title: 'title',
          contents: 'content',
        },
      ],
      activeId: id,
    });
  }

  handleDeleteNote = () => {
    const notes = this.state.notes.filter((item) => item.id !== this.state.activeId);
    this.setState({
      notes,
      activeId: notes.length === 0 ? null : notes[0].id,
    });
  }

  handleEditNote = (type, e) => {
    const notes = [ ...this.state.notes ];
    const note = notes.find((item) => item.id === this.state.activeId)
    note[type] = e.target.value;
    this.setState({
      notes,
    });
  }

  render() {
    const { notes, activeId } = this.state;
    const activeNote = notes.filter((item) => item.id === activeId)[0];
    return (
      <div className="app">
        <Header
          onAddNote={this.handleAddNote}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className="container">
          <List
            notes={notes}
            activeId={activeId}
            onListItemClick={this.handleListItemClick}
          />
          {
            notes.length !== 0 && <Note note={activeNote} onEditNote={this.handleEditNote} />
          }
        </div>
      </div>
    );
  }
}

export default App;
