import actionCreatorFactory from 'typescript-fsa';
import { Tag } from '../states/tagsState';
import { Token } from '../states/userState'
const actionCreator = actionCreatorFactory();

export type FollowParams = Token & { targetId: number }  
export type SearchParams = Token & { keyword: string }
  
export const tagActions = {
  fetchTrendTags: actionCreator.async<{},Tag[],{}>('FETCH_TREND_TAGS'), 
  fetchFollowTags: actionCreator.async<Token,Tag[],{}>('FETCH_FOLLOW_TAGS'), 
  fetchLoggedTrendTags: actionCreator.async<Token,Tag[],{}>('FETCH_LOGGED_TREND_TAGS'), 
  followTag:  actionCreator.async<FollowParams,Tag[],{}>('FOLLOW_TAG'),
  unFollowTag:  actionCreator.async<FollowParams,Tag[],{}>('UNFOLLOW_TAG'),
  fetchLoggedSearchTags:  actionCreator.async<SearchParams,Tag[],{}>('SEARCH_TAGS'),
};
