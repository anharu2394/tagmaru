import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tagActions } from '../actions/tagAction';

export interface Tag {
  id: number;
  name: string;
  following?: boolean;
}

export interface TagsState { 
  trendTags: Tag[];
  followTags: Tag[];
  searchTags: Tag[];
}

const initialState: TagsState = {trendTags: [], followTags: [], searchTags:[]};

export const tagsReducer = reducerWithInitialState(initialState)
  .case(tagActions.fetchTrendTags.done, (state, payload) => {
    return Object.assign({}, state, { trendTags: payload.result });
  })
  .case(tagActions.fetchLoggedTrendTags.done, (state, payload) => {
    return Object.assign({}, state, { trendTags: payload.result });
  })
  .case(tagActions.fetchFollowTags.done, (state, payload) => {
    return Object.assign({}, state, { followTags: payload.result });
  })
  .case(tagActions.fetchLoggedSearchTags.done, (state, payload) => {
    return Object.assign({}, state, { searchTags: payload.result });
  });
