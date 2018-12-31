import * as React from 'react';
import { TagsState } from '../states/tagsState';
import { UserState } from '../states/userState';
import { TagActions } from '../containers/tagContainer';
import Tag from './Tag'
export interface OwnProps {
  trend?: boolean;
  follow?: boolean;
  search?: boolean
}

type TagsProps = OwnProps & TagsState & UserState& TagActions;

export class TagsComponent extends React.Component<TagsProps,{}> {
  componentDidMount() {
    ('trend' in this.props) ? this.props.loggedIn
      ? this.props.fetchLoggedTrendTags(this.props.token)
      : this.props.fetchTrendTags()
      : ( 'follow' in this.props) ? this.props.fetchFollowTags(this.props.token).then(() => console.log(this.props))
      : null
  }
  render() {
    return (
      <div>
        {
          ( ('trend' in this.props) ? this.props.trendTags 
            : ('follow' in this.props) ? this.props.followTags 
            : ('search' in this.props) ? this.props.searchTags
            : []
          ).map((tag) => (<Tag {...tag} key={tag.id} followTag={this.props.followTag} unFollowTag={this.props.unFollowTag} token={this.props.token} />))
        }
      </div>
    );
  }
};
