import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const databaseConfiguration = registerAs('database', () => ({
  databaseUrl: process.env.DATABASE_URL,
}));

const databaseConfigurationSchema = z.object({
  DATABASE_URL: z.string(),
});

export { databaseConfiguration, databaseConfigurationSchema };
