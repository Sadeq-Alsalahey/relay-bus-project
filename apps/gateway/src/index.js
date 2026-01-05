import express from "express";
import helloRoutes from "./routes/hello.js";
import usersRoutes from "./routes/users.js";

const app = express();
app.use(express.json());

app.use("/v1/hello", helloRoutes);
app.use("/v1/users", usersRoutes);

app.listen(3004, () => {
  console.log(" API Gateway running on http://localhost:3004");
});
