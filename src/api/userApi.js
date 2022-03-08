import axiosClient from "./axiosClient";

const userApi = {
  
  signup: (params) => {
    const url = "/register";
    return axiosClient.post(url, params);
  },

  login: (params) => {
    const url = "/login";
    return axiosClient.post(url, params);
  },

  changePassword: (params) => {
    const url = "/auth/password/change";
    return axiosClient.put(url, params);
  },

  resendVerificationEmail: (params) => {
    const url = "/email/resend";
    return axiosClient.post(url, params);
  },

  loginWithGoogle: (params) => {
    const url = "/login-with-google";
    return axiosClient.post(url, params);
  },

  updateDeviceToken: (params) => {
    const url = "/update-device-token";
    return axiosClient.post(url, params);
  },

  sendNotification: (params) => {
    const url = "/send-notifications";
    return axiosClient.post(url, params);
  },

  forgotPassword: (params) => {
    const url = "/reset-password";
    return axiosClient.post(url, params);
  },

  resetPassword: (params, token) => {
    const url = `/reset-password/${token}`;
    return axiosClient.put(url, params);
  },

  // event
  getListEvents: (params) => {
    const url = `/event/list-event?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  } 
};

export default userApi;
