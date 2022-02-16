import axiosClient from "./axiosClient";

const adminApi = {

  // Dashboard
  getDashboard: () => {
    const url = '/admin/dashboard';
    return axiosClient.get(url);
  },

  getChartData: () => {
    const url = "/admin/chartFigure";
    return axiosClient.get(url);
  },

  // Verification
  getRecruiters: (params) => {
    const url = '/admin/recruiters';
    return axiosClient.get(url, { params });
  },

  verifyCompany: (id, params) => {
    const url = `/admin/recruiter/${id}`;
    return axiosClient.post(url, { verify: params });
  }
}

export default adminApi;