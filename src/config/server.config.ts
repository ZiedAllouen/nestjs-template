import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const serverConfiguration = registerAs('server', () => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    rateLimit: parseInt(process.env.RATE_LIMIT || '20', 10),
    apiPrefix: process.env.API_PREFIX || 'api',
}));

const serverConfigurationSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test', 'staging'])
        .default('development')
        .describe('Application environment mode'),

    PORT: z
        .coerce.number()
        .int()
        .positive()
        .max(65535)
        .default(3000)
        .describe('Port number for the HTTP server'),

    API_PREFIX: z
        .string()
        .regex(/^[a-z-]+$/, 'Only lowercase letters and hyphens allowed')
        .default('api')
        .describe('Global API prefix for routes'),
});

export { serverConfiguration, serverConfigurationSchema };
