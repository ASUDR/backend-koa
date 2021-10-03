import passport from 'koa-passport';
import bcrypt from 'bcrypt';
import LocalStrategy from 'passport-local';
import {
  Admin, AdminAttributesOutput, AdminRole,
  Faculty, Hostel
} from '../../db';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (username: number, done) => {
  try {
    const admin: AdminAttributesOutput | null = await Admin.findOne({
      where: { username },
      include: [
        { model: AdminRole, attributes: ['id', 'name'] },
        { model: Faculty, attributes: ['id', 'shortName', 'name'] },
        { model: Hostel, attributes: ['id', 'name'] }
      ]
    });
    done(null, admin);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new LocalStrategy.Strategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username: string, password: string, cb: Function) => {
    try {
      const admin: AdminAttributesOutput | null = await Admin.findOne({ where: { username } });

      if (!admin) {
        return cb(null, false, { message: 'username or password is invalid' });
      }

      const dbHash: string = admin.passwordHash;
      const passwordMatch: boolean = await bcrypt.compare(password, dbHash);

      if (!passwordMatch) {
        return cb(null, false, { message: 'username or password is invalid' });
      }

      return cb(null, admin);
    } catch (err) {
      return cb(err);
    }
  }
));

export default passport;
