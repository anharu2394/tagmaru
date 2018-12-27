import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { tagActions } from '../actions/tagAction';
import { TagsComponent } from '../components/TagsComponent'

export interface TagActions {
}

function mapDispatchToProps() {
  return {
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.tags);
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsComponent);
