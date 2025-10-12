import express, { Application, Request, Response } from 'express';
import cors from "cors";
import { auth } from 'express-openid-connect';
import { config } from "./config/auth.config"
import router from "./routes/router";
import { autoRegisterUser } from './shared/middlewares/register.middleware';
// import { ErrorHandler } from "./shared/middlewares/error"

const app: Application = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware de Auth0
app.use(auth(config));
// Middleware para registrar en mi db
app.use(autoRegisterUser);
app.get("/login", (req, res) => {
  res.oidc.login({
    authorizationParams: {
      redirect_uri: "http://localhost:3001/callback",
    },
    returnTo: "http://localhost:3000", // redirige al front tras login
  });
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

app.use("/api", router);
// app.use(ErrorHandler);

app.get("/api/profile", (req: Request, res: Response) => {
  // @ts-ignore
  const oidcReq = req as any;

  if (oidcReq.oidc && oidcReq.oidc.user) {
    res.json({ loggedIn: true, user: oidcReq.oidc.user });
  } else {
    res.json({ loggedIn: false });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;