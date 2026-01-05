import { Router } from "express";
import { proxyRequest } from "../proxy.js";

const router = Router();

router.get("/", (req, res) => {
  proxyRequest(req, res, "http://localhost:3002/hello"); // hello-service
});

export default router;
