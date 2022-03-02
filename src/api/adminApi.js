import axiosClient from "./axiosClient";

const adminApi = {
  // Company
  getCompanyProfile: (id) => {
    const url = `/admin/recruiter/${id}`;
    return axiosClient.get(url);
  },

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
  },

  // Notifications
  getAdminCountNotifications: () => {
    const url = "/admin/notifications/count";
    return axiosClient.get(url);
  },

  getListNotificationsByAdmin: (params) => {
    const url = `/admin/notifications/list?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  getListUnreadNotificationsByAdmin: (params) => {
    const url = `/admin/notifications/list-unread?page=${params.page}&_limit=${params._limit}`;
    return axiosClient.get(url);
  },

  markAsReadByAdmin: (id) => {
    const url = `/admin/notification/${id}/mark-as-read`;
    return axiosClient.put(url);
  },

  markAllAsReadByAdmin: () => {
    const url = `/admin/notification/mark-all-as-read`;
    return axiosClient.put(url);
  },
}

export default adminApi;