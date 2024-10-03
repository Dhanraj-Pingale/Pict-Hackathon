import axios from "axios";
const API_URL = "http://localhost:3000/db";


export const createCodelab = async (data) => {
    // create a new codelab... 
    try {
        const res = await axios.post(`${API_URL}/create`, {data});
    
        console.log("res : ", res);

        return res.data;
        
    } catch (error) {
        console.log("error in create codelab: ", error);
        return {status: false, message: "Error in creating codelab"};
    }
}