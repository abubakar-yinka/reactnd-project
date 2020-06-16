import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {
  bookshelves = [
    {  name: 'Currently Reading', key: 'currentlyReading' },
    {  name: 'Want to Read', key: 'wantToRead' },
    {  name: 'Have Read', key: 'read' }
  ];

  state = {
    books: [],
    searchBooks: [],
    error: false
  };

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).catch(error => {
      this.setState({ error: true });
    });
    if (shelf === 'none') {
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id)
      }));
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }));
    }
  };

  searchForBooks = query => {
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  };

  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  };

  render() {
    const { books, searchBooks, error } = this.state;
    if (error) {
      return <h3>Oops Sorry! Network error... Please try again later.</h3>;
    }
    return (
      <div className="app">
        <Route 
          exact 
          path="/" 
          render={() => (
            <ListBooks  
              bookshelves={this.bookshelves} 
              books={books} 
              onMove={this.moveBook}
            />
          )} />
        <Route 
          path="/search" 
          render={() => (
            <SearchBooks 
              searchBooks={searchBooks}
              books={books}
              onSearch={this.searchForBooks}
              onMove={this.moveBook}
              onResetSearch={this.resetSearch}
            />
          )}/>
      </div>
    )
  }
}

export default BooksApp;


