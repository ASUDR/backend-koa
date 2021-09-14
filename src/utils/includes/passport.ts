import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { Model } from 'sequelize';
import { User } from '../../db';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user: Model | null = await User.findOne({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new LocalStrategy.Strategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email: string, password: string, cb: Function) => {
    try {
      console.log(email, password);
      const user: User | null = await User.findOne({ where: { email } });

      if (!user) {
        return cb(null, false, { message: 'email or password is invalid' });
      }

      const dbHashAny: unknown = user.get('passwordHash');
      const dbHash: string = typeof dbHashAny === 'string' ? dbHashAny : '';
      const passwordMatch: boolean = await bcrypt.compare(password, dbHash);

      if (!passwordMatch) {
        return cb(null, false, { message: 'email or password is invalid' });
      }

      console.log('success, user = ', user);
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));

export default passport;
