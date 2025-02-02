import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  // private requiredEnvVars = [
  //   'DB_HOST',
  //   'DB_PORT',
  //   'DB_USERNAME',
  //   'DB_PASSWORD',
  //   'DB_NAME',
  //   'JWT_SECRET',
  //   'JWT_EXPIRES_IN',
  // ];

  // constructor(private nestConfigService: NestConfigService) {
  //   this.validateEnvVariables();
  // }

  // private validateEnvVariables() {
  //   const missingVars = this.requiredEnvVars.filter(
  //     (key) => !this.nestConfigService.get<string>(key)
  //   );

  //   if (missingVars.length > 0) {
  //     throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  //   }
  // }

  // get dbHost(): string {
  //   return this.nestConfigService.get<string>('DB_HOST');
  // }

  // get dbPort(): number {
  //   return this.nestConfigService.get<number>('DB_PORT');
  // }

  // get dbUsername(): string {
  //   return this.nestConfigService.get<string>('DB_USERNAME');
  // }

  // get dbPassword(): string {
  //   return this.nestConfigService.get<string>('DB_PASSWORD');
  // }

  // get dbName(): string {
  //   return this.nestConfigService.get<string>('DB_NAME');
  // }

  // get jwtSecret(): string {
  //   return this.nestConfigService.get<string>('JWT_SECRET');
  // }

  // get jwtExpiresIn(): string {
  //   return this.nestConfigService.get<string>('JWT_EXPIRES_IN');
  // }
}
