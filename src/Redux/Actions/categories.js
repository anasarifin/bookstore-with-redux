import axios from "axios";
const URL_STRING = "3.85.4.188:3333";

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
