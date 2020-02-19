import axios from "axios";
const URL_STRING = process.env.REACT_APP_CLOUD;

export const categories = () => {
    return {
        type: "GET_CATEGORIES",
        payload: axios.get(`http://${URL_STRING}/api/categories`, {
            headers: {
                Authorization: localStorage.getItem("keyToken")
            }
        })
    };
};
