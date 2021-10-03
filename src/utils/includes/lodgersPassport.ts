import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import { Lodger, LodgerAttributesOutput } from '../../db';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user: LodgerAttributesOutput | null = await Lodger.findOne({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new LocalStrategy.Strategy(
  { usernameField: 'id', passwordField: 'password' },
  async (id: string, password: string, cb: Function) => {
    try {
      const user: LodgerAttributesOutput | null = await Lodger.findOne({ where: { id } });

      if (!user) {
        return cb(null, false, { message: 'id or password is invalid' });
      }

      if (password !== user.password) {
        return cb(null, false, { message: 'id or password is invalid' });
      }

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));

export default passport;
