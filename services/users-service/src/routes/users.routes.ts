import { Router } from "express";
import {
  getMe,
  getUserById,
  updateUser,
} from "../controllers/users.controller";
import { requireGatewayContext } from "../middlewares/gateway-context";
import { prisma } from "../utils/prisma";

const router = Router();

/**
 * 🔐 حماية كل المسارات
 */
router.use(requireGatewayContext);

/**
 * ADMIN ONLY
 * GET /users?email=
 */
router.get("/", async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { email } = req.query as { email?: string };

  const users = await prisma.user.findMany({
    where: email ? { email } : undefined,
    select: {
      id: true,
      email: true,
      // name: true,
      role: true,
    },
  });

  return res.json(users);
});

/**
 * GET /users/me
 */
router.get("/me", getMe);

/**
 * GET /users/:id
 */
router.get("/:id", getUserById);

/**
 * PATCH /users/:id
 */
router.patch("/:id", updateUser);

export default router;
