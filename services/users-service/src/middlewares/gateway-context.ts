// src/middlewares/gateway-context.ts
// src/middlewares/gateway-context.ts
import type { Request, Response, NextFunction } from "express";

export function requireGatewayContext(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.header("x-user-id");
  const role = req.header("x-user-role");

  if (!userId || !role) {
    return res.status(401).json({
      success: false,
      message: "Missing gateway context",
    });
  }

  req.user = {
    id: Number(userId),
    role: role as 'ADMIN' | 'USER',
  };

  next();
}
