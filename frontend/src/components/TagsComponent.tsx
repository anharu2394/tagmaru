import * as React from 'react';
import { Tag } from '../states/tagsState';
import { Token,UserState } from '../states/userState';
import TagComponent from './Tag'
import { FollowParams, SearchParams, tagActions } from '../actions/tagAction';

export interface OwnProps {
  tags: Tag[];
  followTag: (params: FollowParams) => Promise<any>;
  unFollowTag: (params: FollowParams) => Promise<any>;
  token: Token;
}

type TagsProps = OwnProps;

export class TagsComponent extends React.Component<TagsProps,{}> {
  componentDidMount() {
  }
  render() {
    return (
      <div>
        {
          this.props.tags.map((tag) => (<TagComponent {...tag} key={tag.id} followTag={this.props.followTag} unFollowTag={this.props.unFollowTag} token={this.props.token} />))
        }
      </div>
    );
  }
};
