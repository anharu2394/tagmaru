import axios from '../axios';
import { UserState } from '../states/userState'

export const login = (token): Promise<UserState> => axios.get('/auth/validate_token', { headers:{
	'access-token': token.auth_token,
  client:	token.client_id,
	expiry: token.expiry,
	uid: token.uid,
}})
	.then((result: any) => {
		const data = result.data
		if (data.success == true) {
      localStorage.setItem('auth_token', token.auth_token);
      localStorage.setItem('client_id', token.client_id);
      localStorage.setItem('expiry', token.expiry);
      localStorage.setItem('uid', token.uid);
			return {
				token: token,
				currentUser: data.data,
				loggedIn: true,
			}
		}
		else {
			return {
				token: {},
				currentUser: {},
				loggedIn: false,
			}
		}
	});
