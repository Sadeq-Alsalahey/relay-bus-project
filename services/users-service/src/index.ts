import Fastify from "fastify";
import { prisma } from "./utils/prisma";
import { authRoutes } from "./routes/auth";

const app = Fastify();

// ✅ ربط Prisma مع Fastify
app.decorate("prisma", prisma);

// تسجيل Routes
app.register(authRoutes);

app.listen({ port: 4001 }, () => {
  console.log("Users-service on port 4001");
});
