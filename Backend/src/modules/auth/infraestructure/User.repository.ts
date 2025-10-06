import UserModel from "./User.model";
import { User } from "../domain/User.entity";

class UserRepository {
  async createUser(user: User) {
    return await UserModel.create({
      name: user.name,
      email: user.email,
      auth0_id: user.auth0_id,
    });
  }

  async findByAuth0ID(auth0ID: string) {
    return await UserModel.findOne({
      where: { auth0_id: auth0ID },
    });
  }
}

export default new UserRepository();
