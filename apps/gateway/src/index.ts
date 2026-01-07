import Fastify from "fastify";
import { usersRoutes } from "./routes/users.js";
import { authRoutes } from "./routes/auth.js";
import jwt from './plugins/jwt.js'
const app = Fastify({ logger: true });

app.register(authRoutes);
app.register(usersRoutes);
app.register(jwt)
app.listen({ port: 4000 }, () => {
  console.log("Gateway running on http://localhost:4000");
});
