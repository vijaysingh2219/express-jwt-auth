// authenticated.route.ts
import express from "express";
import verifyJWT from "../../middlewares/verifyJWT";
import { CustomRequest } from "../../typings";

const router = express.Router();

// Authenticated route
router.get("/", verifyJWT, (req: CustomRequest, res) => {
  res.json({
    message: "Hello, the route is authenticated!",
    username: req.username,
  });
});

export default router;
