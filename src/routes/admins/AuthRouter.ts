import Router from '@koa/router';
import { AdminAuthController } from '../../controllers';
import { Validator, checkAuth, adminsPassport } from '../../utils';

const router: Router = new Router({
  prefix: '/auth'
});

router.post(
  '/signIn',
  Validator.signInValidator,
  adminsPassport.authenticate('local'),
  AdminAuthController.signIn
);

router.all('/logout', checkAuth, AdminAuthController.logout);

export default router;
