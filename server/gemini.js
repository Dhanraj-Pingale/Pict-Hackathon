import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const generationConfig = { temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 4096 };

async function generateContent(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

        const result = await model.generateContent(prompt);

        const response = await result.response;
        const generatedText = await response.text();
        console.log('API Key:', process.env.GOOGLE_API_KEY);

        return generatedText;

    } catch (error) {
        console.error('Error generating content:', error); 
        throw new Error('Error generating content: ' + error.message);
    }
}


export default generateContent;
