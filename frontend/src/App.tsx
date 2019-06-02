import * as React from 'react';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { TagsComponent } from './components/TagsComponent'
import PostsComponent from './components/PostsComponent'
import Header from './components/Header'
import About from './components/About'
import Container from './shared/Container'
import {userActions} from './actions/userAction'
import { AppState } from './store'
import { UserState, Token } from './states/userState'
import { PostsState } from './states/postsState'
import { TagsState } from './states/tagsState'
import { Route, Switch } from 'react-router'
import LoginCallback from './components/LoginCallback'
import MyPage from './containers/MyPageContainer'
import { loginWorker } from './workers/userWorker'
import { fetchTrendTagsWorker, followTagWorker, unFollowTagWorker } from './workers/tagsWorker'
import HomePosts from './containers/HomePostsContainer'
import TagPage from './containers/tagpageContainer'
import { Redirect } from 'react-router-dom';
import Button from './shared/Button'
import styled from 'styled-components'
import ToggleButton from 'react-toggle-button'
import { fetchTrendPostsWorker } from './workers/postsWorker'
import { FollowParams, SearchParams, tagActions } from './actions/tagAction';

interface AppActions {
  login:  (token: any) => Promise<any>;
  logout:  () => void;
  checkLogin:  () => void;
  fetchTrendPosts: () => Promise<any>;
  fetchTrendTags: (token: Token) => Promise<any>;
  followTag: (params: FollowParams) => Promise<any>;
  unFollowTag: (params: FollowParams) => Promise<any>;
}

interface AppComponentState {
  user: UserState;
  posts: PostsState;
  tags: TagsState;
}

type AppProps = AppActions & AppComponentState; 

class App extends React.Component<AppProps, {}> {
 	root = Function('return this')()
  openWindow = e => {
   	this.root.open(process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:4000/auth/twitter?auth_origin_url=http://127.0.0.1:4001/login/callback' :'https://api.tagmaru.me/auth/twitter?auth_origin_url=https://tagmaru.me/login/callback');
  }
  componentDidMount() {
    this.props.checkLogin()
    this.props.fetchTrendPosts();
  }
  render() {
    return (
      <div>
        <Header openWindow={this.openWindow} loggedIn={this.props.user.loggedIn}/>
        <Container>
          <Switch>
            <Route exact path="/" render={() => this.props.user.loggedIn ?
            (
              <div>
                <HomePosts />
              </div>
            ):
            (
              <div>
                <About />
                <h2>Twiiterで簡単にログインして、自分の気になるタグをフォローして見ましょう！</h2>
                <FlexWrapper>
                  <Button blue onClick={this.openWindow}>Twitterで登録</Button>
                </FlexWrapper>
                <h2>タグを見てみよう！</h2>
                <TagsComponent tags={this.props.tags.trendTags} followTag={this.props.followTag} unFollowTag={this.props.unFollowTag} token={this.props.user.token} />
                <h2>トレンドの記事を見てみよう！</h2>
                <PostsComponent posts={this.props.posts.trendPosts } />
              </div>
            )} />
            <Route exact path='/tags/:id' render={(match) => {
              return( <TagPage id={match.match.params.id} />)
            }} />
            <Route exact path="/login/callback" render={(match) => (
              <LoginCallback match={match} login={this.props.login} />
            )} />
            <Route exact path="/mypage" render={() =>
             this.props.user.loggedIn ? <MyPage /> : <Redirect to='/' />
            } />
            <Route render={() => (<div>Miss 404</div>)} />
          </Switch>
        </Container>
      </div>
    );
  }
}

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const mapDispatchToProps = dispatch => ({
	login: (token) => loginWorker(dispatch, token),
  logout: () => {
    dispatch(userActions.logout({}))
    localStorage.clear()
  },
  checkLogin: () => {
    if (localStorage.getItem('auth_token') != null) {
      const token = {
        auth_token: localStorage.auth_token,
        client_id: localStorage.client_id,
        expiry: localStorage.expiry,
        uid: localStorage.uid,
      }
      loginWorker(dispatch,token)
    }
  },
  fetchTrendPosts: () => fetchTrendPostsWorker(dispatch, {}),
  fetchTrendTags: (token) => fetchTrendTagsWorker(dispatch,token),
  followTag: (params) => followTagWorker(dispatch, params),
  unFollowTag: (params) => unFollowTagWorker(dispatch, params),
})

const mapStateToProps = state => ({
  user: state.user,
  posts: state.posts,
  tags: state.tags
})

export default connect<AppComponentState, AppActions>(mapStateToProps, mapDispatchToProps)(App)
