import { connect } from 'react-redux';
import { UserState, Token } from '../states/userState'
import { PostsState } from '../states/postsState'
import { fetchTimelinePostsWorker } from '../workers/postsWorker'
import {userActions} from '../actions/userAction'
import MyPageComponent from '../components/MyPage'

export interface MyPageActions {
  fetchTimelinePosts: (token: Token) => Promise<any>;
  logout?:  () => void;
}

export interface MyPageState {
  user: UserState;
  posts: PostsState; 
}

const mapDispatchToProps = (dispatch) => ({
  fetchTimelinePosts: (token: Token) => fetchTimelinePostsWorker(dispatch, token),
  logout: () => {
    dispatch(userActions.logout({}))
    localStorage.clear()
  },
})


const  mapStateToProps = (state) => Object.assign({},{
  user: state.user,
  posts: state.posts
});

export default connect<MyPageState,MyPageActions,{}>(mapStateToProps,mapDispatchToProps)(MyPageComponent)
