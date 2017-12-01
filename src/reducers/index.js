import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import booksReducer from './books';
import editorReudcer from './editor';

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  // your reducer here
  books: booksReducer,
  editor: editorReudcer
});
