import axiosClient from "./axiosClient";

const userApi = {
  
  signup(params) {
    const url = "/register";
    return axiosClient.post(url, params);
  },

  login(params) {
    const url = "/login";
    return axiosClient.post(url, params);
  },

  changePassword(params) {
    const url = "/auth/password/change";
    return axiosClient.put(url, params);
  }
};

export default userApi;
