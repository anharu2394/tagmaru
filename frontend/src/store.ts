import { createStore, combineReducers } from 'redux';
import { tagsReducer, TagsState } from './states/tagsState';

export type AppState = {
  tags: TagsState
} 

const store = createStore(
  combineReducers<AppState>({
    tags: tagsReducer
  })
);

export default store;
