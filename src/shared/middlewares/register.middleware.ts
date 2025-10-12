import { Request, Response, NextFunction } from "express";
import authServices from "../../modules/auth/application/Auth.services";

export const autoRegisterUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verificamos que el usuario esté autenticado
    if (req.oidc?.isAuthenticated() && req.oidc.user) {
      const auth0User = req.oidc.user;

      // Buscamos si ya existe en la DB
      const existingUser = await authServices.getUserByAuth0ID(auth0User.sub);

      if (!existingUser) {
        // Registramos automáticamente
        await authServices.registerUser({
          name: auth0User.name,
          auth0_id: auth0User.sub,
          email: auth0User.email,
        });
        console.log("Usuario registrado automáticamente:", auth0User.email);
      }
    }
  } catch (error) {
    console.error("Error registrando usuario automáticamente:", error);
  }

  // Continuamos con la request
  next();
};
