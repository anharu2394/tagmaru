import * as Axios from 'axios'

const axios = Axios.default.create({
  baseURL: 'http://127.0.0.1:4000',
  headers: {
  },
  withCredentials: true,
});

export default axios;
