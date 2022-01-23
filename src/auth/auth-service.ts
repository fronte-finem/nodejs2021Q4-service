import bcrypt from 'bcrypt';
import { createSigner, createVerifier, TokenError } from 'fast-jwt';
import { getRepository } from 'typeorm';
import { APP_JWT_KEY } from '../common/config';
import { Maybe } from '../common/types';
import { logger } from '../logging/logger';
import { User } from '../resources/users/user.model';
import { LoginDTO, PayloadJWT } from './types';

const jwtSignSync = createSigner({ key: APP_JWT_KEY });
const jwtVerifySync = createVerifier({ key: APP_JWT_KEY });

/**
 * Service for login
 */
export abstract class AuthService {
  /**
   * Login by {@link LoginDTO}
   * @param loginDTO - object {@link LoginDTO}
   * @returns promise with {@link Maybe} string token
   */
  public static async login({
    login,
    password,
  }: LoginDTO): Promise<Maybe<string>> {
    const maybeUser = await getRepository(User).findOne({ login });
    if (!maybeUser) return undefined;
    const success = await bcrypt.compare(password, maybeUser.password);
    if (!success) return undefined;
    const payload: PayloadJWT = { login, userId: maybeUser.id as string };
    return jwtSignSync(payload);
  }

  /**
   * Verify JWT token
   * @param token - string JWT token
   * @returns promise with boolean result
   */
  public static async verify(token: string): Promise<boolean> {
    try {
      const { userId, login }: PayloadJWT = jwtVerifySync(token);
      const maybeUser = await getRepository(User).findOne(userId, {
        where: { login },
      });
      return Boolean(maybeUser);
    } catch (error) {
      if (error instanceof TokenError) {
        logger.error(error);
        return false;
      }
      throw error;
    }
  }
}
