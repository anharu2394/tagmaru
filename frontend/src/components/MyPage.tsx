import * as React from 'react';
import { Flex, Box } from '@rebass/grid';
import TagsContainer from '../containers/tagContainer';
import PostsContainer from '../containers/postContainer'
import { User } from '../states/userState';
import { TagTitle } from './HomePosts'
import Button from '../shared/Button'

interface MyPageProps {
  currentUser: User;
  logout?: () => void;
}

export default class MyPage extends React.Component<MyPageProps> {
  render() {
    return(
      <Flex flexWrap='wrap'>
        <Box width={[1,2/3,3/4]} >
          <h1>{this.props.currentUser.name}さんのページ</h1>
          <h2>おすすめ記事</h2>
          <PostsContainer timeline />
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
