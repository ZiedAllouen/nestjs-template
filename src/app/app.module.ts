import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import * as figlet from 'figlet';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ApiConfigsModule } from '../config/api-config.module';

@Module({
  imports: [ApiConfigsModule, AuthModule, UsersModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    figlet('nestjs-template', { font: 'Standard' }, (err, data) => {
      if (err) {
        console.error('Error generating ASCII art:', err.message);
      } else {
        console.log(data);
      }
    });
  }
}
