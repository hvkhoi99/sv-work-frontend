import axiosClient from "./axiosClient";

const recruiterApi = {
    getAvailableJobs: (params) => {
        const url = `/student/recruiter/dashboard/available-recruitments?page=${params.page}&_limit=${params._limit}`;
        return axiosClient.get(url, params);
    }
}

export default recruiterApi;