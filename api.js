import app from "./app.js";
import authRouter from "./routes/auth.routes.js";
import apiUserRouter from "./routes/api-user.routes.js";

app.use("/api/auth", authRouter);
app.use("/api/user", apiUserRouter);

app.get("/", (req, res) => {
  res.json({
    message: "API for Widya Robotics knowledge test",
  });
});

export default app;
