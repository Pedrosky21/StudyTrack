import UserModel from "./User.model";
import { User } from "../domain/User.entity";

class UserRepository {
  async createUser(user: User) {
    return await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }

  async findByAuth0ID(auth0ID: string) {
    return await UserModel.findOne({
      where: { password: auth0ID },
    });
  }
}

export default new UserRepository();
