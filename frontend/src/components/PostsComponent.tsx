import * as React from 'react';
import { PostsState } from '../states/postsState';
import { UserState } from '../states/userState'; 
import { PostActions } from '../containers/postContainer';
import Post from '../components/Post.tsx';

export interface OwnProps {
  trend?: boolean;
  timeline?: boolean;
}
export type PostsProps = UserState & PostsState & OwnProps & PostActions;

export default class PostsComponent extends React.Component<PostsProps>{
  componentDidMount() {
    'trend' in this.props ? this.props.fetchTrendPosts()
    : 'timeline' in this.props ?this.props.fetchTimelinePosts(this.props.token)
    : null
  }
  render() {
    if ('trend' in this.props) {
      return (<div>
        {
          this.props.trendPosts.map((post) => <Post key={post.id} {...post}/>)
        }  
      </div>)
    }
    else if ('timeline' in this.props) {
      return (<div className="timeline">
        {
          this.props.timelinePosts.map((post) => <Post key={post.id} {...post}/>)
        }  
      </div>)
    }
    else { 
      return <div></div>
    }
  }
}
