import { requiresAuth } from "express-openid-connect";

export const checkAuth = requiresAuth();
