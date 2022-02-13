import axios from 'axios';
import queryString from 'query-string';


const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}`,
  },
  paramsSerializer: params => queryString.stringify(params),
});

// Interceptor
// Add a request interceptorLis
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    window.location.href = '/error';
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // console.log('data is', response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('error axios: ', error.response);
    try {
      const { config, status, data } = error.response;
      console.log({ config, status, data })

      if (config.url === '/auth/account/register' && status === 400) {
        // const errorMessage = data.message;

        window.location.href = '/error';
        //throw new Error(errorMessage);
      }
    } catch (ex) {
      console.log('error', ex);
      window.location.href = '/error';
    }
    return Promise.reject(error);
    // console.log('error axios: ', error.response);

    // switch (error.response.status) {
    //   case 401:
    //     localStorage.removeItem('access_token');
    //     localStorage.removeItem('user');
    //     localStorage.removeItem('role_id');
    //     break;
    //   case 404:
    //     window.location.href = '/error';
    //     break;
    //   default:
    //     break;
    // }
    // return Promise.reject(error);
  }
);

export default axiosClient;
