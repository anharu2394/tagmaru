import { Tag } from '../states/tagsState';
import { Post } from '../states/postsState';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory();
export const tagPageActions = {
  fetchTag: actionCreator.async<{id: number},Tag,{}>('FETCH_TAG'),
  fetchTrendPosts: actionCreator.async<{id: number},Post[],{}>('FETCH_TREND_POSTS'),
  fetchNewPosts: actionCreator.async<{id: number},Post[],{}>('FETCH_NEW_POSTS'),
}


