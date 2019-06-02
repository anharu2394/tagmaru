import { connect } from 'react-redux';
import { UserState, Token } from '../states/userState'
import { PostsState } from '../states/postsState'
import { fetchTrendPostsWorker, fetchTimelinePostsWorker } from '../workers/postsWorker'
import { fetchTrendTagsWorker, fetchFollowTagsWorker, fetchLoggedTrendTagsWorker, followTagWorker, unFollowTagWorker, fetchLoggedSearchTagsWorker } from '../workers/tagsWorker'
import { FollowParams, SearchParams, tagActions } from '../actions/tagAction';
import { TagsState } from '../states/tagsState';
import HomePostsComponent from '../components/HomePosts'

export interface PostActions {
  fetchTrendPosts: () => Promise<any>;
  fetchTimelinePosts: (token: Token) => Promise<any>;
  fetchFollowTags: (token: Token) => Promise<any>;
  fetchLoggedTrendTags: (token: Token) => Promise<any>;
  fetchLoggedSearchTags: (any) => Promise<any>;
  followTag: (params: FollowParams) => Promise<any>;
  unFollowTag: (params: FollowParams) => Promise<any>;
}

export interface HomePostsState {
  user: UserState;
  posts: PostsState; 
  tags: TagsState;
}

const mapDispatchToProps = (dispatch) => ({
  fetchTrendPosts: () => fetchTrendPostsWorker(dispatch, {}),
  fetchTimelinePosts: (token: Token) => fetchTimelinePostsWorker(dispatch, token),
  fetchFollowTags: (token) => fetchFollowTagsWorker(dispatch,token),
  fetchLoggedTrendTags: (token) => fetchLoggedTrendTagsWorker(dispatch,token),
  fetchLoggedSearchTags: (params) => fetchLoggedSearchTagsWorker(dispatch, params),
  followTag: (params) => followTagWorker(dispatch, params),
  unFollowTag: (params) => unFollowTagWorker(dispatch, params),
})


const  mapStateToProps = (state) => Object.assign({},{user: state.user, posts: state.posts, tags: state.tags});

export default connect<HomePostsState,PostActions,{}>(mapStateToProps,mapDispatchToProps)(HomePostsComponent)
