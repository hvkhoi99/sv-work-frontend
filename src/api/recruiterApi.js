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

  checkVerified: () => {
    const url = "/recruiter/profile/checkVerified";
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

  changeRecruiterAvatar: (params) => {
    const url = "/recruiter/profile/avatar/change";
    return axiosClient.post(url, params);
  },

  updateRecruiterDescription: (id, params) => {
    const url = `/recruiter/profile/${id}/updateDescription`;
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
  },

  getRecruitmentCandidates: (id, params) => {
    const url = `/recruiter/recruitment/${id}/candidates?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  // Candidate
  getCandidateProfile: (id) => {
    const url = `/recruiter/candidate/${id}`;
    return axiosClient.get(url);
  },

  getJobsInvite: () => {
    const url = "/recruiter/candidate/jobsInvite/list";
    return axiosClient.get(url);
  },

  approveCandidate: (recruitmentId, candidateId) => {
    const url = `/recruiter/recruitment/${recruitmentId}/candidate/${candidateId}/approve`;
    return axiosClient.put(url);
  },

  inviteCandidate: (candidateId, recruitmentId) => {
    const url = `/recruiter/candidate/${candidateId}/recruitment/${recruitmentId}`;
    return axiosClient.post(url);
  },

  findCandidates: (params) => {
    const url = "/recruiter/find/candidate";
    return axiosClient.get(url, {params});
  },

  getCandidatesList: (params) => {
    const url = `/recruiter/candidates/list?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  }
}

export default recruiterApi;