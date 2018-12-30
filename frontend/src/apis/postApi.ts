import axios from '../axios'
import { Post } from '../states/postsState'

export const getTrendPosts = (): Promise<Post[]> => axios.get('/api/posts/trend')
   .then((result: any) => result.data);
export const getTimelinePosts = (token): Promise<Post[]> => {
  return axios.get('/api/users/posts', { 
    headers:{
	    'access-token': token.auth_token,
      client:	token.client_id,
	    expiry: token.expiry,
	    uid: token.uid,
    }
  })
  .then((result) => result.data)
  .catch((error) => console.log(error));
}

