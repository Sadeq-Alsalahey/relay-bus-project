import { FastifyInstance, FastifyReply } from "fastify";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import app from "../app";

export async function authRoutes(app: FastifyInstance) {

  // =======================
  // REGISTER
  // =======================
  app.post("/v1/auth/register", async (req, reply: FastifyReply) => {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return reply.status(400).send({
        message: "Email and password are required",
      });
    }

    const existingUser = await app.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return reply.status(409).send({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await app.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return reply.status(201).send({
      message: "User registered successfully",
      userId: user.id,
    });
  });

  // =======================
  // LOGIN
  // =======================
  app.post("/v1/auth/login", async (req, reply: FastifyReply) => {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return reply.status(400).send({
        message: "Email and password are required",
      });
    }

    const user = await app.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return reply.status(401).send({
        message: "Invalid credentials",
      });
    }

    const isValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isValid) {
      return reply.status(401).send({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    return reply.send({
      accessToken: token,
      tokenType: "Bearer",
    });
  });
}
