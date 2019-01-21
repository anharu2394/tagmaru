import * as React from 'react';
import { TagPageActions } from '../containers/tagpageContainer'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { TagPageState } from '../states/tagpageState'
import Post from './Post'
import {Helmet} from "react-helmet";

export interface PassedProps {
  id: number;
}

type TagPageProps = PassedProps & TagPageActions & TagPageState 
export default class TagPage extends React.Component<TagPageProps,{}> {
  componentDidMount() {
    this.props.fetchTag(this.props.id)
    this.props.fetchTrendPosts(this.props.id)
    this.props.fetchNewPosts(this.props.id)
  }
  render() {
    return (
      <Tabs>
        <Helmet>
          <title>{this.props.tag.name}の最新かつ人気な記事 - たぐまる</title>
        </Helmet>
        <h1>{this.props.tag.name}</h1>
        <TabList>
          <Tab>Trend</Tab>
          <Tab>New</Tab>
        </TabList>

        <TabPanel>
          <h2>{this.props.tag.name}の最新かつ人気な記事を掲載しています！</h2>
          {
            this.props.trendPosts.map((post) => <Post key={post.id} {...post} />)
          }
        </TabPanel>
        <TabPanel>
          <h2>{this.props.tag.name}の最新な記事を掲載しています！</h2>
          {
            this.props.newPosts.map((post) => <Post key={post.id} {...post} />)
          }
        </TabPanel>
      </Tabs>
    )
  }
} 
