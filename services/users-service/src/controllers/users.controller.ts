// src/controllers/users.controller.ts
// src/controllers/users.controller.ts
import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export async function getMe(req: Request, res: Response) {
  const userId = (req as any).user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}
// Additional controller to get user by ID
export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}

// update user controller 
export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { email, role, isActive } = req.body;

  if (
    email === undefined &&
    role === undefined &&
    isActive === undefined
  ) {
    return res.status(400).json({ message: "No data to update" });
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(email && { email }),
        ...(role && { role }),
        ...(isActive !== undefined && { isActive }),
      },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    res.json(user);
  } catch {
    res.status(404).json({ message: "User not found" });
  }
}
