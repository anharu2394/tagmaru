import * as React from 'react';
import { PostsState } from '../states/postsState';
import { UserState } from '../states/userState'; 
import { PostActions } from '../containers/postContainer';
import { Post } from '../states/postsState';
import PostComponent from './Post';

export interface OwnProps {
  posts: Post[]
}
export default class PostsComponent extends React.Component<OwnProps>{
  componentDidMount() {
  }
  render() {
    return (
      <div>
        {
          this.props.posts.map((post) => <PostComponent key={post.id} {...post}/>)
        }
      </div>
    )
  }
}
