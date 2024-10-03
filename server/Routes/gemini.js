import { Router } from "express";
import { generateContent } from "../Controllers/geminiController.js";

const router = Router();

router.post("/generateContent", generateContent );

export default router;