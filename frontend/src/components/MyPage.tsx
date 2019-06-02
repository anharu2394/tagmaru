import * as React from 'react';
import { Flex, Box } from '@rebass/grid';
import TagsContainer from '../containers/tagContainer';
import PostsContainer from '../containers/postContainer'
import { User } from '../states/userState';
import { TagTitle } from './HomePosts'
import Button from '../shared/Button'
import {Helmet} from "react-helmet";
import { MyPageActions, MyPageState } from '../containers/MyPageContainer';

type MyPageProps = MyPageActions & MyPageState;

export default class MyPage extends React.Component<MyPageProps> {
  componentDidMount() {
    this.props.fetchTimelinePosts(this.props.user.token)
  }
  render() {
    return(
      <Flex flexWrap='wrap'>
        <Helmet>
          <title>{this.props.user.currentUser.name} さんのマイページ - たぐまる</title>
        </Helmet>
        <Box width={[1,2/3,3/4]} >
          <h1>{this.props.user.currentUser.name}さんのページ</h1>
          <h2>おすすめ記事</h2>
          <PostsContainer posts={this.props.posts.timelinePosts} />
        </Box>
        <Box width={[1,1/3,1/4]}>
          <TagTitle>フォロー中のタグ</TagTitle>
          <TagsContainer follow />
          <Button onClick={this.props.logout}>ログアウト</Button>
        </Box>
      </Flex>
    )
  }
}
