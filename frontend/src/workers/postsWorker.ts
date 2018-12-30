import wrapAsyncWorker from '../wrapAsyncWorker';
import { postActions } from '../actions/postAction';
import { Post } from '../states/postsState';
import { getTrendPosts, getTimelinePosts } from '../apis/postApi'

export const fetchTrendPostsWorker = wrapAsyncWorker(postActions.fetchTrendPosts, (): Promise<Post[]> => getTrendPosts());
export const fetchTimelinePostsWorker = wrapAsyncWorker(postActions.fetchTimelinePosts, (token): Promise<Post[]> => getTimelinePosts(token));
