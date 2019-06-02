import * as React from 'react';
import { Flex, Box } from '@rebass/grid';
import { TagsComponent } from '../components/TagsComponent';
import PostsComponent from '../components/PostsComponent'
import { User } from '../states/userState';
import { TagTitle } from './HomePosts'
import Button from '../shared/Button'
import {Helmet} from "react-helmet";
import { MyPageActions, MyPageState } from '../containers/MyPageContainer';

type MyPageProps = MyPageActions & MyPageState;

export default class MyPage extends React.Component<MyPageProps> {
  componentDidMount() {
    this.props.fetchTimelinePosts(this.props.user.token)
    this.props.fetchFollowTags(this.props.user.token)
  }
  render() {
    const { followTags } = this.props.tags;
    const { followTag, unFollowTag } = this.props;
    return(
      <Flex flexWrap='wrap'>
        <Helmet>
          <title>{this.props.user.currentUser.name} さんのマイページ - たぐまる</title>
        </Helmet>
        <Box width={[1,2/3,3/4]} >
          <h1>{this.props.user.currentUser.name}さんのページ</h1>
          <h2>おすすめ記事</h2>
          <PostsComponent posts={this.props.posts.timelinePosts} />
        </Box>
        <Box width={[1,1/3,1/4]}>
          <TagTitle>フォロー中のタグ</TagTitle>
          <TagsComponent tags={followTags} followTag={followTag} unFollowTag={unFollowTag} token={this.props.user.token} />
          <Button onClick={this.props.logout}>ログアウト</Button>
        </Box>
      </Flex>
    )
  }
}
