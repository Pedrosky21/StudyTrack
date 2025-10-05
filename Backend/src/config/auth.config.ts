import { auth } from "express-openid-connect";
import { ConfigParams } from "express-openid-connect";
import dotenv from "dotenv";

dotenv.config();

export const config: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET as string,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
};
