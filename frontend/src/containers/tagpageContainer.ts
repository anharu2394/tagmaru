import { connect } from 'react-redux';
import TagPage, { PassedProps} from '../components/TagPage'
import { TagPageState } from '../states/tagpageState'
import { fetchTagWorker, fetchTrendPostsWorker, fetchNewPostsWorker } from '../workers/tagpageWorker'

export interface TagPageActions {
  fetchTag: (id: number) => Promise<any>;
  fetchTrendPosts: (id: number) => Promise<any>;
  fetchNewPosts: (id: number) => Promise<any>;
}
const mapDispatchToProps = (dispatch) => ({
  fetchTag: (id: number) => fetchTagWorker(dispatch, {id: id}),
  fetchTrendPosts: (id: number) => fetchTrendPostsWorker(dispatch, {id: id}),
  fetchNewPosts: (id: number) => fetchNewPostsWorker(dispatch, {id: id}),
})

const  mapStateToProps = (state) =>  Object.assign({}, state.tagPage)

export default connect<TagPageState, TagPageActions,PassedProps>(mapStateToProps,mapDispatchToProps)(TagPage)
