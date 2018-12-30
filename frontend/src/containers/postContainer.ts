import { connect } from 'react-redux';
import PostsComponent from '../components/PostsComponent'
import { fetchTrendPostsWorker, fetchTimelinePostsWorker } from '../workers/postsWorker'
import { OwnProps } from '../components/PostsComponent'
import { PostsState } from '../states/postsState'
import { UserState, Token } from '../states/userState'

export interface PostActions {
  fetchTrendPosts: () => Promise<any>;
  fetchTimelinePosts: (token: Token) => Promise<any>;
}
type State = PostsState & UserState
const mapDispatchToProps = (dispatch) => ({
  fetchTrendPosts: () => fetchTrendPostsWorker(dispatch, {}),
  fetchTimelinePosts: (token: Token) => fetchTimelinePostsWorker(dispatch, token),
})

const  mapStateToProps = (state) =>  Object.assign({}, state.user, state.posts)

export default connect<State, PostActions, OwnProps>(mapStateToProps, mapDispatchToProps)(PostsComponent)
