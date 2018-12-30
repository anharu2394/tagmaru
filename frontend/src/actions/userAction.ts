import actionCreatorFactory from 'typescript-fsa';
import { Token, UserState } from '../states/userState'

const actionCreator = actionCreatorFactory();

export const userActions = {
  login: actionCreator.async<Token,UserState,{}>('LOGIN'),
  logout: actionCreator<{}>('LOGOUT'),
}
