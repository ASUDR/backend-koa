import Router from '@koa/router';
import adminRouter from './admins/AdminRouter';
import lodgerRouter from './lodgers/LodgerRouter';

const mainRouter: Router = new Router({
  prefix: '/api'
});

mainRouter
  .use(adminRouter.routes())
  .use(adminRouter.allowedMethods())
  .use(lodgerRouter.routes())
  .use(lodgerRouter.allowedMethods());

export default mainRouter;
