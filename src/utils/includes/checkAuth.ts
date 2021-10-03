import {
  Context, Next, Response,
  httphttpStatusCodes, BaseApiError
} from '../../utils';

const checkAuth = async (ctx: Context, next: Next) => {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    new Response(
      ctx,
      false,
      new BaseApiError(
        'Unauthorized',
        httphttpStatusCodes.UNAUTHORIZED,
        httphttpStatusCodes.UNAUTHORIZED
      )
    );
  }
}

export default checkAuth;
