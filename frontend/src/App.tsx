import * as React from 'react';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import TagContainer from './containers/tagContainer'
import PostContainer from './containers/postContainer'
import Header from './components/Header'
import About from './components/About'
import Container from './shared/Container'
import {userActions} from './actions/userAction'
import { AppState } from './store'
import { UserState } from './states/userState'
import { Route, Switch } from 'react-router'
import LoginCallback from './components/LoginCallback'
import MyPage from './components/MyPage'
import { loginWorker } from './workers/userWorker'
import HomePosts from './components/HomePosts'
import TagPage from './containers/tagpageContainer'
import { Redirect } from 'react-router-dom';
import Button from './shared/Button'
import styled from 'styled-components'
import ToggleButton from 'react-toggle-button'

interface AppProps {
  login?:  (any) => Promise<any>;
  logout?:  () => void;
  checkLogin?:  () => Promise<any>;
  user: UserState;
}

class App extends React.Component<AppProps, {}> {
 	root = Function('return this')()
  openWindow = e => {
   	this.root.open(process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:4000/auth/twitter?auth_origin_url=http://127.0.0.1:4001/login/callback' :'https://api.tagmaru.me/auth/twitter?auth_origin_url=https://tagmaru.me/login/callback'); 
  }
  componentDidMount() {
    if (this.props.checkLogin) {
      this.props.checkLogin()
    }
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
                <TagContainer trend />
                <h2>トレンドの記事を見てみよう！</h2>
                <PostContainer trend /> 
              </div>
            )} />
            <Route exact path='/tags/:id' render={(match) => {
              return( <TagPage id={match.match.params.id} />)
            }} />
            <Route exact path="/login/callback" render={(match) => (
              <LoginCallback match={match} login={this.props.login} />
            )} />
            <Route exact path="/mypage" render={() => 
             this.props.user.loggedIn ? <MyPage  currentUser={this.props.user.currentUser} logout={this.props.logout} /> : <Redirect to='/' />
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
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
})

const mapStateToProps = (state: AppState) => ({
   user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
