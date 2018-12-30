import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { tagsReducer, TagsState } from './states/tagsState';
import { userReducer, UserState } from './states/userState';
import { postsReducer, PostsState } from './states/postsState';
import { tagPageReducer, TagPageState } from './states/tagpageState'
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export type AppState = {
  router: any,
  tags: TagsState,
  posts: PostsState,
  user: UserState,
  tagPage: TagPageState,
} 

const createRootReducer = (history) => combineReducers<AppState>({
  router: connectRouter(history),
  tags: tagsReducer,
  posts: postsReducer,
  user: userReducer,
  tagPage: tagPageReducer,
});

export const history = createBrowserHistory()

const store = createStore(
  createRootReducer(history),
  applyMiddleware(
    routerMiddleware(history),
    thunk,
  ),
);

export default store;
