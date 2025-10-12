import { User } from "../domain/User.entity";
import authRepository from "../infraestructure/Auth.repository";
import userRepository from "../infraestructure/User.repository";

class AuthService {
  async registerUser(user: User) {
    try {
      // user en la db
      const userOurs = await userRepository.createUser(user);

      return userOurs;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByAuth0ID(auth0_id: string) {
    return userRepository.findByAuth0ID(auth0_id);
  }
}

export default new AuthService();
