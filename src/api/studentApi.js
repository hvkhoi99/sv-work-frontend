import axiosClient from "./axiosClient";

const studentApi = {

  // Student -> Recruiter
  getAvailableJobs: (params) => {
    const url = `/student/recruiter/dashboard/available-recruitments?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  getClosedRecruitments: (params) => {
    const url = `/student/recruiter/dashboard/closed-recruitments?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  getDashboardIndex: () => {
    const url = "/student/recruiter/dashboard/index";
    return axiosClient.get(url);
  },

  // Student -> Recruiter Profile
  getRecruiterProfile: () => {
    const url = "/student/recruiter/profile/index";
    return axiosClient.get(url);
  },

  createRecruiterProfile: (params) => {
    const url = "/student/recruiter/profile/store";
    return axiosClient.post(url, params);
  },

  // Student -> Recruiter Recruitment
  getRecruimentDetail: (id) => {
    const url = `/student/recruiter/recruitment/${id}`;
    return axiosClient.get(url);
  }
}

export default studentApi;