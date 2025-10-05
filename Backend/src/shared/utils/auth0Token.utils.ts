import axios from "axios";

export async function getManagementToken() {
  try {
    const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials",
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error obteniendo Management Token:", error);
    throw new Error("No se pudo obtener el Management Token");
  }
}