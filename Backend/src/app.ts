import express, { Application } from 'express';
import cors from "cors";
import { auth } from 'express-openid-connect';
import { config } from "./config/auth.config"
import router from "./routes/router";
// import { ErrorHandler } from "./shared/middlewares/error"

const app: Application = express();

// CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Middleware de Auth0
app.use(auth(config));


app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

app.use("/api", router);
// app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;