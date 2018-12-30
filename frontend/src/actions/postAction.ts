import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

import { Post } from '../states/postsState'
import { Token } from '../states/userState'


export const postActions = {
  fetchTrendPosts: actionCreator.async<{},Post[],{}>('FETCH_TREND_POSTS'),
  fetchTimelinePosts: actionCreator.async<Token,Post[],{}>('FETCH_TIMELINE_POSTS'),
};
