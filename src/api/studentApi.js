import axiosClient from "./axiosClient";

const studentApi = {
  // Certificates
  getStudentCertificates: (params) => {
    const url = `/student/certificate/index?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  // Languages
  getStudentLanguages: () => {
    const url = `/student/language/index`;
    return axiosClient.get(url);
  },

  // Skills
  getStudentSkills: () => {
    const url = `/student/skill/index`;
    return axiosClient.get(url);
  },

  // Educations
  getStudentEducations: (params) => {
    const url = `/student/education/index?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  // Experiences
  getStudentExperiences: (params) => {
    const url = `/student/experience/index?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  // Company
  followCompany: (id) => {
    const url = `/student/recruiter/${id}/follow`;
    return axiosClient.post(url);
  },

  getCompanyInfo: (id) => {
    const url = `/student/company/${id}`;
    return axiosClient.get(url);
  },

  // Job
  getJobDetail: (id) => {
    const url = `/student/job/${id}`;
    return axiosClient.get(url);
  },

  openJob: () => {
    const url = "/student/profile/job";
    return axiosClient.post(url);
  },

  saveJob: (id) => {
    const url = `/student/recruitment/${id}/save`;
    return axiosClient.put(url);
  },

  applyJob: (id) => {
    const url = `/student/recruitment/${id}/apply`;
    return axiosClient.put(url);
  },

  acceptInvitedJob: (id) => {
    const url = `/student/recruitment/${id}/accept-invited`;
    return axiosClient.put(url);
  },

  rejectInvitedJob: (id) => {
    const url = `/student/recruitment/${id}/reject-invited`;
    return axiosClient.put(url);
  },

  // Dashboard
  getAppliedJobs: (params) => {
    const url = `/student/dashboard/applied-jobs?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  getCompaniesFollowed: (params) => {
    const url = `/student/dashboard/company-followed?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  getSavedJobs: (params) => {
    const url = `/student/dashboard/saved-jobs?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  getInvitedJobs: (params) => {
    const url = `/student/dashboard/invited-jobs?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  // Profile
  createStudentProfile: (params) => {
    const url = "/student/profile/store";
    return axiosClient.post(url, params);
  },

  updateStudentProfile: (id, params) => {
    const url = `/student/profile/update`;
    return axiosClient.put(url, params);
  },

  updateStudentOverview: (id, params) => {
    const url = `/student/profile/over-view/${id}`;
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