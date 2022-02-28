import axiosClient from "./axiosClient";

const studentApi = {

  // Notifications
  getCountNotifications: () => {
    const url = "/student/notifications/count";
    return axiosClient.get(url);
  },

  getListNotificationsByStudent: (params) => {
    const url = `/student/notifications/list?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  getListUnreadNotificationsByStudent: (params) => {
    const url = `/student/notifications/list-unread?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  markAsReadByStudent: (id) => {
    const url = `/student/notification/${id}/mark-as-read`;
    return axiosClient.put(url);
  },

  markAllAsReadByStudent: () => {
    const url = `/student/notification/mark-all-as-read`;
    return axiosClient.put(url);
  },

  // Search Jobs, Company
  findJobs: (params) => {
    const url = "/find/jobs";
    return axiosClient.get(url, {params});
  },

  findEmployers: (params) => {
    const url = "/find/employers";
    return axiosClient.get(url, {params});
  },

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
    const url = `/company/${id}`;
    return axiosClient.get(url);
  },

  // Job
  getJobsByRecruiterId: (params, id) => {
    const url = `/job/getJobsByRecruiterId/${id}`;
    return axiosClient.get(url, {params});
  },

  getJobDetail: (id) => {
    const url = `/job/${id}`;
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

  checkVerified: () => {
    const url = "/student/recruiter/profile/checkVerified";
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

  updateRecruiterDescription: (id, params) => {
    const url = `/student/recruiter/profile/${id}/updateDescription`;
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

  getJobsInvite: () => {
    const url = "/student/recruiter/candidate/jobsInvite/list";
    return axiosClient.get(url);
  },

  approveCandidate: (recruitmentId, candidateId) => {
    const url = `/student/recruiter/recruitment/${recruitmentId}/candidate/${candidateId}/approve`;
    return axiosClient.put(url);
  },

  rejectCandidate: (recruitmentId, candidateId) => {
    const url = `/student/recruiter/recruitment/${recruitmentId}/candidate/${candidateId}/reject`;
    return axiosClient.put(url);
  },

  inviteCandidate: (candidateId, recruitmentId) => {
    const url = `/student/recruiter/candidate/${candidateId}/recruitment/${recruitmentId}`;
    return axiosClient.post(url);
  },

  findCandidates: (params) => {
    const url = "/student/recruiter/find/candidate";
    return axiosClient.get(url, {params});
  },

  getCandidatesList: (params) => {
    const url = `/student/recruiter/candidates/list?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  // Student -> Recruiter -> Notifications
  getRecruiterCountNotifications: () => {
    const url = "/student/recruiter/notifications/count";
    return axiosClient.get(url);
  },
}

export default studentApi;