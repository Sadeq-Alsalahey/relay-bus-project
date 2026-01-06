
import "dotenv/config";
import { FastifyInstance } from "fastify";

export async function authRoutes(app: FastifyInstance) {
  // REGISTER
  app.post("/v1/auth/register", async (req, reply) => {
    console.log("USERS_SERVICE_URL =", process.env.USERS_SERVICE_URL);

    try {
      const response = await fetch(
        `${process.env.USERS_SERVICE_URL}/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      const data = await response.json();
      return reply.status(response.status).send(data);
    } catch (error) {
      return reply.status(500).send({
        message: "Users service unavailable",
      });
    }
  });

  // LOGIN (للتأكد)
  app.post("/v1/auth/login", async (req, reply) => {
    try {
      const response = await fetch(
        `${process.env.USERS_SERVICE_URL}/v1/auth/login`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(req.body),
        }
      );

      const data = await response.json();
      return reply.status(response.status).send(data);
    } catch {
      return reply.status(500).send({
        message: "Users service unavailable",
        
      });
    }
  });
}
