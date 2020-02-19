import axios from "axios";
const URL_STRING = 'http://3.85.4.188:3333';
export const categories = () => {
    return {
        type: "GET_CATEGORIES",
        payload: axios.get(`${URL_STRING}/api/categories`, {
            headers: {
                Authorization: localStorage.getItem("keyToken")
            }
        })
    };
};
