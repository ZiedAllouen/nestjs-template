import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';

import { serverConfiguration, serverConfigurationSchema } from './server.config';
import { databaseConfiguration, databaseConfigurationSchema } from './database.config';
import { jwtConfiguration, jwtConfigurationSchema } from './jwt.config';


const mergedConfigSchema = serverConfigurationSchema
                .merge(databaseConfigurationSchema)
                .merge(jwtConfigurationSchema);
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true,
            load: [
                serverConfiguration,
                databaseConfiguration,
                jwtConfiguration,
            ],
            validate: (config) => {
                const parsed = mergedConfigSchema.safeParse(config);

                if (!parsed.success) {
                    const validationError = fromError(parsed.error, {
                        prefix: 'Configuration Error',
                        maxIssuesInMessage: 5,
                        issueSeparator: '\n',
                    });

                    throw new Error(`❌ Invalid environment configuration:\n- ${validationError.message}`);
                }

                return parsed.data;
            },
            validationOptions: {
                allowUnknown: false,
                abortEarly: false,
            },
        }),
    ],
})

export class ApiConfigsModule {}