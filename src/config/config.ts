import dotenv from "dotenv";
import path from "path";

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface Config {
  port: number;
  db: {
    name: string;
    user: string;
    password: string;
    host: string;
  };
}

// Función para asegurar que una variable exista
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`La variable de entorno ${key} es obligatoria`);
  }
  return value;
}

// Configuración centralizada
const config: Config = {
  port: parseInt(getEnvVar("PORT", "3000"), 10),
  db: {
    name: getEnvVar("DB_NAME"),
    user: getEnvVar("DB_USER"),
    password: getEnvVar("DB_PASSWORD"),
    host: getEnvVar("DB_HOST", "localhost"),
  },
};

export default config;