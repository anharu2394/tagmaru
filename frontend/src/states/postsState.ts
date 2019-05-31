import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { postActions } from '../actions/postAction';

export interface Post {
  id: number;
  title: string;
  url: string;
  image: null | string;
  posted_at: string;
  fab_count: number;
  provider: string;
} 

export interface PostsState {
  trendPosts: Post[];
  timelinePosts: Post[];
}

const initialState: PostsState = {trendPosts: [], timelinePosts: []};

export const postsReducer = reducerWithInitialState(initialState)
  .case(postActions.fetchTrendPosts.done, (state, payload) => {
    return Object.assign({}, state, { trendPosts: payload.result });
  })
  .case(postActions.fetchTimelinePosts.done, (state, payload) => {
    return Object.assign({}, state, { timelinePosts: payload.result });
  });
