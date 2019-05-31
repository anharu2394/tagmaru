import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import '../assets/css/tabs.css';
import PostsContainer from '../containers/postContainer'
import TagsContainer from '../containers/tagContainer'
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import { fetchLoggedSearchTagsWorker } from '../workers/tagsWorker'
import { UserState } from '../states/userState'

interface HomePostsProps {
  fetchLoggedSearchTags: (any) => Promise<any>;
}
class HomePosts extends React.Component<HomePostsProps & UserState,{}> {
  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  handler(e) {
    const params = Object.assign({ keyword: encodeURIComponent(e.target.value) }, this.props.token)
    this.props.fetchLoggedSearchTags(params)
  }
  render() {
    return (
      <Flex flexWrap='wrap'>
        <WrapperBox width={[1,2/3,3/4]} >
          <Tabs>
            <TabList>
              <Tab>Trend</Tab>
              <Tab>Timeline</Tab>
            </TabList>

            <TabPanel>
              <h2>最新かつ人気のある記事を掲載しています！</h2>
              <PostsContainer trend />
            </TabPanel>
            <TabPanel>
              <h2>フォローしてるタグに関する記事を掲載しています！</h2>
              <PostsContainer timeline />
            </TabPanel>
          </Tabs>
        </WrapperBox>
        <Box width={[1,1/3,1/4]}>
          <TagTitle>人気なタグ</TagTitle>
          <TagsContainer trend />
          <TagTitle>フォロー中のタグ</TagTitle>
          <TagsContainer follow />
          <TagTitle>タグ検索 🔍</TagTitle>
          <TextBox type="text" placeholder='スクロールして結果を見る' onChange={this.handler} />
          <TagsContainer search />
        </Box>
      </Flex>
    )
  }
}

const WrapperBox = styled(Box)`
  padding: 5px;
`
export const TagTitle = styled.h3`
  background: rgb(182,208,232);
  color: #fff;
  padding: 10px;
  margin: 30px 0 0 0;
  font-size: 20px;
  box-shadow: 0px 2px 3px rgba(0,0,0,0.33);
`
const TextBox = styled.input`
  padding:5px 0 5px;
  font-size:1.3em;
  font-family:Arial, sans-serif;
  border:solid 2px #ccc;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  width: 100%;
`

const  mapStateToProps = (state) => Object.assign({},state.user);
const  mapDispatchToProps = (dispatch) => ({
    fetchLoggedSearchTags: (params) => fetchLoggedSearchTagsWorker(dispatch, params),
})
export default connect<UserState,{ fetchLoggedSearchTags: (any) => Promise<any>},{}>(mapStateToProps,mapDispatchToProps)(HomePosts)
