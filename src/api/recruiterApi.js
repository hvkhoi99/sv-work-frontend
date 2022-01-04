import axiosClient from "./axiosClient";

const recruiterApi = {

  // Dashboard
  getAvailableJobs: (params) => {
    const url = `/recruiter/dashboard/available-recruitments?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url, params);
  },

  getClosedRecruitments: (params) => {
    const url = `/recruiter/dashboard/closed-recruitments?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url, params);
  },

  getDashboardIndex: () => {
    const url = "/recruiter/dashboard/index";
    return axiosClient.get(url);
  },

  // Profile
  getRecruiterProfile: () => {
    const url = "/recruiter/profile/index";
    return axiosClient.get(url);
  },

  createRecruiterProfile: (params) => {
    const url = "/recruiter/profile/store";
    return axiosClient.post(url, params);
  },

  updateRecruiterProfile: (id, params) => {
    const url = `/recruiter/profile/${id}`;
    return axiosClient.put(url, params);
  },

  // Recruitment
  getRecruimentDetail: (id) => {
    const url = `/recruiter/recruitment/${id}`;
    return axiosClient.get(url);
  },

  createNewRecruitment: (params) => {
    const url = "/recruiter/recruitment/store";
    return axiosClient.post(url, params);
  },

  updateRecruitment: (id, params) => {
    const url = `/recruiter/recruitment/${id}`;
    return axiosClient.put(url, params);
  },

  deleteRecruitment: (id) => {
    const url = `/recruiter/recruitment/${id}`;
    return axiosClient.delete(url);
  }
}

export default recruiterApi;