
import { registerAs } from '@nestjs/config';
import { z } from 'zod';


const jwtConfiguration = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  accessTokenExpiresIn: process.env.JWT_EXPIRES_IN,
}));

const jwtConfigurationSchema = z.object({
  JWT_SECRET: z
    .string()
    .min(32, 'JWT secret must be at least 32 characters long')
    .describe('Secret key for signing JWT tokens'),

  JWT_EXPIRES_IN: z
    .string()
    .default('3600')
    .describe('Access token expiration time in seconds'),
});

export { jwtConfiguration, jwtConfigurationSchema };

