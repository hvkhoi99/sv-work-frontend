import axiosClient from "./axiosClient";

const studentApi = {
  // Certificates
  getStudentCertificates: (params) => {
    const url = `/student/certificate/index?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  createStudentCertificate: (params) => {
    const url = "/student/certificate/store";
    return axiosClient.post(url, params);
  },

  updateStudentCertificate: (id, params) => {
    const url = `/student/certificate/${id}`;
    return axiosClient.put(url, params);
  },

  deleteStudentCertificate: (id) => {
    const url = `/student/certificate/${id}`;
    return axiosClient.delete(url);
  },

  // Languages
  getStudentLanguages: () => {
    const url = `/student/language/index`;
    return axiosClient.get(url);
  },

  createStudentLanguages: (params) => {
    const url = "/student/language/store";
    return axiosClient.post(url, params);
  },

  updateStudentLanguages: (id, params) => {
    const url = `/student/language/${id}`;
    return axiosClient.put(url, params);
  },

  deleteStudentLanguages: (id) => {
    const url = `/student/language/${id}`;
    return axiosClient.delete(url);
  },

  // Skills
  getStudentSkills: () => {
    const url = `/student/skill/index`;
    return axiosClient.get(url);
  },

  createStudentSkills: (params) => {
    const url = "/student/skill/store";
    return axiosClient.post(url, params);
  },

  updateStudentSkills: (id, params) => {
    const url = `/student/skill/${id}`;
    return axiosClient.put(url, params);
  },

  deleteStudentSkills: (id) => {
    const url = `/student/skill/${id}`;
    return axiosClient.delete(url);
  },

  // Educations
  getStudentEducations: (params) => {
    const url = `/student/education/index?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  createAnEducation: (params) => {
    const url = "/student/education/store";
    return axiosClient.post(url, params);
  },

  updateAnEducation: (id, params) => {
    const url = `/student/education/${id}`;
    return axiosClient.put(url, params);
  },

  deleteAnEducation: (id) => {
    const url = `/student/education/${id}`;
    return axiosClient.delete(url);
  },

  // Experiences
  getStudentExperiences: (params) => {
    const url = `/student/experience/index?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  createAnExperience: (params) => {
    const url = "/student/experience/store";
    return axiosClient.post(url, params);
  },

  updateAnExperience: (id, params) => {
    const url = `/student/experience/${id}`;
    return axiosClient.put(url, params);
  },

  deleteAnExperience: (id) => {
    const url = `/student/experience/${id}`;
    return axiosClient.delete(url);
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

  changeStudentAvatar: (params) => {
    const url = "/student/profile/avatar/change";
    return axiosClient.post(url, params);
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

  changeRecruiterAvatar: (params) => {
    const url = "/student/recruiter/profile/avatar/change";
    return axiosClient.post(url, params);
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

  getJobsInvite: () => {
    const url = "/student/recruiter/candidate/jobsInvite/list";
    return axiosClient.get(url);
  },

  approveCandidate: (recruitmentId, candidateId) => {
    const url = `/student/recruiter/recruitment/${recruitmentId}/candidate/${candidateId}/approve`;
    return axiosClient.put(url);
  }
}

export default studentApi;