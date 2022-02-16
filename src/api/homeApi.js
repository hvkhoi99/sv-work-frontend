import axiosClient from "./axiosClient";

const homeApi = {
  getTopRecruiters: () => {
    const url = "/getTopRecruiters";
    return axiosClient.get(url);
  },

  getTopRecruitments: () => {
    const url = "/getTopRecruitments";
    return axiosClient.get(url);
  },

  getTotalJobs: () => {
    const url = "/getTotalJobs";
    return axiosClient.get(url);
  }
}

export default homeApi;