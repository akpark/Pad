var React = require('react');
var NoteStore = require('../../stores/note_store');
var NotesApiUtil = require('../../util/notes_api_util');
var NoteActions = require('../../actions/note_actions');
var NoteIndexItem = require('./index_item');
var OptionsDropdown = require('./options_dropdown');
var History = require('react-router').History;

var NotesIndex = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return ({notes: NoteStore.all(), optionsClicked: false});
  },

  componentDidMount: function() {
    this.notesListener = NoteStore.addListener(this._onChange);
    NotesApiUtil.fetchAllNotes();
  },

  componentWillUnmount: function() {
    this.notesListener.remove();
  },

  _onChange: function() {
    this.setState({notes: NoteStore.all()});
  },

  showOptions: function() {
    if (this.state.optionsClicked) {
      this.setState({optionsClicked: false});
    } else {
      this.setState({optionsClicked: true});
    }
  },

  render: function() {
    var notes = this.state.notes.map(function(note, key) {
      if (note) {
        return (
          <NoteIndexItem key={key} note={note}>{note.title}</NoteIndexItem>
        );
      }
    }.bind(this));

    var optionsDropdown;
    if (this.state.optionsClicked) {
      optionsDropdown = <OptionsDropdown />;
    }

    return(
      <div className="notes-index">
        <div className="notes-index-header">
          <div className="notes-index-title">NOTES</div>
          <div className="notes-index-header-bottom group">
            <div className="number-of-notes">567 Notes</div>
            <div onClick={this.showOptions} className="options-dropdown-click">Options &#8964;
              {optionsDropdown}
            </div>
          </div>
        </div>

        <div className="note-index-items">
          {notes}
        </div>
      </div>
    );
  }
});

module.exports = NotesIndex;
