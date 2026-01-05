import { Router } from "express";
import { proxyRequest } from "../proxy.js";

const router = Router();

router.get("/", (req, res) => {
  proxyRequest(req, res, "http://127.0.0.1:3003/users"); // users-service
});

export default router;
