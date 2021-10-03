import Router from '@koa/router';
import auth from './AuthRouter';

const router: Router = new Router({
  prefix: '/admin'
});

router
.use(auth.routes())
.use(auth.allowedMethods());

export default router;
