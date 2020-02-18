import axios from "axios";
// const URL_STRING = "http://ec2-54-90-79-234.compute-1.amazonaws.com:3333";
const URL_STRING = "https://serene-everglades-64554.herokuapp.com";

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
