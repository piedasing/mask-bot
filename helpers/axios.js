const axios = require("axios");

const log = require("./log");

axios.interceptors.response.use(
    (response) => {
        return {
            success: {
                ...response
            },
            error: null
        };
    },
    (error) => {
        log(error);
        return {
            success: null,
            error: {
                ...error
            }
        };
    }
);

function httpService(params) {
    const { method, header, path, data, formData, auth } = params;

    let headers = {
        "Cache-Control": "no-cache",
        "Authorization": auth ? `Bearer ${auth}` : ""
    };

    if (!formData) { // 如果是 formData，則會預設成 Content-Type: application/x-www-form-urlencoded
        headers = {
            // "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8"
        }
    }

    headers = {
        ...headers,
        ...header
    };

    return axios({
        method: method || "GET",
        url: path.indexOf("http") !== -1 ? path : `${process.env.BASEURL}${path}`,
        headers,
        timeout: 8000,
        withCredentials: true,
        data: formData || JSON.stringify(data)
    });
};

module.exports = httpService;
