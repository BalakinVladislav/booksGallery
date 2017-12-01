// users reducer
export default function books(state = [
      {
        id: 1,
        name: 'Harry Potter',
        nameDescription: 'best book in the world',
        author: 'J.R.Rouling',
        authorBiography: 'Talanted author from London'
      }
    ], action) {
  switch (action.type) {
    case 'BOOKS_ADD':
      if (!action.name) {
        return state;
      }

      const book = {
        id: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
        name: action.name,
        nameDescription: action.nameDescription,
        author: action.author,
        authorBiography: action.authorBiography
      };

      const localBookState = JSON.parse(localStorage.getItem("books"));
      if (!Array.isArray(localBookState)) {
      localStorage.setItem("books", JSON.stringify([book]))
    } else {
              localStorage.setItem("books", JSON.stringify([...localBookState, book]));
    }

        console.log(localStorage.getItem("books"));
        console.log(localStorage);

      return [...state, book];

    case 'BOOKS_REMOVE': {
      const localBookState = JSON.parse(localStorage.getItem("books")).filter(book =>
        Number(book.id) !== Number(action.book_id)
        );
      localStorage.setItem("books", JSON.stringify(localBookState));
      return state.filter(book =>
        Number(book.id) !== Number(action.book_id)
      );
}
      case 'BOOKS_RESTORE_FROM_LOCALSTORAGE': {
      const localBooksState = JSON.parse(localStorage.getItem("books"));
      if (!Array.isArray(localBooksState)) {
          return state
      } else {
          return [...state, ...localBooksState];
      }
}

      case 'BOOKS_EDIT': {
        
        return state
      }
    // initial state
    default:
      return state;
  }
}