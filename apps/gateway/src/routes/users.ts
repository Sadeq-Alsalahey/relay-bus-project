import { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
  app.get("/v1/users/me", async (_req, reply) => {
    // mock context (لاحقًا JWT)
    const userId = "test-id";
    const role = "user";

    const res = await fetch("http://localhost:4001/users/me", {
      headers: {
        "x-user-id": userId,
        "x-user-role": role,
      },
    });

    const data = await res.json();
    reply.status(res.status).send(data);
  });
}
