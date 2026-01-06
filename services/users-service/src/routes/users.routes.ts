import { Router } from "express";
import {
  getMe,
  getUserById,
  updateUser,
} from "../controllers/users.controller";
import { requireGatewayContext } from "../middlewares/gateway-context";
import { prisma } from "../utils/prisma";

const router = Router();
router.get("/", async (req, res) => {
  const { email } = req.query as any;
  if (!email) {
    return res.status(400).json({ message: "Email param missing" });
  }

  const users = await prisma.user.findMany({ where: { email } });
  return res.json(users);
});

router.use(requireGatewayContext);

router.get("/me", getMe);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);

export default router;
