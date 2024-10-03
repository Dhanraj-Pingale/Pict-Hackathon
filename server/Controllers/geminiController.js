import { GoogleGenerativeAI } from "@google/generative-ai";
import env from "dotenv";

env.config();

// export const correctCodeGemini = async (req, res) => {
//   const prompt = req.body.prompt;
//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   console.log("prompt : ", prompt);

//   // const promp = "tell me a joke";

//   const result = await model.generateContent(prompt);

//   // console.log(result);
//   const output = result.response.text()
//   console.log("gem output: ", output);

//   res.json(output);
//   return; 
// };

export const generateContent = async (req, res) => {
  const prompt = req.body.prompt;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  console.log("prompt : ", prompt);

  // const promp = "tell me a joke";

  const result = await model.generateContent(prompt);

  // console.log("result: ", result);
  const output = result.response.text()
  console.log("gem generateContent: ", output);

  res.json(output);
  return; 
};
