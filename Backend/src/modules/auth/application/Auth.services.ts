import { User } from "../domain/User.entity";
import authRepository from "../infraestructure/Auth.repository";
import userRepository from "../infraestructure/User.repository";

class AuthService {
  async registerUser(user: User) {
    try {
      // user en auth0
      const auth0User = await authRepository.register(
        user.email,
        user.auth0_id
      );
      user.auth0_id = auth0User.user_id; // la contraseña en realidad es la id de auth0
      // no se guardan contraseñas en nuestra db

      // user en la db
      const userOurs = await userRepository.createUser(user);

      console.log("service:", auth0User);
      console.log("service2:", userOurs);

      return userOurs;
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      // Iniciar sesión en Auth0
      const authResponse = await authRepository.login(email, password);
      const { access_token, id_token } = authResponse;

      // Obtener información del usuario del token (Auth0 devuelve el sub)
      const userInfo = await authRepository.getUserInfo(access_token);
      const auth0Id = userInfo.sub; // formato típico: "auth0|abc123..."

      // Buscar usuario en nuestra DB
      const user = await userRepository.findByAuth0ID(auth0Id);
      if (!user) {
        throw new Error("Usuario no registrado en la base de datos");
      }

      // Retornar token + datos del usuario local
      return {
        user,
        tokens: {
          access_token,
          id_token,
        },
      };
    } catch (error: any) {
      console.error("Error en AuthService.loginUser:", error.message);
      throw new Error("Credenciales inválidas o error en el login");
    }
  }

  async getUserByAuth0ID(auth0_id: string) {
    return userRepository.findByAuth0ID(auth0_id);
  }
}

export default new AuthService();
