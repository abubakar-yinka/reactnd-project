import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBooksInput from './SearchBooksInput';
import SearchBooksResult from './SearchBooksResult';

class SearchBooks extends Component {
  render() {
    const { books, searchBooks, onSearch, onResetSearch, onMove } = this.props;
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/">
                    <button 
                        className="close-search" 
                        onClick={() => (onResetSearch)}>
                            Close
                    </button>
                </Link>
                <SearchBooksInput onSearch={onSearch} />
            </div>        
            <SearchBooksResult books={books} searchBooks={searchBooks} onMove={onMove}/>
        </div>
    );
  }
}

export default SearchBooks;