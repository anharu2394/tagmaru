import wrapAsyncWorker from '../wrapAsyncWorker';
import { userActions }  from '../actions/userAction';
import { UserState } from '../states/userState'
import { login } from '../apis/userApi'

export const loginWorker = wrapAsyncWorker(userActions.login, (token): Promise<UserState> => login(token));
