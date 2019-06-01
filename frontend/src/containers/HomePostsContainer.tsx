import { connect } from 'react-redux';
import { UserState, Token } from '../states/userState'
import { PostsState } from '../states/postsState'
import { fetchTrendPostsWorker, fetchTimelinePostsWorker } from '../workers/postsWorker'
import HomePostsComponent from '../components/HomePosts'
import { fetchLoggedSearchTagsWorker } from '../workers/tagsWorker'

export interface PostActions {
  fetchTrendPosts: () => Promise<any>;
  fetchTimelinePosts: (token: Token) => Promise<any>;
  fetchLoggedSearchTags: (any) => Promise<any>;
}

export interface HomePostsState {
  user: UserState;
  posts: PostsState; 
}

const mapDispatchToProps = (dispatch) => ({
  fetchTrendPosts: () => fetchTrendPostsWorker(dispatch, {}),
  fetchTimelinePosts: (token: Token) => fetchTimelinePostsWorker(dispatch, token),
  fetchLoggedSearchTags: (params) => fetchLoggedSearchTagsWorker(dispatch, params),
})


const  mapStateToProps = (state) => Object.assign({},{user: state.user, posts: state.posts});

export default connect<HomePostsState,PostActions,{}>(mapStateToProps,mapDispatchToProps)(HomePostsComponent)
