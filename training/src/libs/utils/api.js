import axios from 'axios';
import { BASE_URL } from '../../config/constants';

const callApi = async (route, method, body) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  };
  const response = await axios({
    method,
    url: BASE_URL + route,
    data: body,
    headers,
  });
  return response;
};

export default callApi;
