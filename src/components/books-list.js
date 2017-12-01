import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { removeBook, showEditor } from '../actions';
import EditWindow from './edit-books';

class BooksList extends React.Component {
    renderBooks() {
        const {
            books,
            onClickBook,
            onClickEditor
        } = this.props;

        return books.map((book, id) => (
            <div
                className="books-list__book"
                key={id}
            >
                <div className="closer" 
                    onClick={onClickBook}
                    data-id={book.id}
                />
                <div className="open_editor"
                    onClick={onClickEditor}
                    data-id={book.id}
                />
                <p>Название книги</p>
                <p>{book.name}</p>
                <p>Описание</p>
                <p>{book.nameDescription}</p>
                <p>Автор</p>
                <p>{book.author}</p>
                <p>Об авторе</p>
                <p>{book.authorBiography}</p>
            </div>
        ));
    }

    render() {
        return (
            <div className="books-list">
                <EditWindow/>
                {this.renderBooks()}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeBook,
    showEditor
  }, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const books = ownProps.books || [];
  return {
    ...stateProps,
    ...ownProps,
    onClickBook: e => {
      const book_id = e.target.dataset.id;
      dispatchProps.removeBook(book_id);
    },
    onClickEditor: e => {
        const book_id = Number(e.target.dataset.id);
        const book = books.filter(book => book.id === book_id)[0];
        dispatchProps.showEditor(book);
        }
    } 
}

export default connect(
  null,
  mapDispatchToProps,
  mergeProps
)(BooksList);