import wrapAsyncWorker from '../wrapAsyncWorker';
import { tagPageActions } from '../actions/tagpageAction';
import { Tag } from '../states/tagsState';
import { Post } from '../states/postsState';
import { getTag, getTrendPosts, getNewPosts } from '../apis/tagpageApi'

export const fetchTagWorker = wrapAsyncWorker(tagPageActions.fetchTag, (params): Promise<Tag> => getTag(params.id));

export const fetchTrendPostsWorker = wrapAsyncWorker(tagPageActions.fetchTrendPosts, (params): Promise<Post[]> => getTrendPosts(params.id));

export const fetchNewPostsWorker = wrapAsyncWorker(tagPageActions.fetchNewPosts, (params): Promise<Post[]> => getNewPosts(params.id));

