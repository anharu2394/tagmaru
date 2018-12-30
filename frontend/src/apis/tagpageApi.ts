import axios from '../axios'
import { Tag } from '../states/tagsState'
import { Post } from '../states/postsState'

export const getTag = (id): Promise<Tag> => axios.get('/api/tags/' + id)
   .then((result: any) => result.data);

export const getTrendPosts = (id): Promise<Post[]> => axios.get('/api/posts/' + id + '/trend')
   .then((result: any) => result.data);
export const getNewPosts = (id): Promise<Post[]> => axios.get('/api/posts/' + id + '/latest')
   .then((result: any) => result.data);

