import Router from '@koa/router';
import { BaseApiError, Context, Next } from '../utils';
import auth from './general/auth';

const mainRouter: Router = new Router({
  prefix: '/api'
});

mainRouter.use(async (ctx: Context | any, next: Next): Promise<any> => {
  if (
    ['/api/auth/signUp', '/api/auth/signIn'].includes(ctx.request.path)
    || 'passport' in ctx.session
  ) {
    await next();
  } else {
    ctx.body = {
      success: false,
      error: new BaseApiError('Unauthorized', 401, 401)
    };
  }
});

mainRouter
  .use(auth.routes())
  .use(auth.allowedMethods());

export default mainRouter;
