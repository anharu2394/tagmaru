import * as Axios from 'axios'

const axios = Axios.default.create({
  baseURL: process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:4000'
  : 'https://api.tagmaru.me',
  headers: {
  },
  withCredentials: true,
});

export default axios;
