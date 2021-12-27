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

  // Recruitment
  getRecruimentDetail: (id) => {
    const url = `/recruiter/recruitment/${id}`;
    return axiosClient.get(url);
  }
}

export default recruiterApi;