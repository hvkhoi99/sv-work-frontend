import axiosClient from "./axiosClient";

const userApi = {
  
  signup(params) {
    const url = "/register";
    return axiosClient.post(url, params);
  },

  login(params) {
    const url = "/login";
    return axiosClient.post(url, params);
  }
};

export default userApi;
