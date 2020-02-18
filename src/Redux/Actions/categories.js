import axios from "axios";
const URL_STRING = "http://ec2-35-174-13-30.compute-1.amazonaws.com:3333";

export const categories = () => {
    return {
        type: "GET_CATEGORIES",
        payload: axios.get("http://ec2-35-174-13-30.compute-1.amazonaws.com:3333/api/categories", {
            headers: {
                Authorization: localStorage.getItem("keyToken")
            }
        })
    };
};
