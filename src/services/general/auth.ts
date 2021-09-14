import bcrypt from 'bcrypt';
import { User, Contact } from '../../db';
import { BaseApiError, exceptionsCatcher } from '../../utils';

export default class AuthService {
  private static saltRounds: number = 10;

  @exceptionsCatcher
  public async signUp(
    email: string, password: string, trafficSource: string, contact: {
      typeId: number, value: string
    }
  ): Promise<User | BaseApiError> {
    const passwordHash: string = await bcrypt.hash(password, AuthService.saltRounds);
    const user: User = await User.create({
      email, passwordHash, trafficSource
    });
    await Contact.create({
      userId: user.get('id'), typeId: contact.typeId, value: contact.value
    });
    return user;
  }
}
