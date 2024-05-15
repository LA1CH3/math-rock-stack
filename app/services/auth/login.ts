import { pbkdf2Sync } from 'node:crypto';
import { AppDB } from '../../load-context';

export type User = {
  id: number;
  username: string;
};

export const login = async (username: string, password: string, db: AppDB) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  if (!user) {
    return null;
  }

  const validPassword =
    pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex') ===
    user.password;

  if (!validPassword) {
    return null;
  }

  return user;
};
