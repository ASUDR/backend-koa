import Router from '@koa/router';
import { LodgerAuthController } from '../../controllers';
import { Validator, checkAuth, lodgersPassport } from '../../utils';

const router: Router = new Router({
  prefix: '/auth'
});

router.post(
  '/signIn',
  Validator.signInValidator,
  lodgersPassport.authenticate('local'),
  LodgerAuthController.signIn
);

router.all('/logout', checkAuth, LodgerAuthController.logout);

export default router;
