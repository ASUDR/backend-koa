import Router from '@koa/router';
import { AuthController } from '../../controllers';
import { Validator, checkAuth, adminsPassport } from '../../utils';

const router: Router = new Router({
  prefix: '/auth'
});

router.post(
  '/signIn',
  Validator.signInValidator,
  adminsPassport.authenticate('local'),
  AuthController.signIn
);

router.all('/logout', checkAuth, AuthController.logout);

export default router;
