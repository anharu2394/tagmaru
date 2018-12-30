import { Action, ActionCreator, Success } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { FollowParams, SearchParams, tagActions } from '../actions/tagAction';
import { Tag, TagsState } from '../states/tagsState';
import { TagsComponent, OwnProps } from '../components/TagsComponent';
import { getTrendTags } from '../apis/tagApi'
import { fetchTrendTagsWorker, fetchFollowTagsWorker, fetchLoggedTrendTagsWorker, followTagWorker, unFollowTagWorker, fetchLoggedSearchTagsWorker } from '../workers/tagsWorker'
import { UserState, Token } from '../states/userState'

export interface TagActions {
  fetchTrendTags: () => Promise<any>;
  fetchFollowTags: (token: Token) => Promise<any>;
  fetchLoggedTrendTags: (token: Token) => Promise<any>;
  followTag: (params: FollowParams) => Promise<any>;
  unFollowTag: (params: FollowParams) => Promise<any>;
  fetchLoggedSearchTags: (params: SearchParams) => Promise<any>;
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
  fetchTrendTags: () => fetchTrendTagsWorker(dispatch, {}),
  fetchFollowTags: (token) => fetchFollowTagsWorker(dispatch,token),
  fetchLoggedTrendTags: (token) => fetchLoggedTrendTagsWorker(dispatch,token),
  followTag: (params) => followTagWorker(dispatch, params),
  unFollowTag: (params) => unFollowTagWorker(dispatch, params),
  fetchLoggedSearchTags: (params) => fetchLoggedSearchTagsWorker(dispatch, params),
})

function mapStateToProps(appState) {
  return Object.assign({}, appState.user, appState.tags);
}

export default connect<TagsState & UserState,TagActions,OwnProps>(mapStateToProps, mapDispatchToProps)(TagsComponent);
