import { Database } from '../../shared/database.service';
import { IUser } from '../models/interfaces/user.interface';
import { IUserResponse } from '../models/interfaces/userResponse.interface';

export class AuthService {
  constructor(private readonly database: Database = new Database()) {}

  private async getAll(): Promise<IUserResponse> {
    const users = await this.database.get('users');
    return users as { users: IUser[] };
  }

  async findByEmail(email: string): Promise<IUser> {
    const { users } = await this.getAll();
    const user = users.find((us) => us.email === email);
    if (!user) throw new Error('Wrong credentials');
    return user;
  }

  async emailExist(email: string): Promise<boolean> {
    const { users } = await this.getAll();
    return users.some((us) => us.email === email);
  }

  async usernameExist(username: string): Promise<boolean> {
    const { users } = await this.getAll();
    return users.some((us) => us.username === username);
  }
}
