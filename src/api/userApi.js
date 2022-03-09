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
    const url = `/upcoming-events?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  getDashboardEventData: () => {
    const url = "/events/dashboard-data";
    return axiosClient.get(url);
  },

  getAvailableEvents: (params) => {
    const url = `/events/available?page=${params.page}&_limit=${params._limit}`
    return axiosClient.get(url);
  },

  getJoinedEvents: (params) => {
    const url = `/events/joined?page=${params.page}&_limit=${params._limit}`
    return axiosClient.get(url);
  },

  getClosedEvents: (params) => {
    const url = `/events/closed?page=${params.page}&_limit=${params._limit}`
    return axiosClient.get(url);
  },

  getDetailOfEvent: (id) => {
    const url = `/event/${id}`;
    return axiosClient.get(url);
  }
};

export default userApi;
