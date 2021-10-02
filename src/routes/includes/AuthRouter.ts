import Router from '@koa/router';
import passport from 'koa-passport';
import { AuthController } from '../../controllers';
import { Validator } from '../../utils';

const router: Router = new Router({
  prefix: '/auth'
});

router.post(
  '/signIn',
  Validator.signInValidator,
  passport.authenticate('local'),
  AuthController.signIn
);

router.post('/test', (ctx) => {
  console.log(ctx.session);
  ctx.body = 'pass';
});

router.all('/logout', AuthController.logout);

export default router;
