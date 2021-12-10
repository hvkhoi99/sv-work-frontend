import axiosClient from "./axiosClient";

const homeApi = {
    getTopRecruiters: () => {
        const url = "/getTopRecruiters";
        return axiosClient.get(url);
    }
}

export default homeApi;