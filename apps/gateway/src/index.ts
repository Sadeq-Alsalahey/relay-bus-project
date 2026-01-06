import Fastify from "fastify";
import { usersRoutes } from "./routes/users";
import { authRoutes } from "./routes/auth";

const app = Fastify({ logger: true });

app.register(authRoutes);
app.register(usersRoutes);

app.listen({ port: 4000 }, () => {
  console.log("Gateway running on http://localhost:4000");
});
