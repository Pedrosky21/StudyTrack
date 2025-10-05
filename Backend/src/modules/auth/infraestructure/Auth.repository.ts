import axios from "axios";
import { getManagementToken } from "../../../shared/utils/auth0Token.utils";

class AuthRepository {
  private domain: string;

  constructor() {
    this.domain = process.env.AUTH0_DOMAIN as string;
  }

  async register(email: string, password: string) {
    const token = await getManagementToken();

    const response = await axios.post(
      `https://${this.domain}/api/v2/users`,
      {
        email,
        password,
        connection: "Username-Password-Authentication",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }

  async login(username: string, password: string) {
    const response = await axios.post(`https://${this.domain}/oauth/token`, {
      grant_type: "password",
      username,
      password,
      audience: process.env.AUTH0_API_AUDIENCE,
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      scope: "openid profile email",
    });

    return response.data;
  }
}

export default new AuthRepository();
