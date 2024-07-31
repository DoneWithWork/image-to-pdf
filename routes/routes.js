import express from "express";

import { Convert, Delete, Home, Upload } from "../controllers/controller.js";
const router = express.Router();

router.get("/", Home);
router.post("/delete", Delete);
router.post("/upload", Upload);
router.post("/convert", Convert);
export default router;
