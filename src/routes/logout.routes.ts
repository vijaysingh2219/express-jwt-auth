import express from "express";
const router = express.Router();
import { handleLogout } from "../controllers/logout.controller";

router.post("/", handleLogout);

export default router;
