// Environment configuration

export const envConfig = {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  port: parseInt(process.env.PORT || '3002', 10),
};


