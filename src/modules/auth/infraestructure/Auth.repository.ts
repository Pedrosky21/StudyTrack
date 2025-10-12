import axios from "axios";
import { getManagementToken } from "../../../shared/utils/auth0Token.utils";

class AuthRepository {
  private domain: string;

  constructor() {
    this.domain = process.env.AUTH0_DOMAIN as string;
  }

  async getUserInfo(accessToken: string) {
    const response = await axios.get(`https://${this.domain}/userinfo`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }
}

export default new AuthRepository();
