import axios from '../axios'
import { Tag } from '../states/tagsState'

export const getTrendTags = (): Promise<Tag[]> => axios.get('/api/tags/trend')
   .then((result: any) => result.data);

export const getFollowTags = (token): Promise<Tag[]> => axios.get('/api/users/tags', { 
    headers:{
	    'access-token': token.auth_token,
      client:	token.client_id,
	    expiry: token.expiry,
	    uid: token.uid,
    }
  })
  .then((result: any) => result.data)
  .catch((error) => console.log(error));

export const getLoggedTrendTags = (token): Promise<Tag[]> => axios.get('/api/users/tags/trend', { 
    headers:{
	    'access-token': token.auth_token,
      client:	token.client_id,
	    expiry: token.expiry,
	    uid: token.uid,
    }
  })
  .then((result: any) => result.data)
  .catch((error) => console.log(error));

export const followTag = (token): Promise<Tag[]> => axios.post('/api/follow_tags', { 
    headers:{
	    'access-token': token.auth_token,
      client:	token.client_id,
	    expiry: token.expiry,
	    uid: token.uid,
    },
    tag_id: token.targetId,
  })
  .then((result: any) => result.data)
  .catch((error) => console.log(error));

export const unFollowTag = (token): Promise<Tag[]> => axios.delete('/api/follow_tags/' + token.targetId, { 
    headers:{
	    'access-token': token.auth_token,
      client:	token.client_id,
	    expiry: token.expiry,
	    uid: token.uid,
    },
  })
  .then((result: any) => result.data)
  .catch((error) => console.log(error));

export const getLoggedSearchTags = (token): Promise<Tag[]> => axios.get('/api/users/tags/search?keyword=' + token.keyword, { 
    headers:{
	    'access-token': token.auth_token,
      client:	token.client_id,
	    expiry: token.expiry,
	    uid: token.uid,
    }
  })
  .then((result: any) => result.data)
  .catch((error) => console.log(error));
