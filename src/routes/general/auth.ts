import Router from '@koa/router';
import passport from 'koa-passport';
import { AuthService } from '../../services';
import { User } from '../../db';
import {
  Validator, routerExceptionsCatcher,
  Context, BaseApiError, BaseApiSchema
} from '../../utils';

const router: Router = new Router({
  prefix: '/auth'
});
class AuthController {
  private static service: AuthService = new AuthService();

  @routerExceptionsCatcher
  public static async signUp(ctx: Context): Promise<void> {
    const {
      email, password, trafficSource, contact
    } = ctx.request.body;
    const response: User | BaseApiError = await this.service.signUp(
      email, password, trafficSource, contact
    );

    if (response instanceof BaseApiError) {
      throw response;
    }

    const result: BaseApiSchema = {
      success: true,
      data: {
        id: response.get('id')
      }
    };

    ctx.body = result;
  }

  @routerExceptionsCatcher
  public static async signIn(ctx: any): Promise<void> {
    try {
      const result: BaseApiSchema = {
        success: true,
        data: {
          id: ctx.session.passport.user
        }
      };

      ctx.body = result;
    } catch (err) {
      console.error(err);
    }
  }

  @routerExceptionsCatcher
  public static async logout(ctx: any): Promise<void> {
    await ctx.logout();
    ctx.session = null;

    const result: BaseApiSchema = {
      success: true
    };

    ctx.body = result;
  }
}

router.use(async (ctx: any, next) => {
  console.log(ctx.isAuthenticated(), new Date(), ctx.session);
  await next();
});

router.post('/signUp', Validator.signUpValidator, AuthController.signUp);

router.post(
  '/signIn',
  Validator.signInValidator,
  passport.authenticate('local'),
  AuthController.signIn
);

router.post('/test', (ctx) => { ctx.body = 'kek'; });

router.all('/logout', AuthController.logout);

export default router;
