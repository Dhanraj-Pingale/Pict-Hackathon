import axios from "axios";
const API_URL = "http://localhost:3000/codelabs";


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

export const saveStageFn = async (data) => {
    // create a new codelab... 
    try {
        const res = await axios.post(`${API_URL}/saveStage`, {data});
    
        console.log("res : ", res);

        return res.data;
        
    } catch (error) {
        console.log("error in create codelab: ", error);
        return {status: false, message: "Error in Saving Stage"};
    }
}

export const fetchCodelabs = async () => {
    // create a new codelab... 
    try {
        const res = await axios.get(`${API_URL}/`);
    
        console.log("res : ", res);

        return res.data;
        
    } catch (error) {
        console.log("error in fetchCodelabs: ", error);
        return {status: false, message: "Error in fetchCodelabs "};
    }
}