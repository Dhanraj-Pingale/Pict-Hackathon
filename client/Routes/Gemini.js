import axios from "axios";
const API_URL = "http://localhost:3000/gemini";

export const getResponseGemini = async ({prompt}) => {

    const result = await axios.post(`${API_URL}/correctCode`, {prompt});

    console.log("get gem res: ", result );
    
    return result.data;
}
