import { connect } from 'react-redux';
import { UserState, Token } from '../states/userState'
import { PostsState } from '../states/postsState'
import { TagsState } from '../states/tagsState'
import { FollowParams, SearchParams, tagActions } from '../actions/tagAction';
import { fetchTimelinePostsWorker } from '../workers/postsWorker'
import { fetchTrendTagsWorker, fetchFollowTagsWorker, fetchLoggedTrendTagsWorker, followTagWorker, unFollowTagWorker, fetchLoggedSearchTagsWorker } from '../workers/tagsWorker'
import {userActions} from '../actions/userAction'
import MyPageComponent from '../components/MyPage'

export interface MyPageActions {
  fetchTimelinePosts: (token: Token) => Promise<any>;
  fetchFollowTags: (token: Token) => Promise<any>;
  followTag: (params: FollowParams) => Promise<any>;
  unFollowTag: (params: FollowParams) => Promise<any>;
  logout?:  () => void;
}

export interface MyPageState {
  user: UserState;
  posts: PostsState; 
  tags: TagsState;
}

const mapDispatchToProps = (dispatch) => ({
  fetchTimelinePosts: (token: Token) => fetchTimelinePostsWorker(dispatch, token),
  fetchFollowTags: (token: Token) => fetchFollowTagsWorker(dispatch,token),
  followTag: (params) => followTagWorker(dispatch, params),
  unFollowTag: (params) => unFollowTagWorker(dispatch, params),
  logout: () => {
    dispatch(userActions.logout({}))
    localStorage.clear()
  },
})


const  mapStateToProps = (state) => Object.assign({},{
  user: state.user,
  posts: state.posts,
  tags: state.tags
});

export default connect<MyPageState,MyPageActions,{}>(mapStateToProps,mapDispatchToProps)(MyPageComponent)
