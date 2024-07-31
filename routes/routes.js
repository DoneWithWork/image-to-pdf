import express from "express";

import { Delete, Home, Upload } from "../controllers/controller.js";
const router = express.Router();

router.get("/", Home);
router.post("/delete", Delete);
router.post("/upload", Upload);
export default router;
