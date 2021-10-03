import Router from '@koa/router';
import { AuthController } from '../../controllers';
import { Validator, checkAuth, lodgersPassport } from '../../utils';

const router: Router = new Router({
  prefix: '/auth'
});

router.post(
  '/signIn',
  Validator.signInValidator,
  lodgersPassport.authenticate('local'),
  AuthController.signIn
);

router.post('/test', checkAuth, (ctx) => {
  console.log(ctx.session);
  ctx.body = 'pass';
});

router.all('/logout', checkAuth, AuthController.logout);

export default router;
