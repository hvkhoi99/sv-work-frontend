import axiosClient from "./axiosClient";

const studentApi = {
  // Profile
  createStudentProfile: (params) => {
    const url = "/student/profile/store";
    return axiosClient.post(url, params);
  },

  updateStudentProfile: (params) => {
    const url = "/student/profile/update";
    return axiosClient.put(url, params);
  },

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

  updateRecruiterProfile: (id, params) => {
    const url = `/student/recruiter/profile/${id}`;
    return axiosClient.put(url, params);
  },

  // Student -> Recruiter Recruitment
  getRecruimentDetail: (id) => {
    const url = `/student/recruiter/recruitment/${id}`;
    return axiosClient.get(url);
  },

  createNewRecruitment: (params) => {
    const url = "/student/recruiter/recruitment/store";
    return axiosClient.post(url, params);
  },

  updateRecruitment: (id, params) => {
    const url = `/student/recruiter/recruitment/${id}`;
    return axiosClient.put(url, params);
  },

  deleteRecruitment: (id) => {
    const url = `/student/recruiter/recruitment/${id}`;
    return axiosClient.delete(url);
  },

  getRecruitmentCandidates: (id, params) => {
    const url = `/student/recruiter/recruitment/${id}/candidates?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  // Student -> Recruiter -> Candidate
  getCandidateProfile: (id) => {
    const url = `/student/recruiter/candidate/${id}`;
    return axiosClient.get(url);
  },

  approveCandidate: (recruitmentId, candidateId) => {
    const url = `/student/recruiter/recruitment/${recruitmentId}/candidate/${candidateId}/approve`;
    return axiosClient.put(url);
  }
}

export default studentApi;