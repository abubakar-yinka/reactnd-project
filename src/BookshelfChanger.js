import React, { Component } from 'react';

class BookshelfChanger extends Component {
  state = {
    value: this.props.shelf,
  }
  
  handleChange = event => {
    const { value } = event.target;
    const { onMove, book } = this.props;
    this.setState({ value });
    onMove(book, value);
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Have Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookshelfChanger;