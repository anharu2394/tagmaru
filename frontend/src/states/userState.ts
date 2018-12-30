import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { userActions } from '../actions/userAction'

export interface Token {
  auth_token?: string;
  client_id?: string;
  uid?: string;
  expiry?: number;
}
export interface User {
  id: number;
  name: string;
  nickname: string;
  image: string;
}

export interface UserState {
  token: Token;
  currentUser: User;
  loggedIn: boolean;
}

const initialState: UserState = {token:{}, currentUser: {id:0,name:"",nickname:"",image:""}, loggedIn: false};

export const userReducer = reducerWithInitialState(initialState)
  .case(userActions.login.done, (state, payload) => {
    return Object.assign({}, state, payload.result);
  })
  .case(userActions.logout, (state, payload) => {
    return Object.assign({}, state, {token:{}, currentUser: {id:0,name:"",nickname:"",image:""}, loggedIn: false});
  });
