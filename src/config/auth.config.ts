import { ConfigParams } from "express-openid-connect";
import dotenv from "dotenv";

dotenv.config();

export const config: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.BASE_URL, // http://localhost:3001
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_SECRET,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  authorizationParams: {
    response_type: "code",
    audience: process.env.AUTH0_AUDIENCE,
    scope: "openid profile email",
  },
  session: {
    cookie: { secure: false }, // desarrollo local
    rolling: true,
    absoluteDuration: 60 * 60, // segundos (1 hora)
  },
  routes: {
    login: false,
    callback: "/callback",
    postLogoutRedirect: "http://localhost:3000",
  },
};
