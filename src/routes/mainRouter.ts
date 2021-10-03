import Router from '@koa/router';
import auth from './lodgers/AuthRouter';

const mainRouter: Router = new Router({
  prefix: '/api'
});

mainRouter
.use(auth.routes())
.use(auth.allowedMethods());

export default mainRouter;
