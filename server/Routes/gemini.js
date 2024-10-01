import { Router } from "express";
import { correctCodeGemini } from "../Controllers/geminiController.js";

const router = Router();

router.post("/correctCode", correctCodeGemini );

export default router;