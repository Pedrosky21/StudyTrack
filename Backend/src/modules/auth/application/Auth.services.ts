import { User } from "../domain/User.entity";
import authRepository from "../infraestructure/Auth.repository";
import userRepository from "../infraestructure/User.repository";

class AuthService {
  async registerUser(user: User) {
    try {
      // user en auth0
      const auth0User = await authRepository.register(
        user.email,
        user.password
      );
      user.password = auth0User.user_id; // la contraseña en realidad es la id de auth0
      // no se guardan contraseñas en nuestra db

      // user en la db
      const userOurs = await userRepository.createUser(user);

      return userOurs;
    } catch (error) {
      console.log(error);
    }
  }
}
