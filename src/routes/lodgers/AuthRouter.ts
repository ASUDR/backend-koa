import Router from '@koa/router';
import passport from 'koa-passport';
import { AuthController } from '../../controllers';
import { Validator, checkAuth } from '../../utils';

const router: Router = new Router({
  prefix: '/auth'
});

router.post(
  '/signIn',
  Validator.signInValidator,
  passport.authenticate('local'),
  AuthController.signIn
);

router.post('/test', checkAuth, (ctx) => {
  console.log(ctx.session);
  ctx.body = 'pass';
});

router.all('/logout', checkAuth, AuthController.logout);

export default router;
