import axios from 'axios';
import queryString from 'query-string';

const token = localStorage.getItem('access_token');

// const axiosClient = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
//   headers: {
//     'content-type': 'application/json',
//   },
//   paramsSerializer: params => queryString.stringify(params),
// });

// axiosClient.interceptors.request.use(async (config) => {
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// axiosClient.interceptors.response.use((response) => {
//   if (response && response.data) {
//     return response.data;
//   }

//   return response;
// }, (error) => {
//   // Handle errors
//   throw error;
// });

// export default axiosClient;


const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	},
  paramsSerializer: params => queryString.stringify(params),
});

// Interceptor
// Add a request interceptorLis
axiosClient.interceptors.request.use(
	function (config) {
		// Do something before request is sent
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
		console.log('error', error.response);
		try {
			const { config, status, data } = error.response;
			console.log({ config, status, data })

			if (config.url === '/register' && status === 400) {
				// const errorMessage = data.message;

				window.location.href = '/error';
				//throw new Error(errorMessage);
			}
		} catch (ex) {
			console.log('error', ex);
			window.location.href = '/error';
		}
		return Promise.reject(error);
	}
);

export default axiosClient;
