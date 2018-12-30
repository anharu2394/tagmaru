import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tagPageActions } from '../actions/tagpageAction'
import { Post } from './postsState'
import { Tag } from './tagsState'
export interface TagPageState {
  tag: Tag;
  trendPosts: Post[];
  newPosts: Post[];
}

const initialState: TagPageState = {tag: {id:0,name:""}, trendPosts: [], newPosts:[]};

export const tagPageReducer = reducerWithInitialState(initialState)
  .case(tagPageActions.fetchTag.done, (state, payload) => {
    return Object.assign({}, state, { tag: payload.result });
  })
  .case(tagPageActions.fetchTrendPosts.done, (state, payload) => {
    return Object.assign({}, state, { trendPosts: payload.result });
  })
  .case(tagPageActions.fetchNewPosts.done, (state, payload) => {
    return Object.assign({}, state, { newPosts: payload.result });
  })
