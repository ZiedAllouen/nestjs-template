import { Injectable, Inject } from '@nestjs/common';
import { users } from '../database/schemas/user.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject('DRIZZLE_CONNECTION') private db: any) {}

  async createUser(name: string, email: string) {
    return this.db.insert(users).values({ name, email }).returning();
  }

  async getUsers() {
    return this.db.select().from(users);
  }

  async getUserByEmail(email: string) {
    return this.db.select().from(users).where(eq(users.email, email));
  }
}
