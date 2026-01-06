import express from "express";
import usersRoutes from "./routes/users.routes";

const app = express();

app.use(express.json());

// route 
app.get("/test", (_req, res) => {
  res.send("OK");
});

// users routes
app.use("/users", usersRoutes);

export default app;
