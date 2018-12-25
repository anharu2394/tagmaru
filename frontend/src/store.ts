import { createStore, combineReducers } from 'redux';
import { tagsReducer, tagsState } from './states/tagsState';

export type AppState = {
  tags: tagsState
} 

const store = createStore(
  combineReducers<AppState>({
    tags: tagsReducer
  })
);

export default store;
