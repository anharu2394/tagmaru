import wrapAsyncWorker from '../wrapAsyncWorker';
import { tagActions } from '../actions/tagAction'; 
import { Tag } from '../states/tagsState';
import { getTrendTags, getFollowTags, getLoggedTrendTags, followTag, unFollowTag, getLoggedSearchTags } from '../apis/tagApi';

export const fetchTrendTagsWorker = wrapAsyncWorker(tagActions.fetchTrendTags, (): Promise<Tag[]> => getTrendTags());

export const fetchFollowTagsWorker = wrapAsyncWorker(tagActions.fetchFollowTags, (token): Promise<Tag[]> => getFollowTags(token));

export const fetchLoggedTrendTagsWorker = wrapAsyncWorker(tagActions.fetchLoggedTrendTags, (token): Promise<Tag[]> => getLoggedTrendTags(token));

export const followTagWorker = wrapAsyncWorker(tagActions.followTag, (token): Promise<Tag[]> => followTag(token));

export const unFollowTagWorker = wrapAsyncWorker(tagActions.unFollowTag, (token): Promise<Tag[]> => unFollowTag(token));

export const fetchLoggedSearchTagsWorker = wrapAsyncWorker(tagActions.fetchLoggedSearchTags, (token): Promise<Tag[]> => getLoggedSearchTags(token));

