import Router from '@koa/router';
import {
  BaseApiError, Context, Next,
  Response, httphttpStatusCodes
} from '../utils';
import auth from './includes/AuthRouter';

const mainRouter: Router = new Router({
  prefix: '/api'
});

mainRouter.use(async (ctx: Context, next: Next): Promise<any> => {
  if (
    ['/api/auth/signIn'].includes(ctx.request.path)
    || ctx.session?.hasOwnProperty('passport')
  ) {
    await next();
  } else {
    ctx.body = new Response(
      false,
      new BaseApiError(
        'Unauthorized',
        httphttpStatusCodes.UNAUTHORIZED,
        httphttpStatusCodes.UNAUTHORIZED
      )
    );
  }
});

mainRouter
.use(auth.routes())
.use(auth.allowedMethods());

export default mainRouter;
