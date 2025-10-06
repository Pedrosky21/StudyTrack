import { Request, Response } from "express";
import authService from "../application/Auth.services";
import { User } from "../domain/User.entity";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const auth0User = req.oidc.user;

      if (!auth0User) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }

      const userRegistered = await authService.registerUser({
        name: auth0User.name,
        auth0_id: auth0User.sub,
        email: auth0User.email,
      });

      res.status(201).json(userRegistered);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await authService.loginUser(email, password);

      res.status(200).json(result);
    } catch (error) {
      res.status(401).json(error);
    }
  }
}

export default new AuthController();
