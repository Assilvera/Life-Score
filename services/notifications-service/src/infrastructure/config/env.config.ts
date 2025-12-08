export const envConfig = () => ({
  port: parseInt(process.env.PORT || '3004', 10), // por ejemplo
  databaseUrl: process.env.DATABASE_URL,
});
