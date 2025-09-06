import { defineConfig, loadEnv } from "@medusajs/framework/utils";

// Carga las variables de entorno desde el archivo .env
loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  projectConfig: {
    // Estas configuraciones aquí están bien
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,

    // --- ¡LA CONFIGURACIÓN DE CORS VA AQUÍ DENTRO! ---
    // Esta es la estructura que tu versión de TypeScript espera.
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!, 
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
})
